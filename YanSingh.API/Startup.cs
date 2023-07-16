using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using YanSingh.Action;
using YanSingh.IService.Account;
using YanSingh.Models;
using YanSingh.Models.Helpers;
using YanSingh.Models.Helpers.Infrastructure;
//using YanSingh.RazorHtmlViews.Services;
using YanSingh.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace YanSingh.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddCustomHttpContextAccessor();

            services.AddCors(options => options.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                //builder.AllowAnyHeader().AllowAnyMethod()
                //            .SetIsOriginAllowed((host) => true)
                //            .AllowCredentials();
            }));

            Type t = typeof(Action.Organization.OrganizationAction);
            BootstrapperService.RegisterTypes(services, Configuration["ConnectionStrings:DefaultConnection"], Scan(t));

            BootstrapperAction.RegisterTypes(services, Scan(null));

            //Configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSetting>(appSettingsSection);

            //Configure jwt autentication
            var appSettings = appSettingsSection.Get<AppSetting>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            //services.AddTransient<IRazorViewToStringRenderer, RazorViewToStringRenderer>();
            services.AddRazorPages();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        var userId = int.Parse(context.Principal.Identity.Name);
                        var user = userService.GetById(userId);
                        if (user == null)
                        {
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (ctx, next) =>
            {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //The default HSTS value is 30 days. you may want to change this for production scenarios
                app.UseHsts();
            }

            app.UseCors("MyPolicy");
            app.UseHttpContext();

            app.UseAuthentication();
            app.UseHttpsRedirection();

            app.UseStaticFiles(); //For the wwwroot folder
            //app.UseMvc();

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Account}/{action=Get}/{id?}");
            });

        }

        public List<InitializingTypes> Scan(Type t)
        {
            var assembly_list = t == null ? Assembly.GetExecutingAssembly() : Assembly.GetAssembly(t);
            List<Type> param_type_list = new List<Type>();

            var controller_list = new List<ConstructorInfo>();

            if (t == null)
            {
                controller_list = assembly_list.DefinedTypes
                    .Where(type => typeof(ControllerBase).IsAssignableFrom(type)) //filter controllers
                    .SelectMany(type => type.GetConstructors()).ToList();
            }
            else
            {
                controller_list = assembly_list.DefinedTypes
                    .SelectMany(type => type.GetConstructors()).ToList();
            }

            foreach (var controller in controller_list)
            {
                var constructor_list = controller.DeclaringType.GetConstructors();
                foreach (var constructor in constructor_list)
                {
                    if (constructor.GetParameters().Count() > 0)
                    {
                        var parameter_list = constructor.GetParameters();
                        foreach (var param in parameter_list)
                        {
                            if (param.ParameterType.Module.Name.StartsWith("YanSingh"))
                                param_type_list.Add(param.ParameterType);
                        }
                    }
                }
            }

            var initializing_type_list = new List<InitializingTypes>();

            foreach (var param_type in param_type_list.Distinct())
            {
                initializing_type_list.Add(new InitializingTypes
                {
                    class_type = param_type,
                    interface_type = AppDomain.CurrentDomain.GetAssemblies()
                   .SelectMany(s => s.GetTypes())
                   .Where(p => param_type.IsAssignableFrom(p) && param_type.IsInterface && p.IsClass).FirstOrDefault()
                });
            }

            return initializing_type_list;
        }
    }
}

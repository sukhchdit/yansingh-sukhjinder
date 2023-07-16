using System;
using System.Linq.Expressions;
using System.Reflection;
using YanSingh.Models.Utilities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace YanSingh.Models
{
    public static  class Extentions
    {
        public static string RootUrl(this ControllerBase controller)
        {
            return controller.Url.Content("~/");
        }

        public static string GetFullUrlByCtrl(this ControllerBase controller, HttpRequest httpRequest)
        {
            return UriHelper.GetDisplayUrl(httpRequest);
        }

        public static string GetBaseUrlByCtrl(this ControllerBase controller, HttpRequest httpRequest)
        {
            return UriHelper.GetDisplayUrl(httpRequest);
        }

        public static IApplicationBuilder UseHttpContext(this IApplicationBuilder app)
        {
            CustomHttpContext.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
            return app;
        }

        public static void AddCustomHttpContextAccessor(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        public static void IgnoreProperty<T, TR>(this T parameter, Expression<Func<T, TR>> propertyLambda)
        {
            var parameterType = parameter.GetType();
            var propertyName = propertyLambda.GetReturnedPropertyName();
            if (propertyName == null)
            {
                return;
            }
            var jsonPropertyAttribute = parameterType.GetProperty(propertyName).GetCustomAttribute<JsonPropertyAttribute>();
            jsonPropertyAttribute.DefaultValueHandling = DefaultValueHandling.Ignore;
        }

        public static string GetReturnedPropertyName<T,TR>(this Expression<Func<T, TR>> propertyLambda)
        {
            var member = propertyLambda.Body as MemberExpression;
            var memberPropertyInfo = member?.Member as PropertyInfo;
            return memberPropertyInfo?.Name;
        }

        public static DateTime EndOfDay(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 23, 59, 59, 999);
        }

        public static DateTime StartOfDay(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0, 0);
        }
    }
}

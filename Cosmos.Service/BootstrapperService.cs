using AutoMapper;
using Cosmos.DAL;
using Cosmos.Infrastructure.UnitOfWork;
using Cosmos.Models.Helpers.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.EntityFrameworkCore.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace Cosmos.Service
{
    public abstract class BootstrapperService
    {
        public static void RegisterTypes(IServiceCollection services, string connection, List<InitializingTypes> initializing_type_list)
        {
            services.AddEntityFrameworkMySQL()
             .AddDbContext<CosmosDbContext>(options =>
              options.UseMySQL(connection, b => b.MigrationsAssembly("Cosmos.DAL"))).BuildServiceProvider();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            foreach (InitializingTypes initializing_types in initializing_type_list.Where(i => i.interface_type != null))
            {
                services.AddScoped(initializing_types.class_type, initializing_types.interface_type);
            }
            
            //Auto Mapper Configurations
            //var mappingConfig = new MapperConfiguration(mc => {
            //mc.AddProfile(new MappingProfile());
            //});
        }
    }
}

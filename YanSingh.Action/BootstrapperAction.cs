using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using YanSingh.Models.Helpers.Infrastructure;
using System.Linq;

namespace YanSingh.Action
{
    public abstract class BootstrapperAction
    {
        public static void RegisterTypes(IServiceCollection services, List<InitializingTypes> initializing_type_list)
        {
            //services.AddScoped<IOrganizationAction, OrganizationAction>();
            foreach (InitializingTypes initializing_types in initializing_type_list.Where(i => i.interface_type != null))
            {
                services.AddScoped(initializing_types.class_type, initializing_types.interface_type);
            }
        }


    }
}

using YanSingh.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace YanSingh.Infrastructure.Infra
{
    public class ConfigurationInfra
    {
        public void RegisterConSql(IServiceCollection services, string connection)
        {
            services.AddDbContext<CosmosDbContext>(options =>
               options.UseMySQL(connection, b => b.MigrationsAssembly("YanSingh.DAL")));
        }
    }
}


using System.Threading.Tasks;
using Cosmos.Models.Entities.Account;

namespace Cosmos.IService.Account
{
    public interface IUserSessionService
    {
        Task SetUserSession(UserSession model);
        Task UpdateUserSession(UserSession model);
        UserSession GetUserSession(string corelationid);
    }
}

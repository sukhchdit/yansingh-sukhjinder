
using System.Threading.Tasks;
using YanSingh.Models.Entities.Account;

namespace YanSingh.IService.Account
{
    public interface IUserSessionService
    {
        Task SetUserSession(UserSession model);
        Task UpdateUserSession(UserSession model);
        UserSession GetUserSession(string corelationid);
    }
}

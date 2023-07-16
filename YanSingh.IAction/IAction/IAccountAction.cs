using System.Collections.Generic;
using System.Threading.Tasks;
using YanSingh.Models.Entities.Account;
using YanSingh.Models.ViewModel.Account;

namespace YanSingh.IAction.IAction
{
    public interface IAccountAction
    {
        Task<bool> CreateSponsor(RegisterViewModel model);
        Task<bool> RegisterAdminUser(RegisterViewModel model);
        Task<AuthenticationResponse> Authenticate(LoginViewModel userDto);
        Task<bool> ForgotPassword(ForgotPassword model);
        User GetUserById(long id);
        Task<AuthenticationResponse> UpdateUser(User model);
        Task UpdateUserStatus(long userId);
        Task<User> UpdatePassword(ChangePasswordViewModel model);
        Task DeleteUser(long id);
        Task<AuthenticationResponse> SetPassword(LoginViewModel model);
        Task<UserSession> SetUserSession(UserSession model);
        Task<User> ActivateUser(LoginViewModel model);
        List<UserViewModel> GetUsersByUserStatus(UserStatus userStatus);
        Task UpdateUserStatus(long userId, UserStatus userStatus);
    }
}

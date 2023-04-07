using System.Linq;
using System.Threading.Tasks;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.ViewModel.Account;

namespace Cosmos.IService.Account
{
    public interface IUserService
    {
        User GetById(long id);
        User GetByEmail(string email);
        User GetByEmailWithoutStatus(string email);
        User Authenticate(LoginViewModel model);
        Task<User> UpdateLastLoginTime(User model);
        TokenWithStudies GetToken(User user);
        Task<User> Create(User user);
        Task Update(User user);
        Task UpdatePassword(string newpassword, User user);
        Task UpdatePassword(User obj, string password);
        Task Delete(User obj);
        Task<User> CreateSuperAdmin();
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        bool ValidateCompanyEmail(string email);
        Task UpdateUserStatus(long userId);
        Task DeleteUser(long id);
        IQueryable<User> GetUsersByUserStatus(UserStatus userStatus);
        Task UpdateUserStatus(long userId, UserStatus userStatus);
        User GetActiveUserById(long id);
        User GetUserByIdWithoutStatus(long id);
        Task<User> ActivateUser(User user);
        User GetByEmailAndEmailVerificationKey(LoginViewModel model);
    }
}

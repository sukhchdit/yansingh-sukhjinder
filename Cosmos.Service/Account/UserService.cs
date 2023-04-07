using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Cosmos.Infrastructure.Repository;
using Cosmos.Infrastructure.UnitOfWork;
using Cosmos.IService.Account;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.Helpers;
using Cosmos.Models.Helpers.Infrastructure;
using Cosmos.Models.Mappers;
using Cosmos.Models.Utilities;
using Cosmos.Models.ViewModel.Account;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Cosmos.Service.Account
{
    public class UserService : IUserService
    {
        private IUnitOfWork _unitOfWork;
        private readonly AppSetting _appSettings;

        public UserService(IUnitOfWork unitOfWork, IOptions<AppSetting> appSettings)
        {
            _unitOfWork = unitOfWork;
            _appSettings = appSettings.Value;
        }

        public async Task<User> CreateSuperAdmin()
        {
            var obj = new User
            {
                email = Constants.SuperAdminEmail,
                password = "Stibtn@123", //RandonPasswordGenerator.CreateRandomPassword(10),
                userStatus = UserStatus.Active,
                status = true
            };
            await Create(obj);
            return obj;
        }

        public async Task Delete(User obj)
        {
            obj.status = false;
            _unitOfWork.UserRepository.Delete(obj);
            await _unitOfWork.Commit();
        }

        public async Task UpdateUserStatus(long userId)
        {
            try
            {
                var user = GetUserByIdWithoutStatus(userId);
                if (user == null)
                    throw new AppException("User not found");
                if (user.userStatus == UserStatus.Active)
                    user.userStatus = UserStatus.Suspended;
                else if (user.userStatus == UserStatus.Suspended)
                    user.userStatus = UserStatus.Active;
                _unitOfWork.UserRepository.Update(user);
                await _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                throw new AppException("Could not update status.");
            }
        }

        public async Task UpdateUserStatus(long userId, UserStatus userStatus)
        {
            try
            {
                var user = GetUserByIdWithoutStatus(userId);
                if (user == null)
                    throw new AppException("User not found");
                user.userStatus = userStatus;
                _unitOfWork.UserRepository.Update(user);
                await _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                throw new AppException("Could not update status.");
            }
        }

        public User GetUserByIdWithoutStatus(long id)
        {
            return _unitOfWork.UserRepository.Get(e => e.id == id);
        }

        public User GetActiveUserById(long id)
        {
            return _unitOfWork.UserRepository.Get(e => e.status && e.id == id);
        }

        public IQueryable<User> GetUsersByUserStatus(UserStatus userStatus)
        {
            return _unitOfWork.UserRepository.GetAll(e => e.userStatus == userStatus).AsQueryable();
        }

        public User GetById(long id)
        {
            return _unitOfWork.UserRepository.Get(e => e.id == id);
        }

        public User GetByEmail(string email)
        {
            return _unitOfWork.UserRepository.Get(e => e.email == email);
        }

        public User GetByEmailWithoutStatus(string email)
        {
            return _unitOfWork.UserRepository.Get(e => e.email == email);
        }

        public User GetByEmailAndEmailVerificationKey(LoginViewModel model)
        {
            return _unitOfWork.UserRepository.Get(e => e.email == model.email && e.emailVerificationKey == model.code);
        }

        public User Authenticate(LoginViewModel model)
        {
            if (string.IsNullOrEmpty(model.email) || string.IsNullOrEmpty(model.password))
                return null;
            //var user = _rep.Get<User>(x => x.Email == model.Email && x.UserRole == model.UserRole);
            var user = _unitOfWork.UserRepository.Get(x => x.email.ToLower() == model.email.ToLower());

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(model.password, user.passwordHash, user.passwordSalt))
                return null;

            // authentication successful
            return user;
        }

        public async Task<User> UpdateLastLoginTime(User model)
        {
            if (model != null)
            {
                model.lastLoginAt = DateTime.Now;
                _unitOfWork.UserRepository.Update(model);
                await _unitOfWork.Commit();
            }
            return model;
        }

        public TokenWithStudies GetToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var organizationContact = _unitOfWork.OrganizationContactRepository.Get(x => x.userId == user.id && x.status);
            var organization = _unitOfWork.OrganizationInfoRepository.Get(x => x.id == organizationContact.organizationInfoId);

            if (organizationContact != null)
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.id.ToString()),
                        new Claim(ClaimTypes.Email, user.email),
                        new Claim(ClaimTypes.GivenName, organizationContact.lastName + ", " + (organizationContact.firstName == null ? "" : organizationContact.firstName) + ' ' + (organizationContact.middleName == null ? "" : organizationContact.middleName) + ' '),
                        new Claim("firstName", organizationContact.firstName),
                        new Claim("lastName", organizationContact.lastName),
                        new Claim("organizationContactId", organizationContact.id.ToString()),
                        new Claim("lastLoginDate", user.lastLoginAt != DateTime.MinValue ? user.lastLoginAt.ToString("MM/dd/yyyy h:mm tt") : "")
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return new TokenWithStudies
                {
                    token = tokenHandler.WriteToken(token)
                };
            }
            else
                return null;
        }

        public async Task<User> Create(User user)
        {
            // validation
            if (string.IsNullOrWhiteSpace(user.password))
            {
                user.password = RandonPasswordGenerator.CreateRandomPassword(10);
            }
            //    throw new AppException("Password is required");
            var oldUser = _unitOfWork.UserRepository.Get(x => x.email == user.email);
            if (oldUser != null)
                throw new AppException(string.Format("Email {0} is already taken", user.email));

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(user.password, out passwordHash, out passwordSalt);

            user.passwordHash = passwordHash;
            user.passwordSalt = passwordSalt;
            _unitOfWork.UserRepository.Add(user);
            await _unitOfWork.Commit();
            return user;
        }

        public async Task UpdatePassword(User obj, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            obj.passwordHash = passwordHash;
            obj.passwordSalt = passwordSalt;
            _unitOfWork.UserRepository.Update(obj);
            await _unitOfWork.Commit();
        }

        public async Task UpdatePassword(string newpassword, User user)
        {
            if (string.IsNullOrWhiteSpace(newpassword))
                throw new AppException("Password is required");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(newpassword, out passwordHash, out passwordSalt);

            user.passwordHash = passwordHash;
            user.passwordSalt = passwordSalt;

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.Commit();
        }

        public async Task Update(User userParam)
        {
            var user = GetUserByIdWithoutStatus(userParam.id);

            if (user == null)
                throw new AppException("User not found");

            //update some user properties
            user.updatedBy = userParam.updatedBy;
            user.updatedOn = DateTime.Now;

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.Commit();
        }

        public async Task<User> ActivateUser(User user)
        {
            //var user = GetByEmailAndEmailVerificationKey(model);
            user.lastLoginAt = DateTime.Now;
            var userRole = _unitOfWork.OrganizationContactRepository.Get(x => x.userId == user.id);
            user.userStatus = UserStatus.Active;
            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.Commit();
            return user;
        }
        // private helper methods
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        public bool ValidateCompanyEmail(string email)
        {
            int startIndex = email.IndexOf("@");
            string fulldomain = email.Substring(startIndex + 1);
            var domain = fulldomain.Split('.');

            var arr = new List<string> { "gmail", "aol", "yahoo", "outlook", "bing", "gmx", "hushmail", "lockbin", "lycos", "mail", "openmailbox", "protonmail", "rediff", "zoho", "yandex", "arvixe", "fastmail", "hotmail", "live", "inbox", "icloud", "myspace" };
            var res = arr.Any(e => e == domain[0]);
            return res;
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public async Task DeleteUser(long id)
        {
            try
            {
                var user = GetUserByIdWithoutStatus(id);
                if (user == null)
                    throw new AppException("User not found");

                _unitOfWork.UserRepository.Delete(user);
                await _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                throw new AppException("Could not delete bucket.");
            }
        }

    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cosmos.IAction;
using Cosmos.IAction.IAction;
using Cosmos.IService.Account;
using Cosmos.IService.IOrganization;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.Helpers.Infrastructure;
using Cosmos.Models.Mappers;
using Cosmos.Models.Utilities;
using Cosmos.Models.ViewModel.Account;

namespace Cosmos.Action.Account
{
    public class AccountAction : IAccountAction
    {
        private IUserService _userService;
        private IOrganizationService _organizationService;
        private IUserSessionService _userSessionService;
        //private IEmailAction _emailAction;
        
        public AccountAction(IUserService userService, IOrganizationService organizationService, IUserSessionService userSessionService)
        {
            _userService = userService;
            _organizationService = organizationService;
            _userSessionService = userSessionService;
        }

        public async Task<bool> CreateSponsor(RegisterViewModel model)
        {
            try
            {
                var objSuperAdmin = _userService.GetByEmail(Constants.SuperAdminEmail);

                if (objSuperAdmin != null && !Constants.SuperAdminEmail.Equals(model.email))
                {
                    var obj = Mapper.MapRegisterUser(model);
                    obj.createdBy = objSuperAdmin.id;
                    obj.updatedBy = objSuperAdmin.id;
                    obj.createdOn = DateTime.Now;
                    obj.updatedOn = DateTime.Now;
                    obj.emailVerificationKey = Guid.NewGuid().ToString();
                    obj.userStatus = UserStatus.Active;
                    obj.status = true;
                    await _userService.Create(obj);
                    if (obj.id > 0)
                    {
                        var organization = await _organizationService.CreateOrganizationInfo(new OrganizationInfo
                        {
                            name = model.organizationName,
                            type = model.organizationType,
                            createdOn = DateTime.Now,
                            updatedOn = DateTime.Now,
                            status = true,
                        });

                        if (organization != null && organization.id > 0)
                        {
                            var contact = Mapper.MapOrganizationContact(model, organization, obj);
                            var organizationContact = await _organizationService.CreateOrganizationContact(contact);

                            obj.password = RandonPasswordGenerator.CreateRandomPasswordWithRandomLength();
                            await _userService.UpdatePassword(obj.password, obj);
                        }
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> RegisterAdminUser(RegisterViewModel model)
        {
            try
            {
                var objSuperAdmin = _userService.GetByEmail(Constants.SuperAdminEmail);
                if (objSuperAdmin == null)
                    objSuperAdmin = await CreateSuperAdmin();

                if (objSuperAdmin != null && !Constants.SuperAdminEmail.Equals(model.email))
                {
                    var obj = Mapper.MapRegisterUser(model);
                    obj.createdBy = objSuperAdmin.id;
                    obj.updatedBy = objSuperAdmin.id;
                    obj.createdOn = DateTime.Now;
                    obj.updatedOn = DateTime.Now;
                    obj.emailVerificationKey = Guid.NewGuid().ToString();
                    obj.userStatus = UserStatus.EmailActivationPending;
                    obj.status = true;
                    await _userService.Create(obj);
                    if (obj.id > 0)
                    {
                        var organization = await _organizationService.CreateOrganizationInfo(new OrganizationInfo
                        {
                            name = model.organizationName,
                            type = model.organizationType,
                            createdOn = DateTime.Now,
                            updatedOn = DateTime.Now,
                            status = true,
                            organizationGuid = GuidGenerator.GetGuid()
                        });

                        if (organization != null && organization.id > 0)
                        {
                            var contact = Mapper.MapOrganizationContact(model, organization, obj);
                            var organizationContact = await _organizationService.CreateOrganizationContact(contact);

                        }
                        //_emailAction.NewUserEmail(model, obj.emailVerificationKey);
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private async Task<User> CreateSuperAdmin()
        {
            var user = await _userService.CreateSuperAdmin();
            var organization = await _organizationService.CreateOrganizationInfo(new OrganizationInfo
            {
                name = "Cosmos Organization",
                taxId = "12345",
                createdOn = DateTime.Now,
                updatedOn = DateTime.Now,
                status = true
            });
            if (organization != null && organization.id > 0)
            {
                var organizationContact = await _organizationService.CreateOrganizationContact(new OrganizationContact
                {
                    firstName = "Super",
                    lastName = "Admin",
                    email = Constants.SuperAdminEmail,
                    organizationInfoId = organization.id,
                    userId = user.id,
                    status = true,
                    createdOn = DateTime.Now,
                    updatedOn = DateTime.Now,
                    //jobRole = JobRole.Admin,
                });

            }
            return user;
        }

        public async Task<AuthenticationResponse> Authenticate(LoginViewModel userDto)
        {

                var response = new AuthenticationResponse();
                var user = _userService.Authenticate(userDto);

                if (user == null)
                    return new AuthenticationResponse { isPasswordOrEmailIncorrent = true };

                if (user.userStatus != UserStatus.Active)
                    return new AuthenticationResponse { userStatus = user.userStatus };

                if (user != null && user.userStatus == UserStatus.Active)
                {
                    //Get JWT token
                    var tokenWithStudies= _userService.GetToken(user);
                    response.accessToken = tokenWithStudies.token;
                    response.expiresIn = 7;
                    //Update last login date
                    user = await _userService.UpdateLastLoginTime(user);
                    // return basic user info (without password) and token to store client side
                    return response;
                }
                else
                    return null;
 
        }

        public async Task<bool> ForgotPassword(ForgotPassword model)
        {
            var user = _userService.GetByEmail(model.email);
            if (user != null)
            {
                var ResetPasswordKey = Guid.NewGuid().ToString();
                user.resetPasswordKey = ResetPasswordKey;
                user.ResetPasswordTimeStamp = DateTime.Now;

                await _userService.Update(user);

                //_emailAction.ForgotPassword(model, user.resetPasswordKey);
                //await SendForGotPasswordEmail(model, user.resetPasswordKey);

                return true;
            }
            return false;

        }

        public User GetUserById(long id)
        {
            return _userService.GetById(id);
        }

        public async Task<AuthenticationResponse> UpdateUser(User model)
        {
            await _userService.Update(model);
            //Get JWT token
            var tokenWithStudies= _userService.GetToken(model);
            var tokenString = tokenWithStudies.token;

            // return basic user info (without password) and token to store client side
            return new AuthenticationResponse
            {
                accessToken = tokenString,
                expiresIn = 7
            };

        }

        public async Task UpdateUserStatus(long userId)
        {
            await _userService.UpdateUserStatus(userId);
        }
        public async Task UpdateUserStatus(long userId, UserStatus userStatus)
        {
            if (userStatus == UserStatus.Active)
            {
                var user = _userService.GetById(userId);
                if (user.userStatus == UserStatus.Pending)
                {
                    await _userService.UpdateUserStatus(userId, userStatus);
                    var organizationContact = _organizationService.GetOrganizationContactByUserId(user.id);
                    var organization = _organizationService.GetOrganizationInfoByContactId(organizationContact.id, true);
                    if (organization.type == OrganizationType.Sponsor || organization.type == OrganizationType.CRO)
                    {
                        user.password = RandonPasswordGenerator.CreateRandomPasswordWithRandomLength();
                        await _userService.UpdatePassword(user.password, user);
                        //_emailAction.WelcomeMailForOrganizationContact(user, organizationContact);
                    }
                }
            }

        }

        public async Task<User> UpdatePassword(ChangePasswordViewModel model)
        {
            var user = _userService.Authenticate(new LoginViewModel { email = model.email, password = model.currentPassword });

            if (user == null)
                return null;

            await _userService.UpdatePassword(model.newPassword, user);
            return user;
        }

        public async Task DeleteUser(long id)
        {
            await _userService.DeleteUser(id);
        }

        public async Task<AuthenticationResponse> SetPassword(LoginViewModel model)
        {
            var user = _userService.GetByEmail(model.email);
            var response = new AuthenticationResponse();

            if (user == null)
                return new AuthenticationResponse { isPasswordOrEmailIncorrent = true };
            if (user.userStatus == UserStatus.Pending)
                return new AuthenticationResponse { isPasswordOrEmailIncorrent = false, userStatus = UserStatus.Pending };

            if (user.userStatus == UserStatus.Active)
            {
                if (user.resetPasswordKey.Equals(model.code))
                {
                    await _userService.UpdatePassword(user, model.password);
                    return new AuthenticationResponse { isResetPasswordKeyExpired = false, userStatus = UserStatus.Active, isPasswordOrEmailIncorrent = false };
                }
                else
                    return new AuthenticationResponse { isResetPasswordKeyExpired = true };
            }
            else if (user.userStatus == UserStatus.Suspended)
                return new AuthenticationResponse { userStatus = UserStatus.Suspended };
            else if (user.userStatus == UserStatus.EmailActivationPending)
                return new AuthenticationResponse { isPasswordOrEmailIncorrent = false, userStatus = UserStatus.EmailActivationPending };

            return null;
        }

        public async Task<UserSession> SetUserSession(UserSession model)
        {
            if (model.id == 0)
                await _userSessionService.SetUserSession(model);
            else
                await _userSessionService.UpdateUserSession(model);
            return model;
        }

        public async Task<User> ActivateUser(LoginViewModel model)
        {
            var user1 = _userService.GetByEmailAndEmailVerificationKey(model);
            if (user1.userStatus == UserStatus.EmailActivationPending)
            {
                var user = await _userService.ActivateUser(user1);
                if (user.userStatus == UserStatus.Active)
                {
                    var organizationContact = _organizationService.GetOrganizationContactByUserId(user.id);
                    var organization = _organizationService.GetOrganizationInfoByContactId(organizationContact.id, true);
                    if (organization.type == OrganizationType.Monitor || organization.type == OrganizationType.Site)
                    {
                        user.password = RandonPasswordGenerator.CreateRandomPasswordWithRandomLength();
                        await _userService.UpdatePassword(user.password, user);
                        //_emailAction.WelcomeMailForOrganizationContact(user, organizationContact);
                    }
                }
            }
            return user1;
        }

        public List<UserViewModel> GetUsersByUserStatus(UserStatus userStatus)
        {
            var userList = _userService.GetUsersByUserStatus(userStatus).ToList();
            var users = new List<UserViewModel>();
            if (userList != null)
            {
                userList.ForEach(user =>
                {
                    var contact = _organizationService.GetOrganizationContactByUserId(user.id, true);
                    if (contact != null)
                    {
                        var organization = _organizationService.GetOrganizationInfo(contact.organizationInfoId, true);
                        if (organization != null)
                        {
                            users.Add(new UserViewModel
                            {
                                date = user.updatedOn,
                                email = user.email,
                                id = user.id,
                                organizationContactId = contact.id,
                                organizationName = organization.name,
                                name = contact.firstName + " " + contact.lastName,
                                organizationType = organization.type,
                                phone = contact.phone,
                                userStatus = user.userStatus
                            });
                        }
                    }
                });
            }

            return users;
        }
    }
}

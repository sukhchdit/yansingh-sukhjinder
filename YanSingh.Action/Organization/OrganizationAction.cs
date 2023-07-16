using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YanSingh.IAction;
using YanSingh.IAction.IOrganization;
using YanSingh.IService.Account;
using YanSingh.IService.IOrganization;
using YanSingh.Model.Entities.Organization;
using YanSingh.Models.Entities.Account;
using YanSingh.Models.Utilities;
using YanSingh.Models.ViewModel.Account;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using SelectPdf;

namespace YanSingh.Action.Organization
{
    public class OrganizationAction : IOrganizationAction
    {
        private readonly IOrganizationService _organizationService;
        private readonly IUserService _userService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public OrganizationAction(IOrganizationService organizationService, IUserService userService, IHostingEnvironment hostingEnvironment)
        {
            _organizationService = organizationService;
            _userService = userService;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task<OrganizationInfo> CreateOrganizationInfo(OrganizationInfo model)
        {
            if (model.id > 0)
            {
                //model.status = true;
                return await _organizationService.UpdateOrganizationInfo(model);
            }
            else
            {
                model.organizationGuid = GuidGenerator.GetGuid();
                model.status = true;
                return await _organizationService.CreateOrganizationInfo(model);
            }
        }

        public OrganizationInfo GetOrganizationInfo(long id, bool status)
        {
            var response = _organizationService.GetOrganizationInfo(id, status);
            return response;
        }

        public OrganizationInfo GetOrganizationInfoByName(string name)
        {
            var response = _organizationService.GetOrganizationInfoByName(name, true);
            return response;
        }

        public OrganizationInfo CheckOrganizationForSignUp(RegisterViewModel model)
        {
            var response = _organizationService.GetOrganizationInfoByName(model.organizationName, true);
            if(response!=null && response.id > 0)
            {
                //_emailAction.OragnizationReceivingForNewUser(model, response);
            }
            return response;
        }

        public OrganizationInfo CheckSponsorOrganizationForSignUp(RegisterViewModel model)
        {
            var response = _organizationService.GetOrganizationInfoByName(model.organizationName, true);
            return response;
        }

        public OrganizationInfo GetOrganizationInfoByContactId(long id)
        {
            var response = _organizationService.GetOrganizationInfoByContactId(id, true);
            return response;
        }

        public List<OrganizationInfo> GetAllOrganizationInfo(bool status)
        {
            var response = _organizationService.GetAllOrganizationInfo(status);
            return response;
        }

        public async Task<OrganizationContact> CreateOrganizationContact(OrganizationContact model, bool doNotAddInvestigator = false)
        {
            var contact = new OrganizationContact();
            if (model.id > 0)
            {
                contact = await _organizationService.UpdateOrganizationContact(model);
                if (contact != null)
                {
                    var user = _userService.GetUserByIdWithoutStatus(model.userId);
                    if (user != null)
                    {
                        user.updatedBy = model.updatedBy;
                        user.updatedOn = DateTime.Now;
                        await _userService.Update(user);
                    }
                }
            }
            else
            {
                var _contact = await GetOrganizationContact(model.email);
                if (_contact != null)
                    return _contact;

                var user = new User();
                user.email = model.email;
                user.password = RandonPasswordGenerator.CreateRandomPasswordWithRandomLength();
                user.createdBy = model.createdBy;
                user.updatedBy = model.updatedBy;
                user.updatedOn = DateTime.Now;
                user.userStatus = UserStatus.Active;
                user.status = true;
                await _userService.Create(user);
                if (user != null && user.id > 0)
                {
                    model.userId = user.id;
                    model.status = true;
                    contact = await _organizationService.CreateOrganizationContact(model);
                   //await _emailAction.WelcomeMailForOrganizationContact(user, contact);
                }
            }

            return contact;
        }

        public async Task<bool> CheckOrganizationContact(OrganizationContact model)
        {
            return await _organizationService.CheckOrganizationContact(model);
        }

        private async Task<OrganizationContact> GetOrganizationContact(string email)
        {
            var response = await _organizationService.GetByEmailId(email);
            return response;
        }


        public async Task<bool> DeleteContact(long id)
        {
            return await _organizationService.DeleteContact(id);
        }
        
        private string ReadPhysicalFile(string path)
        {
            if (_hostingEnvironment == null)
                throw new InvalidOperationException($"{nameof(IHostingEnvironment)} is not initialized");

            IFileInfo fileInfo = _hostingEnvironment.ContentRootFileProvider.GetFileInfo(path);

            if (!fileInfo.Exists)
                throw new FileNotFoundException($"Template file located at \"{path}\" was not found");

            using (var fs = fileInfo.CreateReadStream())
            {
                using (var sr = new StreamReader(fs))
                {
                    return sr.ReadToEnd();
                }
            }
        }

        public OrganizationContact GetOrganizationContact(long id, bool status)
        {
            var response = _organizationService.GetOrganizationContact(id, status);
            return response;
        }

        public List<OrganizationContact> GetAllOrganizationContact(long organizationId, bool status)
        {
            var response = _organizationService.GetAllOrganizationContact(organizationId, status);
            return response;
        }

        public async Task<List<OrganizationContact>> GetAllOrganizationContacts(long organizationId)
        {
            var response = await _organizationService.GetAllOrganizationContacts(organizationId);
            return response;
        }

        public List<OrganizationContact> GetAllOrganizationContactByRoleName(long organizationInfoId, string roleName)
        {
            var response = _organizationService.GetAllOrganizationContactByRoleName(organizationInfoId, roleName);
            return response;
        }

        public List<OrganizationContact> GetAllOrganizationInvestigatorContact(long organizationId, bool status)
        {
            //var response = null;// _organizationService.GetAllOrganizationInvestigatorContact(organizationId, status);
            return null;
        }

        public OrganizationInfo GetOrganizationByContactId(long organizationContactId)
        {
            try
            {
                var contactModel = _organizationService.GetOrganizationContact(organizationContactId, true);
                if (contactModel != null)
                {
                    return _organizationService.GetOrganizationInfo(contactModel.organizationInfoId, true);
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> UpdateOrganizationContactTypeToHybrid(long organizationContactId)
        {
            return true;// await _organizationService.UpdateOrganizationContactTypeToHybrid(organizationContactId);
        }
        public List<OrganizationContact> GetOrganizationContactByStudyId(long organizationId, long sponsorSiteStudyCDAInvitationId, bool status)
        {
            //var response = _organizationService.GetOrganizationContactByStudyId(organizationId, sponsorSiteStudyCDAInvitationId, status);
            return null;
        }
    }
}

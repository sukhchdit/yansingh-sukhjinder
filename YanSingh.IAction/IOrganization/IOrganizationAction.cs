using System.Collections.Generic;
using System.Threading.Tasks;
using YanSingh.Model.Entities.Organization;
using YanSingh.Models.ViewModel.Account;
using YanSingh.Models.ViewModel.Organization;

namespace YanSingh.IAction.IOrganization
{
   public  interface IOrganizationAction
    {
        Task<OrganizationInfo> CreateOrganizationInfo(OrganizationInfo model);

        OrganizationInfo GetOrganizationInfo(long id, bool status);

        OrganizationInfo GetOrganizationInfoByName(string name);

        OrganizationInfo CheckOrganizationForSignUp(RegisterViewModel model);

        OrganizationInfo CheckSponsorOrganizationForSignUp(RegisterViewModel model);

        OrganizationInfo GetOrganizationInfoByContactId(long id);

        List<OrganizationInfo> GetAllOrganizationInfo(bool status);

        Task<OrganizationContact> CreateOrganizationContact(OrganizationContact model, bool doNotAddInvestigator = false);

        Task<bool> CheckOrganizationContact(OrganizationContact model);

        Task<bool> DeleteContact(long id);

        OrganizationContact GetOrganizationContact(long id, bool status);

        List<OrganizationContact> GetAllOrganizationInvestigatorContact(long organizationId, bool status);

        List<OrganizationContact> GetAllOrganizationContact(long organizationId, bool status);
        Task<List<OrganizationContact>> GetAllOrganizationContacts(long organizationId);
        List<OrganizationContact> GetAllOrganizationContactByRoleName(long organizationInfoId, string roleName);
        OrganizationInfo GetOrganizationByContactId(long organizationContactId);
        Task<bool> UpdateOrganizationContactTypeToHybrid(long organizationContactId);
        List<OrganizationContact> GetOrganizationContactByStudyId(long organizationId, long sponsorSiteStudyCDAInvitationId, bool status);
    }
}

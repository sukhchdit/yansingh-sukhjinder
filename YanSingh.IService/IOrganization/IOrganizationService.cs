using System.Collections.Generic;
using System.Threading.Tasks;
using YanSingh.Model.Entities.Organization;

namespace YanSingh.IService.IOrganization
{
    public interface IOrganizationService
    {
        Task<OrganizationInfo> CreateOrganizationInfo(OrganizationInfo model);

        Task<OrganizationInfo> UpdateOrganizationInfo(OrganizationInfo model);

        OrganizationInfo GetOrganizationInfo(long id, bool status);

        OrganizationInfo GetOrganizationInfoByName(string name, bool status);

        OrganizationInfo GetOrganizationInfoByContactId(long id, bool status);

        List<OrganizationInfo> GetAllOrganizationInfo(bool status);

        Task<OrganizationContact> CreateOrganizationContact(OrganizationContact model);

        Task<OrganizationContact> UpdateOrganizationContact(OrganizationContact model);

        Task<bool> CheckOrganizationContact(OrganizationContact model);

        Task<bool> DeleteContact(long id);

        OrganizationContact GetOrganizationContact(long id, bool status);

        OrganizationContact GetOrganizationContactByUserId(long userId, bool status);
        string GetOrganizationContactFullName(long id);

        List<OrganizationContact> GetAllOrganizationContact(long organizationId, bool status);

        Task<List<OrganizationContact>> GetAllOrganizationContacts(long organizationId);

        List<OrganizationContact> GetAllOrganizationContactByRoleName(long organizationInfoId, string roleName);

        OrganizationContact GetOrganizationContactByUserId(long userId);

        OrganizationContact GetOrganizationContactByContactId(long organizationContactId, bool status);

        Task<OrganizationContact> GetByEmailId(string email);

        Task<OrganizationInfo> Get(long id);
    }
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cosmos.Model.Entities.Organization
{
    public enum OrganizationType
    {
        SuperAdmin = 0,
        Site = 1,
        Sponsor,
        Monitor,
        CRO
    }

    [Table("organizationinfos")]
    public class OrganizationInfo : BaseEntity
    {
        public string name { get; set; }
        public OrganizationType type { get; set; }
        public string description { get; set; }
        public string taxId { get; set; }
        public string content { get; set; }
        public string organizationGuid { get; set; }

        public IReadOnlyCollection<OrganizationContact> OrganizationContacts { get; set; }

    }
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Cosmos.Models.Entities.Account;

namespace Cosmos.Model.Entities.Organization
{
    public enum UserType { Admin=1, User, Investigator}

    public class OrganizationContact : BaseContact
    {
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public long? salutationId { get; set; }
        public long? roleTypeId { get; set; }
        public long? roleId { get; set; }
        public long userId { get; set; }
        [ForeignKey("userId")]
        public User user { get; set; }
        public long organizationInfoId { get; set; }
        [NotMapped]
        [ForeignKey("organizationInfoId")]
        public OrganizationInfo organizationInfo { get; set; }

        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{firstName} {lastName}";
            }
        }
    }
}

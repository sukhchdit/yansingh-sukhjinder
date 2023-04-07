using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Cosmos.Model.Entities;
using Cosmos.Model.Entities.Organization;

namespace Cosmos.Models.Entities.Account
{
    public enum UserStatus { Pending=1, Active, Suspended, EmailActivationPending, Rejected}

    [Table("users")]
    public class User : BaseEntity 
    {
        [Required]
        public string email { get; set; }
        public string resetPasswordKey { get; set; }
        public DateTime? ResetPasswordTimeStamp { get; set; }
        public string emailVerificationKey { get; set; }
        public UserStatus userStatus { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }
        public DateTime lastLoginAt { get; set; }
        [NotMapped]
        public string password { get; set; }

        public virtual OrganizationContact OrganizationContact { get; set; }
    }
}

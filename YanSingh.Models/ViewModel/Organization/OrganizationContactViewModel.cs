using System;
using System.Collections.Generic;
using System.Text;
using YanSingh.Model.Entities.Organization;
using YanSingh.Models.Entities.Account;

namespace YanSingh.Models.ViewModel.Organization
{
    public class OrganizationContactViewModel
    {
        public OrganizationContact organizationContact { get; set; }
        public User user { get; set; }
    }

    public class OrganziationContactDetailViewModel
    {
        public string Name { get; set; }
        public string SaluationType { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string OrganizationName { get; set; }
        public bool IsVerified { get; set; }
        public string UserRole { get; set; }
    }
}

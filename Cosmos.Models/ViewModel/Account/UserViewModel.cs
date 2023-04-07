using System;
using System.Collections.Generic;
using System.Text;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Account;

namespace Cosmos.Models.ViewModel.Account
{
    public class UserViewModel
    {
        public long id { get; set; }
        public long organizationContactId { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string organizationName { get; set; }
        public OrganizationType organizationType { get; set; }
        public DateTime date { get; set; }
        public UserStatus userStatus { get; set; }
        public string name { get; set; }

    }
}

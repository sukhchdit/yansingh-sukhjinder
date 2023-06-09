﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Account;

namespace Cosmos.Models.ViewModel.Account
{
    public class RegisterViewModel
    {
        [Required]
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string phone { get; set; }
        public string password { get; set; }
        public bool enableEmailApproval { get; set; }
        public string clientAppBaseUrl { get; set; }
        public string organizationName { get; set; }
        public OrganizationType organizationType { get; set; }
    }
}

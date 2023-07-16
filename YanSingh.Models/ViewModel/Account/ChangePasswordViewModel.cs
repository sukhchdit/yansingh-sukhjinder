using System;
using System.Collections.Generic;
using System.Text;

namespace YanSingh.Models.ViewModel.Account
{
    public class ChangePasswordViewModel
    {
        public string email { get; set; }
        public string currentPassword { get; set; }
        public string newPassword { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using YanSingh.Models.Entities.Account;

namespace YanSingh.Models.ViewModel.Account
{
    public class AuthenticationResponse
    {
        public bool isPasswordOrEmailIncorrent { get; set; }
        public UserStatus userStatus { get; set; }

        public string accessToken { get; set; }
        public int expiresIn { get; set; }
        public bool isResetPasswordKeyExpired { get; set; }
    }

    public class TokenWithStudies
    {
        public string token { get; set; }
    }
}

using System;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Cosmos.API.Controllers.Base
{
    [Authorize]
    public abstract class CosmosBaseController : ControllerBase
    {
        public long UserId
        {
            get
            {
                return Convert.ToInt32(User.Identity.Name);
            }
        }
        public string Name
        {
            get
            {
                var firstname = User.Claims.FirstOrDefault(k => k.Type == "firstName");
                var lastname =  User.Claims.FirstOrDefault(k => k.Type == "lastName");
                return $"{ firstname.Value} {lastname}";
            }
        }
    }
}

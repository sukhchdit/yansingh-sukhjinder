using Cosmos.Models.Entities.Account;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cosmos.Models.Helpers
{
    public static class SessionManager
    {
        //public static User LoggedInUser
        //{
        //    get
        //    {
        //        return HttpContext.Current.Session["UserId"] == null ? new User { access = new UserAccess() } : (Users)HttpContext.Current.Session["UserId"];
        //    }
        //    set
        //    {
        //        HttpContext.Current.Session["UserId"] = value;
        //    }
        //}

        //public static bool ValidateUser()
        //{
        //    if (SessionManager.LoggedInUser.UserID > 0)
        //        return true;
        //    return false;
        //}

        //public static List<AdminRoles.SecurityRoleMatrix> GetSecurityRolesMatrix()
        //{
        //    if (HttpContext.Current.Session["SecurityRolesMatrix"] == null)
        //    {
        //        UserRoleManagement role_management = new UserRoleManagement();
        //        var _roles_matrix = role_management.GetSecurityRoleMatrix();
        //        HttpContext.Current.Session["SecurityRolesMatrix"] = _roles_matrix;
        //        return _roles_matrix;
        //    }
        //    else
        //    {
        //        return (List<AdminRoles.SecurityRoleMatrix>)HttpContext.Current.Session["SecurityRolesMatrix"];
        //    }
        //}
    }
}

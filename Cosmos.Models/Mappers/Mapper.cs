using System;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.ViewModel.Account;


namespace Cosmos.Models.Mappers
{
    public static class Mapper
    {
        public static User MapRegisterUser(RegisterViewModel model)
        {
            var user = new User();
            user.email = model.email;
            user.userStatus = UserStatus.Pending;
            user.password = model.password;
            return user;
        }

        public static void MapUser(User model, User obj)
        {
            obj.email = model.email;
            obj.createdBy = model.createdBy;
            obj.updatedBy = model.updatedBy;
        }

        public static OrganizationContact MapOrganizationContact(RegisterViewModel model, OrganizationInfo organizationInfo, User user)
        {
            OrganizationContact obj = new OrganizationContact();
            obj.email = model.email;
            obj.firstName = model.firstName;
            obj.lastName = model.lastName;
            obj.organizationInfo = organizationInfo;
            obj.organizationInfoId = organizationInfo.id;
            obj.phone = model.phone;
            obj.userId = user.id;
            obj.status = true;
            obj.createdOn = DateTime.Now;
            obj.updatedOn = DateTime.Now;
            
            return obj;
        }


    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cosmos.Infrastructure.UnitOfWork;
using Cosmos.IService.IOrganization;
using Cosmos.Model.Entities.Organization;
using Microsoft.EntityFrameworkCore;

namespace Cosmos.Service.Organization
{
    public class OrganizationService : IOrganizationService
    {
        private IUnitOfWork _unitOfWork;

        public OrganizationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<OrganizationInfo> Get(long id)
        {
            var _e = await _unitOfWork.OrganizationInfoRepository.GetAllIQueryable(a => a.id == id)
                .FirstOrDefaultAsync();
            return _e;
        }

        public async Task<OrganizationInfo> CreateOrganizationInfo(OrganizationInfo model)
        {

            _unitOfWork.OrganizationInfoRepository.Add(model);
            await _unitOfWork.Commit();
            return model;
        }

        public async Task<OrganizationInfo> UpdateOrganizationInfo(OrganizationInfo model)
        {
            _unitOfWork.OrganizationInfoRepository.Update(model);
            await _unitOfWork.Commit();
            return model;
        }

        public OrganizationInfo GetOrganizationInfo(long id, bool status)
        {
            try
            {
                OrganizationInfo model = _unitOfWork.OrganizationInfoRepository
                    .Get(x => x.id == id && x.status == status);
                if (model != null)
                {
                    //add properties here if required
                }
                return model;
            }
            catch (Exception exp) { }
            return null;
        }

        public OrganizationInfo GetOrganizationInfoByName(string name, bool status)
        {
            try
            {
                OrganizationInfo model = _unitOfWork.OrganizationInfoRepository.Get(x => x.name.Trim().ToLower() == name.Trim().ToLower() && x.status == status);
                if (model != null)
                {
                    //add properties here if required
                }
                return model;
            }
            catch (Exception exp) { }
            return null;
        }

        public OrganizationInfo GetOrganizationInfoByContactId(long id, bool status)
        {
            try
            {
                var organizationInfoId = _unitOfWork.OrganizationContactRepository.Get(x => x.id == id).organizationInfoId;
                OrganizationInfo model = _unitOfWork.OrganizationInfoRepository.Get(x => x.id == organizationInfoId && x.status == status);
                if (model != null)
                {
                    //add properties here if required
                }
                return model;
            }
            catch (Exception exp) { }
            return null;
        }

        public OrganizationContact GetOrganizationContactByUserId(long userId)
        {
            try
            {
                var model = _unitOfWork.OrganizationContactRepository.Get(x => x.userId == userId);
                return model;
            }
            catch (Exception exp) { }
            return null;
        }

        public List<OrganizationInfo> GetAllOrganizationInfo(bool status)
        {
            List<OrganizationInfo> model = _unitOfWork.OrganizationInfoRepository.GetAll(x => x.status == status);

            return model;
        }

        public async Task<OrganizationContact> CreateOrganizationContact(OrganizationContact model)
        {

            _unitOfWork.OrganizationContactRepository.Add(model);
            await _unitOfWork.Commit();
            return model;
        }

        public async Task<OrganizationContact> UpdateOrganizationContact(OrganizationContact model)
        {
            _unitOfWork.OrganizationContactRepository.Update(model);
            await _unitOfWork.Commit();
            return model;
        }

        public async Task<bool> CheckOrganizationContact(OrganizationContact model)
        {
            var contacts = new List<OrganizationContact>();
            if (model.id > 0)
                contacts = await _unitOfWork.OrganizationContactRepository.GetAllAsync(x => x.firstName == model.firstName && x.lastName == model.lastName && x.email == model.email && x.phone == model.phone && x.mobile == model.mobile && x.id != model.id);
            else
                contacts = await _unitOfWork.OrganizationContactRepository.GetAllAsync(x => x.firstName == model.firstName && x.lastName == model.lastName && x.email == model.email && x.phone == model.phone && x.mobile == model.mobile);

            return contacts != null && contacts.Count > 0;
        }

        public async Task<bool> DeleteContact(long id)
        {
            try
            {
                var model = _unitOfWork.OrganizationContactRepository.Get(x => x.id == id);
                model.status = false;
                _unitOfWork.OrganizationContactRepository.Update(model);
                await _unitOfWork.Commit();
                return true;
            }
            catch (Exception) { }
            return false;
        }

        public async Task<OrganizationContact> GetByEmailId(string email)
        {
            var _entity = await _unitOfWork.OrganizationContactRepository.GetAsync(x => x.email == email);
            return _entity;
        }

        public OrganizationContact GetOrganizationContact(long id, bool status)
        {
            try
            {
                var model = _unitOfWork.OrganizationContactRepository.Get(x => x.id == id && x.status == status);
                if (model != null)
                {
                    //add properties here if required
                }
                return model;
            }
            catch (Exception exp) { }
            return null;
        }

        public OrganizationContact GetOrganizationContactByUserId(long userId, bool status)
        {
            try
            {
                var model = _unitOfWork.OrganizationContactRepository.Get(x => x.userId == userId && x.status == status);
                if (model != null)
                {
                    //add properties here if required
                }
                return model;
            }
            catch (Exception exp) { }
            return null;
        }

        public string GetOrganizationContactFullName(long userId)
        {
            try
            {
                var fullName = string.Empty;
                var model = _unitOfWork.OrganizationContactRepository.Get(x => x.userId == userId && x.status);
                if (model != null)
                {
                    fullName = ((model.lastName != null && model.lastName.Trim() != "") ? model.lastName + ", " : "") + model.firstName;
                }
                return fullName;
            }
            catch (Exception exp) { }
            return "";
        }


        public OrganizationContact GetOrganizationContactByContactId(long organizationContactId, bool status)
        {
            try
            {
                var model = _unitOfWork.OrganizationContactRepository.Get(x => x.id == organizationContactId && x.status == status);
                return model;
            }
            catch (Exception exp) { }
            return null;
        }

        public List<OrganizationContact> GetAllOrganizationContact(long organizationId, bool status)
        {
            var model = _unitOfWork.OrganizationContactRepository.GetAll(x => x.organizationInfoId == organizationId && x.status == status);

            return model;
        }

        public async Task<List<OrganizationContact>> GetAllOrganizationContacts(long organizationId)
        {
            var model = await _unitOfWork.OrganizationContactRepository.GetAllAsync(x => x.organizationInfoId == organizationId);

            return model;
        }

        public List<OrganizationContact> GetAllOrganizationContactByRoleName(long organizationInfoId, string roleName)
        {
            var model = _unitOfWork.OrganizationContactRepository.ExecuteQuery($"Call getContactsByRoleName({organizationInfoId},'{ "%" + roleName + "%"}')");            
            return model;
        }

        

    }
}

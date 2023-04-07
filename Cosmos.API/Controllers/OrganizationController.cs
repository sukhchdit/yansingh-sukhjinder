using System;
using System.Linq;
using System.Threading.Tasks;
using Cosmos.IAction.IOrganization;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.ViewModel.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cosmos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("MyPolicy")]
    [Authorize]
    public class OrganizationController : ControllerBase
    {
        private IOrganizationAction _organizationAction;

        public OrganizationController(IOrganizationAction organizationAction)
        {
            _organizationAction = organizationAction;
        }

        [HttpGet]
        [Route("GetOrganization")]
        public IActionResult GetOrganization(long id)
        {
            try
            {
                var model = _organizationAction.GetOrganizationInfo(id, true);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpGet]
        [Route("GetOrganizationInfoByName")]
        public IActionResult GetOrganizationInfoByName(string name)
        {
            try
            {
                var model = _organizationAction.GetOrganizationInfoByName(name);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [AllowAnonymous]
        [HttpPost]
        [Route("CheckOrganizationForSignUp")]
        public IActionResult CheckOrganizationForSignUp(RegisterViewModel model)
        {
            try
            {
                var response = _organizationAction.CheckOrganizationForSignUp(model);
                return Ok(response);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpPost]
        [Route("CheckSponsorOrganizationForSignUp")]
        public IActionResult CheckSponsorOrganizationForSignUp(RegisterViewModel model)
        {
            try
            {
                var response = _organizationAction.CheckSponsorOrganizationForSignUp(model);
                return Ok(response);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpGet]
        [Route("GetOrganizationInfoByContactId")]
        public IActionResult GetOrganizationInfoByContactId(long id)
        {
            try
            {
                var model = _organizationAction.GetOrganizationInfoByContactId(id);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpGet]
        [Route("GetAllOrganization")]
        public IActionResult GetAllOrganization()
        {
            try
            {
                var model = _organizationAction.GetAllOrganizationInfo(true);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpPost]
        [Route("SaveOrganization")]
        public IActionResult SaveOrganization(OrganizationInfo model)
        {
            try
            {
                var response = _organizationAction.CreateOrganizationInfo(model);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpGet]
        [Route("DeleteContact")]
        public IActionResult DeleteContact(long id)
        {
            try
            {
                var response = _organizationAction.DeleteContact(id);
                return Ok(response);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpGet]
        [Route("GetAllOrganizationContact")]
        public IActionResult GetAllOrganizationContact(long organizationId)
        {
            try
            {
                var model = _organizationAction.GetAllOrganizationContact(organizationId, true);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }
        }

        [HttpGet]
        [Route("GetAllOrganizationContacts")]
        public async Task<IActionResult> GetAllOrganizationContacts(long organizationId)
        {
            try
            {
                var model = await _organizationAction.GetAllOrganizationContacts(organizationId);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }
        }

        [HttpGet]
        [Route("GetOrganizationContactByStudyId")]
        public IActionResult GetOrganizationContactByStudyId(long organizationId, long sponsorSiteStudyCDAInvitationId)
        {
            try
            {
                var model = _organizationAction.GetOrganizationContactByStudyId(organizationId, sponsorSiteStudyCDAInvitationId, true);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }
        }

        [HttpGet]
        [Route("GetAllOrganizationContactByRoleName")]
        public IActionResult GetAllOrganizationContactByRoleName(long organizationInfoId, string roleName)
        {
            try
            {
                var model = _organizationAction.GetAllOrganizationContactByRoleName(organizationInfoId, roleName);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }
        }

        [HttpGet]
        [Route("GetAllOrganizationInvestigatorContact")]
        public IActionResult GetAllOrganizationInvestigatorContact(long organizationId)
        {
            try
            {
                var model = _organizationAction.GetAllOrganizationInvestigatorContact(organizationId, true);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }
        }

        [HttpGet]
        [Route("GetOrganizationContact")]
        public IActionResult GetOrganizationContact(long Id)
        {
            try
            {
                var model = _organizationAction.GetOrganizationContact(Id, true);
                return Ok(model);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }
        }

        [HttpPost]
        [Route("CheckOrganizationContact")]
        public async Task<IActionResult> CheckOrganizationContact(OrganizationContact model)
        {
            try
            {
                var response = await _organizationAction.CheckOrganizationContact(model);
                return Ok(response);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }
        }

        [HttpPost]
        [Route("SaveOrganizationContact")]
        public async Task<IActionResult> SaveOrganizationContact(OrganizationContact model)
        {
            try
            {
                var response = await _organizationAction.CreateOrganizationContact(model);
                //if (response.id > 0 && response.isInvestigator)
                //{
                //    var investigator = new InvestigatorInfo
                //    {
                //        createdBy = model.createdBy,
                //        updatedBy = model.updatedBy,
                //        createdOn = model.createdOn,
                //        updatedOn = model.updatedOn,
                //        status = true,
                //        email = response.email,
                //        fax = response.fax,
                //        firstName = response.firstName,
                //        middleName = response.middleName,
                //        lastName = response.lastName,
                //        isMaster = true,
                //        mobile = response.mobile,
                //        organizationContactId = response.id,
                //        phone = response.phone,
                //        salutationId = response.salutationId,
                //        organizationInfoId = response.organizationInfoId
                //    };
                //    await _investigatorAction.Create(investigator);
                //}
                if (response.id>0)
                    return Ok(response);
                else
                    return Ok(new { message = "Failed to create Organization Contact" });
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpGet]
        [Route("GetOrganizationByContactId")]
        public IActionResult GetOrganizationByContactId(long organizationContactId)
        {
            var organization = _organizationAction.GetOrganizationByContactId(organizationContactId);
            return Ok(organization);
        }

        [HttpGet]
        [Route("UpdateOrganizationContactTypeToHybrid")]
        public IActionResult UpdateOrganizationContactTypeToHybrid(long organizationContactId)
        {
            try
            {
                var response = _organizationAction.UpdateOrganizationContactTypeToHybrid(organizationContactId);
                return Ok(response.Result);
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

    }
}
using Cosmos.IAction.IMaid;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Cosmos.Models.Entities.Maid;

namespace Cosmos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaidController : ControllerBase
    {
        private IMaidAction _maidAction;

        public MaidController(IMaidAction maidAction)
        {
            _maidAction = maidAction;
        }

        [HttpPost]
        [Route("SaveMaid")]
        public async Task<IActionResult> SaveMaid(MaidDetail model)
        {
            try
            {
                var response = await _maidAction.CreateMaidDetail(model);
                
                if (response.id > 0)
                    return Ok(response);
                else
                    return Ok(new { message = "Failed to save record" });
            }
            catch (Exception exp)
            {
                return BadRequest(new { message = exp.Message });
            }

        }

        [HttpGet]
        [Route("GetMaidById")]
        public IActionResult GetMaidById(long maidId)
        {
            var model = _maidAction.GetMaidDetails(maidId);
            return Ok(model);
        }

        [HttpGet]
        [Route("GetAllActiveMaids")]
        public IActionResult GetAllActiveMaids()
        {
            var model = _maidAction.GetAllMaidDetail();
            return Ok(model);
        }

        [HttpGet]
        [Route("GetAllDeletedMaids")]
        public IActionResult GetAllDeletedMaids()
        {
            var model = _maidAction.GetAllDeletedMaids();
            return Ok(model);
        }

        [HttpGet]
        [Route("DeleteMaid")]
        public IActionResult DeleteMaid(long id)
        {
            var model = _maidAction.DeleteMaid(id);
            return Ok(model);
        }


    }
}

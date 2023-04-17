using Cosmos.IAction.IMaid;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Cosmos.Models.Entities.Maid;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.Helpers;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;

namespace Cosmos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaidController : ControllerBase
    {
        private IMaidAction _maidAction;
        private IWebHostEnvironment _hostingEnvironment;
        public MaidController(IMaidAction maidAction, IWebHostEnvironment hostingEnvironment)
        {
            _maidAction = maidAction;
            _hostingEnvironment = hostingEnvironment;
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

        [Route("UploadMaidPhoto")]
        [HttpPost]
        public IActionResult UploadMaidPhoto()
        {
            try
            {
                string webRootPath = _hostingEnvironment.WebRootPath;
                var file = Request.Form.Files[0];
                var maidId = Request.Form["maidId"];

                if (file != null && file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var pathToSaveFile = Path.Combine(Directory.GetCurrentDirectory(), "ProfileImages");

                    var firstFileFullPath = Path.Combine(pathToSaveFile, fileName);

                    if (!Directory.Exists(pathToSaveFile))
                        Directory.CreateDirectory(pathToSaveFile);

                    using (var stream = new FileStream(firstFileFullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok("Success");
                }
                else
                {
                    return Ok("Failed to save");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cosmos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public ValuesController()
        {
            //_converter = converter;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            //string strHTML = GetHTMLString();
            //CreatePDF(strHTML,1,false,"");
            //MergePdfFiles mergePdfFiles = new MergePdfFiles();
            //mergePdfFiles.CreateMergedPDF("F:\\PDF\\Merged.pdf", "F:\\SamplePDFS");
            return new string[] { "value1", DateTime.Now.ToString(), "With three values" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}

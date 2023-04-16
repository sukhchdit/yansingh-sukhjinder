using Cosmos.Model.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cosmos.Models.Entities.Maid
{
    public class MaidExperience:BaseEntity
    {
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string countryName { get; set; }
        public string experienceYears { get; set; }
        public string sizeOfHouse { get; set;}
        public string lastSalary { get; set; }
        public int  numberOfPersonServed { get; set; }
        public string reasonOfLeaving { get; set; }
        public long maidDetailId { get; set; }

        //[NotMapped]
        //[ForeignKey("maidDetailId")]
        public MaidDetail maidDetail { get; set; }
        public IList<MaidExperienceJobDuty> maidExperienceJobDuty { get; set; }

    }
}

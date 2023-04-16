using Cosmos.Model.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cosmos.Models.Entities.Maid
{
    public class MaidExperienceJobDuty : BaseEntity
    {
        public string dutyName { get; set; }
        public long maidExperienceId { get; set; }

        //[NotMapped]
        //[ForeignKey("maidExperienceId")]
        public MaidExperience maidExperience { get; set; }
    }
}

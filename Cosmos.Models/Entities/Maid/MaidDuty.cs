using Cosmos.Model.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Text;

namespace Cosmos.Models.Entities.Maid
{
    public class MaidDuty:BaseEntity
    {
        public string dutyName { get; set; }
        public long maidDetailId { get; set; }

        //[NotMapped]
        //[ForeignKey("maidDetailId")]
        public MaidDetail maidDetail { get; set; }
    }
}

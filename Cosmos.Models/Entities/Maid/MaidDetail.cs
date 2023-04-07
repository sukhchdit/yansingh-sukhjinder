using Cosmos.Model.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cosmos.Models.Entities.Maid
{
    [Table("maiddetails")]
    public class MaidDetail:BaseEntity
    {
        public string name { get; set; }
        public string nickName { get; set; }
        public string lastName { get; set; }
        public string nationality { get; set; }
        public string age { get; set; }
        public string dateOfBirth { get; set; }
        public string education { get; set; }
        public string maritalStatus { get; set; }
        public string religion { get; set; }
        public string chineseZodiac { get; set; }
        public string maidType { get; set; }
        public string height { get; set; }
        public string weight { get; set; }
        public string maidCode { get; set; }
        public string lastFinishContractDate { get; set;}
            public string spouseName { get; set;}
        public string spouseOccupation { get; set; }
        public string siblings { get; set; }
        public bool workOnHoliday { get; set; }
        public bool eatPork { get; set; }
        public string spouseName { get; set; }
        public string spouseName { get; set; }
        public string spouseName { get; set; }
        public string spouseName { get; set; }
        public string spouseName { get; set; }

    }
}

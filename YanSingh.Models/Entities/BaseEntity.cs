using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using YanSingh.Models.Entities.Account;

namespace YanSingh.Model.Entities
{
    public class BaseEntity
    {
        [Key]
        public long id { get; set; }
        public long createdBy { get; set; }
        public DateTime createdOn { get; set; } = DateTime.UtcNow;
        public long updatedBy { get; set; }
        public DateTime updatedOn { get; set; }
        public bool status { get; set; } = true;
    }

    public class AuditColumns
    {
        [Key]
        public Guid id { get; set; } = Guid.NewGuid();//.ToString();
        public long createdBy { get; set; }
        public DateTime createdOn { get; set; } = DateTime.UtcNow;
        public long updatedBy { get; set; }
        public DateTime? updatedOn { get; set; }
        public bool status { get; set; } = true;
    }
}

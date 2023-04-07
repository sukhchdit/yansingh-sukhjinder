using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Cosmos.Models.Entities.Account;

namespace Cosmos.Model.Entities
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

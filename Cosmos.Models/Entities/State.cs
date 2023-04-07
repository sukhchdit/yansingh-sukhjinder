using System.ComponentModel.DataAnnotations.Schema;

namespace Cosmos.Model.Entities
{
    [Table("states")]
    public class State : BaseEntity
    {
        public string name { get; set; }

        /// <summary>
        /// Foreign key
        /// </summary>
        public long countryId { get; set; }
        public Country country { get; set; }
    }
}

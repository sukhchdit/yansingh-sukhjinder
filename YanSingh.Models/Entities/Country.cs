using System.ComponentModel.DataAnnotations.Schema;

namespace YanSingh.Model.Entities
{
    [Table("countries")]
    public class Country : BaseEntity
    {
        public string name { get; set; }
        public int phonecode { get; set; }
        public string currencyCode { get; set; }
        public string currencySymbol { get; set; }
    }
}

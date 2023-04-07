using Cosmos.Model.Entities;

namespace Cosmos.Models.Entities.Account
{
    public class UserSession:BaseEntity
    {
        public string correlationId { get; set; }
        public long userId { get; set; }
        public User user { get; set; }
    }
}

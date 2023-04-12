#region Namespaces
using Cosmos.Model.Entities;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.Entities.Maid;
using Microsoft.EntityFrameworkCore;
#endregion namespaces

namespace Cosmos.DAL
{
    public class CosmosDbContext : DbContext
    {
        private DbContextOptions _options;
        //private string _connection;
        public CosmosDbContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }

        public CosmosDbContext()
        {

        }

        #region savechanges

        //public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        //{
        //    foreach (var entry in ChangeTracker.Entries())
        //    {
        //        var entity = (EntityBase)entry.Entity;

        //        if (entry.State == EntityState.Added)
        //        {
        //            entity.DateCreated = DateTime.Now;
        //            entity.DateUpdated = DateTime.Now;
        //            entity.Status = true;
        //        }
        //        else if (entry.State == EntityState.Modified)
        //            entity.DateUpdated = DateTime.Now;
        //    }
        //    return await base.SaveChangesAsync(true, cancellationToken);
        //}
        #endregion

        #region Entities

        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Right> Rights { get; set; }
        public DbSet<OrganizationInfo> OrganizationInfos { get; set; }
        public DbSet<OrganizationContact> OrganizationContacts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserSession> UserSessions { get; set; }
        public DbSet<MaidDetail> MaidDetails { get; set; }
        public DbSet<MaidExperience> MaidExperiences { get; set; }
        public DbSet<MaidDuty> MaidDuties { get; set; }
        public DbSet<MaidExperienceJobDuty> MaidExperienceJobDuties { get; set; }


        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}

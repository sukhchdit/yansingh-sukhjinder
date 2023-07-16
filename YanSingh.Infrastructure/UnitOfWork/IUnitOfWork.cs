using System;
using System.Threading.Tasks;
using YanSingh.Infrastructure.Repository;
using YanSingh.Model.Entities;
using YanSingh.Model.Entities.Organization;
using YanSingh.Models.Entities.Account;
using YanSingh.Models.Entities.Maid;

namespace YanSingh.Infrastructure.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<State> StateRepository { get; }

        IGenericRepository<Country> CountryRepository { get; }

        IGenericRepository<OrganizationInfo> OrganizationInfoRepository { get; }

        IGenericRepository<OrganizationContact> OrganizationContactRepository { get; }

        IGenericRepository<User> UserRepository { get; }

        IGenericRepository<UserSession> UserSessionRepository { get; }
        IGenericRepository<MaidDetail> MaidDetailRepository { get; }

        IGenericRepository<MaidDuty> MaidDutyRepository { get; }

        IGenericRepository<MaidExperience> MaidExperienceRepository { get; }

        IGenericRepository<MaidExperienceJobDuty> MaidExperienceJobDutyRepository { get; }

        Task<bool> Commit();
        void CommitSync();
    }
}

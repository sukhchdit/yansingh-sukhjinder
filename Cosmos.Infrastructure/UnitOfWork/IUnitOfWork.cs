﻿using System;
using System.Threading.Tasks;
using Cosmos.Infrastructure.Repository;
using Cosmos.Model.Entities;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.Entities.Maid;

namespace Cosmos.Infrastructure.UnitOfWork
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

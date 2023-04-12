using System;
using System.Threading.Tasks;
using Cosmos.DAL;
using Cosmos.Infrastructure.Repository;
using Cosmos.Model.Entities;
using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Account;
using Cosmos.Models.Entities.Maid;

namespace Cosmos.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private CosmosDbContext _context;

        public UnitOfWork(CosmosDbContext context)
        {
            this._context = context;
        }

        private IGenericRepository<State> stateRepository;

        private IGenericRepository<Country> countryRepository;

        private IGenericRepository<OrganizationInfo> organizationInfoRepository;

        private IGenericRepository<OrganizationContact> organizationContactRepository;

        private IGenericRepository<User> userRepository;

        private IGenericRepository<UserSession> userSessionRepository;

        private IGenericRepository<MaidDetail> maidDetailRepository;

        private IGenericRepository<MaidExperience> maidExperienceRepository;

        private IGenericRepository<MaidDuty> maidDutyRepository;

        private IGenericRepository<MaidExperienceJobDuty> maidExperienceJobDutyRepository;

        public IGenericRepository<MaidDetail> MaidDetailRepository {
            get
            {
                if (this.maidDetailRepository == null)
                {
                    this.maidDetailRepository = new GenericRepository<MaidDetail>(this._context);
                }
                return this.maidDetailRepository;
            }
        }

        public IGenericRepository<MaidDuty> MaidDutyRepository {
            get
            {
                if (this.maidDutyRepository == null)
                {
                    this.maidDutyRepository = new GenericRepository<MaidDuty>(this._context);
                }
                return this.maidDutyRepository;
            }
        }

        public IGenericRepository<MaidExperience> MaidExperienceRepository {
            get
            {
                if (this.maidExperienceRepository == null)
                {
                    this.maidExperienceRepository = new GenericRepository<MaidExperience>(this._context);
                }
                return this.maidExperienceRepository;
            }
        }

        public IGenericRepository<MaidExperienceJobDuty> MaidExperienceJobDutyRepository {
            get
            {
                if (this.maidExperienceJobDutyRepository == null)
                {
                    this.maidExperienceJobDutyRepository = new GenericRepository<MaidExperienceJobDuty>(this._context);
                }
                return this.maidExperienceJobDutyRepository;
            }
        }

        public IGenericRepository<User> UserRepository
        {
            get
            {
                if (this.userRepository == null)
                {
                    this.userRepository = new GenericRepository<User>(this._context);
                }
                return this.userRepository;
            }
        }
        public IGenericRepository<UserSession> UserSessionRepository
        {
            get
            {
                if (this.userSessionRepository == null)
                {
                    this.userSessionRepository = new GenericRepository<UserSession>(this._context);
                }
                return this.userSessionRepository;
            }
        }

        public IGenericRepository<OrganizationContact> OrganizationContactRepository
        {
            get
            {
                if (this.organizationContactRepository == null)
                {
                    this.organizationContactRepository = new GenericRepository<OrganizationContact>(this._context);
                }
                return this.organizationContactRepository;
            }
        }
        public IGenericRepository<OrganizationInfo> OrganizationInfoRepository
        {
            get
            {
                if (this.organizationInfoRepository == null)
                {
                    this.organizationInfoRepository = new GenericRepository<OrganizationInfo>(this._context);
                }
                return this.organizationInfoRepository;
            }
        }
        public IGenericRepository<Country> CountryRepository
        {
            get
            {
                if (this.countryRepository == null)
                {
                    this.countryRepository = new GenericRepository<Country>(this._context);
                }
                return this.countryRepository;
            }
        }
        public IGenericRepository<State> StateRepository
        {
            get
            {
                if (this.stateRepository == null)
                {
                    this.stateRepository = new GenericRepository<State>(this._context);
                }
                return this.stateRepository;
            }
        }


         public async Task<bool> Commit()
        {
            try
            {
                var _c = await this._context.SaveChangesAsync();
                return _c > 0;
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        public void CommitSync()
        {
            try
            {
                this._context.SaveChanges();
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        public void Dispose()
        {
            try
            {
                this._context.Dispose();
            }
            catch (Exception exp)
            {

            }
        }
    }
}

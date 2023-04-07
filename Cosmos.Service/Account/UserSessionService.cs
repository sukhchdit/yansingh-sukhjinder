using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Cosmos.Infrastructure.UnitOfWork;
using Cosmos.IService.Account;
using Cosmos.Models.Entities.Account;

namespace Cosmos.Service.Account
{
    public class UserSessionService : IUserSessionService
    {
        private IUnitOfWork _unitOfWork;

        public UserSessionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public UserSession GetUserSession(string corelationid)
        {
            var obj = _unitOfWork.UserSessionRepository.Get(e => e.correlationId == corelationid);
            return obj;
        }

        public async Task SetUserSession(UserSession model)
        {
            model.correlationId = Guid.NewGuid().ToString();
            _unitOfWork.UserSessionRepository.Add(model);
            await _unitOfWork.Commit();
        }

        public async Task UpdateUserSession(UserSession model)
        {
            var obj =_unitOfWork.UserSessionRepository.Get(e => e.id == model.id);
            if (obj != null)
            {
                _unitOfWork.UserSessionRepository.Update(model);
                await _unitOfWork.Commit();
            }
        }
    }
}

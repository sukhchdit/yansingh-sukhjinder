using Cosmos.IAction.IMaid;
using Cosmos.IService.Account;
using Cosmos.IService.IMaid;
using Cosmos.IService.IOrganization;
using Cosmos.Models.Entities.Maid;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cosmos.Action.Maid
{
    public class MaidAction:IMaidAction
    {
        private readonly IMaidService _maidService;

        public MaidAction(IMaidService maidService)
        {
            _maidService= maidService;
        }

        public async Task<MaidDetail> CreateMaidDetail(MaidDetail model)
        {
            await _maidService.CreateMaidDetail(model);
            return model;
        }

        public async Task<bool> CheckIfMaidExists(MaidDetail model)
        {
            var maids = await _maidService.CheckIfMaidExists(model);
            return maids;
        }

        public async Task<bool> DeleteMaid(long id)
        {
            var model = await _maidService.DeleteMaid(id);
            return true;
        }

        public MaidDetail GetMaidDetails(long id)
        {
            return _maidService.GetMaidDetails(id);
        }

        public List<MaidDetail> GetAllMaidDetail()
        {
            return _maidService.GetAllMaidDetail();
        }

        public List<MaidDetail> GetAllDeletedMaids()
        {
            return _maidService.GetAllDeletedMaids();
        }
    }
}

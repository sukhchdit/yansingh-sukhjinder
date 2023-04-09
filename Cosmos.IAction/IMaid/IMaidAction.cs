using Cosmos.Model.Entities.Organization;
using Cosmos.Models.Entities.Maid;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cosmos.IAction.IMaid
{
    public interface IMaidAction
    {
        Task<MaidDetail> CreateMaidDetail(MaidDetail model);

        Task<bool> CheckIfMaidExists(MaidDetail model);

        Task<bool> DeleteMaid(long id);

        MaidDetail GetMaidDetails(long id);

        List<MaidDetail> GetAllMaidDetail();

        List<MaidDetail> GetAllDeletedMaids();
    }
}

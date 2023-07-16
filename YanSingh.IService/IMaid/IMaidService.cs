using YanSingh.Models.Entities.Maid;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace YanSingh.IService.IMaid
{
    public interface IMaidService
    {
        Task<MaidDetail> CreateMaidDetail(MaidDetail model);

        Task<bool> CheckIfMaidExists(MaidDetail model);

        Task<bool> DeleteMaid(long id);

        MaidDetail GetMaidDetails(long id);

        List<MaidDetail> GetAllMaidDetail();

        List<MaidDetail> GetAllDeletedMaids();
    }
}

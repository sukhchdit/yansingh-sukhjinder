using Cosmos.Infrastructure.UnitOfWork;
using Cosmos.IService.IMaid;
using Cosmos.Models.Entities.Maid;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace Cosmos.Service.Maid
{
    public class MaidService:IMaidService
    {
        private IUnitOfWork _unitOfWork;
        public MaidService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }   

        public async Task<MaidDetail> CreateMaidDetail(MaidDetail model)
        {
            if (model.id == 0)
            {
                _unitOfWork.MaidDetailRepository.Add(model);
            }
            else
            {
                _unitOfWork.MaidDetailRepository.Update(model);
            }
            await _unitOfWork.Commit();
            return model;
        }

        public async Task<bool> CheckIfMaidExists(MaidDetail model)
        {
            var maids = await _unitOfWork.MaidDetailRepository.GetAllAsync(x=>x.email==model.email && x.phone == model.phone);
            return maids != null;
        }

        public async Task<bool> DeleteMaid(long id)
        {
            var model = _unitOfWork.MaidDetailRepository.Get(x => x.id == id);
            model.status = false;
            _unitOfWork.MaidDetailRepository.Update(model);
            await _unitOfWork.Commit();
            return true;
        }

        public MaidDetail GetMaidDetails(long id)
        {
            return _unitOfWork.MaidDetailRepository.Get(x=>x.id==id);
        }

        public List<MaidDetail> GetAllMaidDetail()
        {
            return _unitOfWork.MaidDetailRepository.GetAll(x => x.status==true);
        }

        public List<MaidDetail> GetAllDeletedMaids()
        {
            return _unitOfWork.MaidDetailRepository.GetAll(x => x.status == false);
        }
    }
}

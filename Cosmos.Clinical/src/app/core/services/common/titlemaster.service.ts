import { Injectable } from '@angular/core';
import { AuthService } from '../../../account/services/auth.service';
import { TitleMaster } from '../../../models/common/titlemaster.model';
import { TitleMasterViewModel } from '../../../viewmodels/common/titlemasterviewmodel.model';
import { EndPointService } from '../endpoint.service';


@Injectable()
export class TitleMasterService {
  private readonly _getURL: string = "api/TitleMaster/Get";
  private readonly _getAllURL: string = "api/TitleMaster/GetAll";
  private readonly _getAllByTypeURL: string = "api/TitleMaster/GetAllByType";
  private readonly _getAllByMasterTypeIdURL: string = "api/TitleMaster/GetAllByMasterTypeId";
  private readonly _saveURL: string = "api/TitleMaster/Save";
  private readonly _deleteURL: string = "api/TitleMaster/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<TitleMaster>(url);
  }

  getAll() {
    return this.endpoint.get<TitleMasterViewModel[]>(this._getAllURL);
  }

  getAllByType(type:string) {
    return this.endpoint.get<TitleMaster[]>(this._getAllByTypeURL + "?type=" + type);
  }

  getAllByMasterTypeId(masterTypeId: number) {
    return this.endpoint.get<TitleMaster[]>(this._getAllByMasterTypeIdURL + "?masterTypeId=" + masterTypeId);
  }

  save(titlemaster: TitleMaster) {
    if (titlemaster.id <= 0)
      titlemaster.createdBy = this.authService.currentUser.id;
    titlemaster.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<TitleMaster>(titlemaster, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { MasterType } from '../../models/common/mastertype.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class MasterTypeService {
  private readonly _getURL: string = "api/MasterType/Get";
  private readonly _getAllURL: string = "api/MasterType/GetAll";
  private readonly _saveURL: string = "api/MasterType/Save";
  private readonly _deleteURL: string = "api/MasterType/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<MasterType>(url);
  }

  getAll() {
    return this.endpoint.get<MasterType[]>(this._getAllURL);
  }

  save(masterType: MasterType) {
    if (masterType.id <= 0)
      masterType.createdBy = this.authService.currentUser.id;
    masterType.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(masterType, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

}

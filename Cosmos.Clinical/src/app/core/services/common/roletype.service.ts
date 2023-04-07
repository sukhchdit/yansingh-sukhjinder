import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { RoleType } from '../../models/roletype.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class RoleTypeService {
  private readonly _getURL: string = "api/RoleType/Get";
  private readonly _getAllURL: string = "api/RoleType/GetAll";
  private readonly _getAllByTypeURL: string = "api/RoleType/GetAllByType";
  private readonly _saveURL: string = "api/RoleType/Save";
  private readonly _deleteURL: string = "api/RoleType/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<RoleType>(url);
  }

  getAll() {
    return this.endpoint.get<RoleType[]>(this._getAllURL);
  }

  getAllByType(type) {
    return this.endpoint.get<RoleType[]>(this._getAllByTypeURL + "?type=" + type);
  }

  save(roleType: RoleType) {
    if (roleType.id <= 0)
      roleType.createdBy = this.authService.currentUser.id;
    roleType.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<RoleType>(roleType, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

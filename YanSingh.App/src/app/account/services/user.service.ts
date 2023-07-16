import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User, UserStatus } from '../../models/account/user.model';
import { EndPointService } from 'src/app/core/services/endpoint.service';


@Injectable()
export class UserService {

  private readonly _getUserUrl: string = "api/account/GetUser";
  private readonly _getUsersByOrganizationIdUrl: string = "api/account/GetUsersByOrganizationId";
  private readonly _updateUserStatusUrl: string = "api/account/UpdateUserStatus";
  private readonly _updateUserStatusByUserIdUrl: string = "api/account/UpdateUserStatusByUserId";
  private readonly _updatePasswordUrl: string = "api/account/UpdatePassword";
  private readonly _addeditUrl: string = "api/account/UpdateUser";
  private _deleteUrl: string = "api/account/DeleteUser";
  private _forgotUrl: string = "api/account/ForgotPassword";
  private _setUrl: string = "api/account/SetPassword";
  private readonly _deleteAllUrl: string = "api/account/DeleteAll";
  private readonly _getUsersByStatusUrl: string = "api/account/GetUsersByStatus";

  constructor(private endPoint: EndPointService, private authService: AuthService) {

  }

  get(userId) {
    var url = this._getUserUrl + "?id=" + userId;
    return this.endPoint.get<User>(url);
  }

  getUsersByOrganizationId() {
    var url = this._getUsersByOrganizationIdUrl + "?id=" + this.authService.currentUser.organizationContactId;
    return this.endPoint.get<User[]>(url);
  }


  forgotPassword(obj) {
    return this.endPoint.addupdate<any>(obj, this._forgotUrl);
  }

  setPassword(obj) {
    return this.endPoint.addupdate<any>(obj, this._setUrl);
  }

  updateUser(obj) {
    if (obj.id == 0) {
      obj.createdById = this.authService.currentUser.id;
    }
    obj.updatedById = this.authService.currentUser.id;
    //return this.endPoint.addupdate<User>(obj, this._addeditUrl);
    return this.endPoint.addupdate<any>(obj, this._addeditUrl);
  }

  updateUserStatus(userId) {
    var url = this._updateUserStatusUrl + "?userId=" + userId;
    return this.endPoint.get<any>(url);
  }

  updatePassword(obj) {
    obj.updatedById = this.authService.currentUser.id;
    return this.endPoint.addupdate<User>(obj, this._updatePasswordUrl);
  }

  deleteObj(id: bigint) {
    var deleteUrl = this._deleteUrl + "?id=" + id;
    return this.endPoint.deleteObj<User>(deleteUrl);
  }

  deleteAll() {
    var url = this._deleteAllUrl + "?id=" + this.authService.currentUser.id;
    return this.endPoint.deleteObj<any>(url);
  }

  getUsersByUserStatus(userStatus) {
    var url = this._getUsersByStatusUrl + "?userStatus=" + userStatus;
    return this.endPoint.get<any[]>(url);
  }

  updateUserStatusByUserId(userId, userStatus: UserStatus) {
    var url = this._updateUserStatusByUserIdUrl + "?userId=" + userId + "&userStatus=" + userStatus;
    return this.endPoint.get<any>(url);
  }

}

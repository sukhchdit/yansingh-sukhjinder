import { Injectable } from '@angular/core';
import { EndPointService } from 'src/app/core/services/endpoint.service';

@Injectable()
export class ForgotPasswordService {

  //private readonly _getallUrl: string = "api/register";
  private readonly _addeditUrl: string = "api/account/forgotpassword";
  //private _deleteUrl: string = "api/register";

  constructor(private endPoint: EndPointService) {
  }

  //getAll() {
  //  return this.endPoint.get<Register[]>(this._getallUrl);
  //}

  addEditObj(obj) {
    return this.endPoint.addupdate<any>(obj, this._addeditUrl);
  }

  //deleteObj(id) {
  //  var deleteUrl = this._deleteUrl + '/' + id;
  //  return this.endPoint.deleteObj<Register>(deleteUrl);
  //}
}

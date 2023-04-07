import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { Referral } from '../../models/common/referral.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class ReferralService {
  private readonly _getURL: string = "api/Referral/Get";
  private readonly _getAllURL: string = "api/Referral/GetAll";
  private readonly _saveURL: string = "api/Referral/Save";
  private readonly _deleteURL: string = "api/Referral/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<Referral>(url);
  }

  getAll() {
    return this.endpoint.get<Referral[]>(this._getAllURL);
  }

  save(referral: Referral) {
    if (referral.id <= 0)
      referral.createdBy = this.authService.currentUser.id;
    referral.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<Referral>(referral, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

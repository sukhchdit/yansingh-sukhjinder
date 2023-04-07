import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { SocialCondition } from '../../models/common/socialcondition.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class SocialConditionService {
  private readonly _getURL: string = "api/SocialCondition/Get";
  private readonly _getAllURL: string = "api/SocialCondition/GetAll";
  private readonly _saveURL: string = "api/SocialCondition/Save";
  private readonly _deleteURL: string = "api/SocialCondition/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SocialCondition>(url);
  }

  getAll() {
    return this.endpoint.get<SocialCondition[]>(this._getAllURL);
  }

  save(socialCondition: SocialCondition) {
    if (socialCondition.id <= 0)
      socialCondition.createdBy = this.authService.currentUser.id;
    socialCondition.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SocialCondition>(socialCondition, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

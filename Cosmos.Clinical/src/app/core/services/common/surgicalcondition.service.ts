import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { SurgicalCondition } from '../../models/common/surgicalcondition.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class SurgicalConditionService {
  private readonly _getURL: string = "api/SurgicalCondition/Get";
  private readonly _getAllURL: string = "api/SurgicalCondition/GetAll";
  private readonly _saveURL: string = "api/SurgicalCondition/Save";
  private readonly _deleteURL: string = "api/SurgicalCondition/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SurgicalCondition>(url);
  }

  getAll() {
    return this.endpoint.get<SurgicalCondition[]>(this._getAllURL);
  }

  save(surgicalCondition: SurgicalCondition) {
    if (surgicalCondition.id <= 0)
      surgicalCondition.createdBy = this.authService.currentUser.id;
    surgicalCondition.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SurgicalCondition>(surgicalCondition, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

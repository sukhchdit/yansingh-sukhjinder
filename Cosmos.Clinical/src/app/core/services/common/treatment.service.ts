import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { Treatment } from '../../models/common/treatment.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class TreatmentService {
  private readonly _getURL: string = "api/Treatment/Get";
  private readonly _getAllURL: string = "api/Treatment/GetAll";
  private readonly _saveURL: string = "api/Treatment/Save";
  private readonly _deleteURL: string = "api/Treatment/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<Treatment>(url);
  }

  getAll() {
    return this.endpoint.get<Treatment[]>(this._getAllURL);
  }

  save(treatment: Treatment) {
    if (treatment.id <= 0)
      treatment.createdBy = this.authService.currentUser.id;
    treatment.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<Treatment>(treatment, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

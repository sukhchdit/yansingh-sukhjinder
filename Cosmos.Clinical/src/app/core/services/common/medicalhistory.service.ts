import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { MedicalHistory } from '../../models/common/medicalhistory.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class MedicalHistoryService {
  private readonly _getURL: string = "api/MedicalHistory/Get";
  private readonly _getAllURL: string = "api/MedicalHistory/GetAll";
  private readonly _saveURL: string = "api/MedicalHistory/Save";
  private readonly _deleteURL: string = "api/MedicalHistory/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<MedicalHistory>(url);
  }

  getAll() {
    return this.endpoint.get<MedicalHistory[]>(this._getAllURL);
  }

  save(medicalHistory: MedicalHistory) {
    if (medicalHistory.id <= 0)
      medicalHistory.createdBy = this.authService.currentUser.id;
    medicalHistory.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<MedicalHistory>(medicalHistory, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

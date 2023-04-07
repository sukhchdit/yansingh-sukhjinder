import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{studyNonProcedureChargeType} from '../../models/billing/studynonprocedurechargetype.model'

@Injectable()
export class StudyNonProcedureChargeTypeService {
  private readonly _getURL: string = "api/SiteStudyBilling/GetStudyNonProcedureChargeType";
  private readonly _getAllURL: string = "api/SiteStudyBilling/GetAllStudyNonProcedureChargeType";
  private readonly _saveURL: string = "api/SiteStudyBilling/SaveStudyNonProcedureChargeType";
  private readonly _deleteURL: string = "api/SiteStudyBilling/DeleteStudyNonProcedureChargeType";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<studyNonProcedureChargeType>(url);
  }

  getAll() {
    return this.endpoint.get<studyNonProcedureChargeType[]>(this._getAllURL);
  }

  save(patientReimbursement: studyNonProcedureChargeType) {
    if (patientReimbursement.id <= 0)
      patientReimbursement.createdBy = this.authService.currentUser.id;
    patientReimbursement.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<studyNonProcedureChargeType>(patientReimbursement, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

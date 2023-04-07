import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{patientReimbursement} from '../../models/billing/patientReimbursement.model'

@Injectable()
export class PatientReimbursementChargeService {
  private readonly _getURL: string = "api/SiteStudyBilling/GetReimbursementCharge";
  private readonly _getAllURL: string = "api/SiteStudyBilling/GetAllReimbursementCharge";
  private readonly _saveURL: string = "api/SiteStudyBilling/SaveReimbursementCharge";
  private readonly _deleteURL: string = "api/SiteStudyBilling/DeleteReimbursementCharge";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<patientReimbursement>(url);
  }

  getAll(sponsorSiteStudyInvitationId) {
    return this.endpoint.get<patientReimbursement[]>(this._getAllURL+"?sponsorSiteStudyInvitationId="+sponsorSiteStudyInvitationId);
  }

  save(patientReimbursement: patientReimbursement) {
    if (patientReimbursement.id <= 0)
      patientReimbursement.createdBy = this.authService.currentUser.id;
    patientReimbursement.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<patientReimbursement>(patientReimbursement, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { additionalCharge } from '../../models/billing/additionalcharges.model'
import { studyApplicableadditionalCharge } from 'src/app/models/billing/studyapplicableadditionalstudycharge.model';

@Injectable()
export class StudyApplicableAdditionalChargeService {
  private readonly _getURL: string = "api/SiteStudyBilling/GetStudyApplicableAdditionalCharge";
  private readonly _getAllURL: string = "api/SiteStudyBilling/GetAllStudyApplicableAdditionalCharge";
  private readonly _saveURL: string = "api/SiteStudyBilling/SaveStudyApplicableAdditionalCharge";
  private readonly _deleteURL: string = "api/SiteStudyBilling/DeleteStudyApplicableAdditionalCharge";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<studyApplicableadditionalCharge>(url);
  }

  getAll(sponsorSiteStudyInvitationId) {
    return this.endpoint.get<studyApplicableadditionalCharge[]>(this._getAllURL + "?sponsorSiteStudyInvitationId=" + sponsorSiteStudyInvitationId+ "&isPaid=false");
  }
  getAllPaid(sponsorSiteStudyInvitationId) {
    return this.endpoint.get<studyApplicableadditionalCharge[]>(this._getAllURL + "?sponsorSiteStudyInvitationId=" + sponsorSiteStudyInvitationId + "&isPaid=true");
  }
  save(additionalCharge: studyApplicableadditionalCharge) {
    if (additionalCharge.id <= 0)
      additionalCharge.createdBy = this.authService.currentUser.id;
    additionalCharge.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<studyApplicableadditionalCharge>(additionalCharge, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

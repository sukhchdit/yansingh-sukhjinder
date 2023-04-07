import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{additionalCharge} from '../../models/billing/additionalcharges.model'

@Injectable()
export class AdditionalChargeService {
  private readonly _getURL: string = "api/SiteStudyBilling/GetStudyAdditionalCharge";
  private readonly _getAllURL: string = "api/SiteStudyBilling/GetAllStudyAdditionalCharge";
  private readonly _saveURL: string = "api/SiteStudyBilling/SaveStudyAdditionalCharge";
  private readonly _deleteURL: string = "api/SiteStudyBilling/DeleteStudyAdditionalCharge";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<additionalCharge>(url);
  }

  getAll(sponsorSiteStudyInvitationId) {
    return this.endpoint.get<additionalCharge[]>(this._getAllURL+"?sponsorSiteStudyInvitationId="+sponsorSiteStudyInvitationId);
  }

  save(additionalCharge: additionalCharge) {
    if (additionalCharge.id <= 0)
    additionalCharge.createdBy = this.authService.currentUser.id;
    additionalCharge.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<additionalCharge>(additionalCharge, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

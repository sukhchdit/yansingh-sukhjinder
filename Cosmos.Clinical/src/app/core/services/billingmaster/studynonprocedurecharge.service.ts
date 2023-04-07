import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{NonProcedureCharge} from '../../models/billing/nonprocedurecharges.model'
import { SponsorStudyProcedure } from '../../models/sponsor/sponsorstudyprocedure.model';

@Injectable()
export class StudyNonProcedureChargeService {
  private readonly _getURL: string = "api/SiteStudyBilling/GetStudyNonProcedureCharge";
  private readonly _getAllURL: string = "api/SiteStudyBilling/GetAllStudyNonProcedureCharge";
  private readonly _saveURL: string = "api/SiteStudyBilling/SaveStudyNonProcedureCharge";
  private readonly _deleteURL: string = "api/SiteStudyBilling/DeleteStudyNonProcedureCharge";
  private readonly _getAllSponsorStudyNonProceduresURL: string = "api/SiteStudyBilling/GetAllSponsorStudyNonProcedure";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<NonProcedureCharge>(url);
  }

   
  getAllSponsorStudyNonProcedures(sponsorStudyInfoId) {
    return this.endpoint.get<SponsorStudyProcedure[]>(this._getAllSponsorStudyNonProceduresURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  getAll(sponsorSiteStudyInvitationId) {
    return this.endpoint.get<NonProcedureCharge[]>(this._getAllURL+"?sponsorSiteStudyInvitationId="+sponsorSiteStudyInvitationId);
  }

  save(nonProcedureCharge: NonProcedureCharge) {
    if (nonProcedureCharge.id <= 0)
    nonProcedureCharge.createdBy = this.authService.currentUser.id;
      nonProcedureCharge.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<NonProcedureCharge>(nonProcedureCharge, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{ProcedureCharge} from '../../models/billing/procedurecharge.model'

import { SponsorStudyProcedure } from '../../models/sponsor/sponsorstudyprocedure.model';
@Injectable()
export class StudyProcedureChargeService {
  private readonly _getURL: string = "api/SiteStudyBilling/GetStudyProcedureCharge";
  private readonly _getAllURL: string = "api/SiteStudyBilling/GetAllStudyProcedureCharge";
  private readonly _saveURL: string = "api/SiteStudyBilling/SaveStudyProcedureCharge";
  private readonly _deleteURL: string = "api/SiteStudyBilling/DeleteStudyProcedureCharge";
  private readonly _getSponsorStudyVisitTemplateProcedureInJsonURL: string = "api/SiteStudyBilling/GetSponsorStudyVisitTemplateProcedureInJson";
  private readonly _getAllSponsorStudyProceduresURL: string = "api/SiteStudyBilling/GetAllSponsorStudyProcedure";
  

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  getAllSponsorStudyProcedures(sponsorStudyInfoId) {
    return this.endpoint.get<any[]>(this._getAllSponsorStudyProceduresURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  getSponsorStudyVisitTemplateProcedureInJson(sponsorStudyInfoId,SponsorSiteStudyCDAInvitationId,isNonProcedure) {
    return this.endpoint.get<any>(this._getSponsorStudyVisitTemplateProcedureInJsonURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId+"&SponsorSiteStudyCDAInvitationId="+SponsorSiteStudyCDAInvitationId+"&isNonProcedure="+isNonProcedure);
  }
  
  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<ProcedureCharge>(url);
  }

  getAll(sponsorSiteStudyInvitationId) {
    return this.endpoint.get<ProcedureCharge[]>(this._getAllURL+"?sponsorSiteStudyInvitationId="+sponsorSiteStudyInvitationId);
  }

  save(ProcedureCharge: ProcedureCharge) {
    if (ProcedureCharge.id <= 0)
    ProcedureCharge.createdBy = this.authService.currentUser.id;
      ProcedureCharge.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<ProcedureCharge>(ProcedureCharge, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

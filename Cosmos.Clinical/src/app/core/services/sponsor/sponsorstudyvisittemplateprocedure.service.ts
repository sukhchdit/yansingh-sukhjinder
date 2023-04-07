import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { SponsorStudyVisitTemplateProcedure } from '../../models/sponsor/sponsorstudyvisittemplateprocedure.model';

@Injectable()
export class SponsorStudyVisitTemplateProcedureService {
  private readonly _apiURL: string = "api/SponsorStudyVisitTemplateProcedure/";
  private readonly _getURL: string = this._apiURL + "Get";
  private readonly _getAllURL: string = this._apiURL + "GetAll";
  private readonly _getSponsorStudyVisitTemplateProcedureInJsonURL: string = this._apiURL + "GetSponsorStudyVisitTemplateProcedureInJson";
  private readonly _getSponsorStudyVisitTemplateProcedureByBudgetVersionInJsonURL: string = this._apiURL + "GetSponsorStudyVisitTemplateProcedureByBudgetVersionInJson";
  private readonly _saveURL: string = this._apiURL + "Save";
  private readonly _deleteURL: string = this._apiURL + "Delete";
  private readonly _checkSponsorVisitTemplateProcedureExistsURL: string = this._apiURL + "CheckSponsorVisitTemplateProcedureExists";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyVisitTemplateProcedure>(url);
  }

  getAll(sponsorStudyVisitTemplateId) {
    return this.endpoint.get<SponsorStudyVisitTemplateProcedure[]>(this._getAllURL + "?sponsorStudyVisitTemplateId=" + sponsorStudyVisitTemplateId);
  }

  getSponsorStudyVisitTemplateProcedureInJson(sponsorStudyInfoId, isNonProcedure) {
    return this.endpoint.get<any>(this._getSponsorStudyVisitTemplateProcedureInJsonURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&isNonProcedure=" + isNonProcedure);
  }

  getSponsorStudyVisitTemplateProcedureByBudgetVersionInJson(sponsorStudyInfoId, isNonProcedure, studyBudgetVersionArmId, isConditional) {
    return this.endpoint.get<any>(this._getSponsorStudyVisitTemplateProcedureByBudgetVersionInJsonURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&isNonProcedure=" + isNonProcedure + "&studyBudgetVersionArmId=" + studyBudgetVersionArmId + "&isConditional=" + isConditional);
  }

  save(studyVisitTemplateProcedure: SponsorStudyVisitTemplateProcedure) {
    if (studyVisitTemplateProcedure.id <= 0 || studyVisitTemplateProcedure.id == null || studyVisitTemplateProcedure.id == undefined)
      studyVisitTemplateProcedure.createdBy = this.authService.currentUser.id;
    studyVisitTemplateProcedure.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorStudyVisitTemplateProcedure>(studyVisitTemplateProcedure, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  checkSponsorVisitTemplateProcedureExists(sponsorStudyVisitTemplateId, procedureId) {
    const url = this._checkSponsorVisitTemplateProcedureExistsURL + "?sponsorStudyVisitTemplateId=" + sponsorStudyVisitTemplateId + "&procedureId=" + procedureId;
    return this.endpoint.get<SponsorStudyVisitTemplateProcedure[]>(url);
  }
}

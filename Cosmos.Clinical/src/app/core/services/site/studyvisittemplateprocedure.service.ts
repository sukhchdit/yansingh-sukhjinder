import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudyVisitTemplateProcedure } from '../../models/site/studyVisitTemplateProcedure.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class StudyVisitTemplateProcedureService {
  private readonly _apiURL: string = "api/StudyVisitTemplateProcedure/";
  private readonly _getURL: string = this._apiURL + "Get";
  private readonly _getAllURL: string = this._apiURL + "GetAll";
  private readonly _getStudyVisitTemplateProcedureInJsonURL: string = this._apiURL + "GetStudyVisitTemplateProcedureInJson";
  private readonly _saveURL: string = this._apiURL + "Save";
  private readonly _deleteURL: string = this._apiURL + "Delete";
  private readonly _checkVisitTemplateProcedureExistsURL: string = this._apiURL + "CheckVisitTemplateProcedureExists";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudyVisitTemplateProcedure>(url);
  }

  getAll(studyVisitTemplateId) {
    return this.endpoint.get<StudyVisitTemplateProcedure[]>(this._getAllURL + "?studyVisitTemplateId=" + studyVisitTemplateId);
  }

  getStudyVisitTemplateProcedureInJson(sponsorSiteStudyCDAInvitationId, sponsorStudyArmId, isNonProcedure, isConditional) {
    return this.endpoint.get<any>(this._getStudyVisitTemplateProcedureInJsonURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId + "&sponsorStudyArmId=" + sponsorStudyArmId + "&isNonProcedure=" + isNonProcedure + "&isConditional=" + isConditional);
  }

  save(studyVisitTemplateProcedure: StudyVisitTemplateProcedure) {
    if (studyVisitTemplateProcedure.id <= 0 || studyVisitTemplateProcedure.id == null || studyVisitTemplateProcedure.id == undefined)
      studyVisitTemplateProcedure.createdBy = this.authService.currentUser.id;
    studyVisitTemplateProcedure.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudyVisitTemplateProcedure>(studyVisitTemplateProcedure, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  checkVisitTemplateProcedureExists(studyVisitTemplateId, procedureId) {
    const url = this._checkVisitTemplateProcedureExistsURL + "?studyVisitTemplateId=" + studyVisitTemplateId + "&procedureId=" + procedureId;
    return this.endpoint.get<StudyVisitTemplateProcedure[]>(url);
  }
}

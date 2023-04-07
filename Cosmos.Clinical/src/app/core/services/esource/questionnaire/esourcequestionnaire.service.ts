import { Injectable } from '@angular/core';
import { EndPointService } from '../../endpoint.service';
import { AuthService } from '../../account/auth.service';
import { eSourceSection } from '../../../models/esource/questionnaire/esourcesection.model';
import { eSourceQuestionnaireTemplate } from '../../../models/esource/questionnaire/esourcequestionnairetemplate.model';
import { eSourceOptionTemplate } from '../../../models/esource/questionnaire/esourceoptiontemplate.model';
import { MomentDatePipe } from '../../../pipes/momentdate.pipe';


@Injectable()
export class eSourceQuestionnaireService {
  private readonly _baseApiUrl: string = "api/eSource/";

  private readonly _geteSourceSectionURL: string = this._baseApiUrl + "GeteSourceSection";
  private readonly _getAlleSourceSectionURL: string = this._baseApiUrl + "GetAlleSourceSection";
  private readonly _saveeSourceSectionURL: string = this._baseApiUrl + "SaveeSourceSection";
  private readonly _deleteeSourceSectionURL: string = this._baseApiUrl + "DeleteeSourceSection";
  private readonly _checkIfSectionExistsURL: string = this._baseApiUrl + "CheckIfSectionExists";

  private readonly _geteSourceQuestionnaireTemplateURL: string = this._baseApiUrl + "GeteSourceQuestionnaireTemplate";
  private readonly _getAlleSourceQuestionnaireTemplateURL: string = this._baseApiUrl + "GetAlleSourceQuestionnaireTemplate";
  private readonly _saveeSourceQuestionnaireTemplateURL: string = this._baseApiUrl + "SaveeSourceQuestionnaireTemplate";
  private readonly _deleteeSourceQuestionnaireTemplateURL: string = this._baseApiUrl + "DeleteeSourceQuestionnaireTemplate";
  private readonly _prepareeSourceQuestionnaireTemplateURL: string = this._baseApiUrl + "PrepareeSourceQuestionnaireTemplate";

  private readonly _geteSourceOptionTemplateURL: string = this._baseApiUrl + "GeteSourceOptionTemplate";
  private readonly _getAlleSourceOptionTemplateURL: string = this._baseApiUrl + "GetAlleSourceOptionTemplate";
  private readonly _saveeSourceOptionTemplateURL: string = this._baseApiUrl + "SaveeSourceOptionTemplate";
  private readonly _deleteeSourceOptionTemplateURL: string = this._baseApiUrl + "DeleteeSourceOptionTemplate";

  private readonly _checkHeaderBmiControlExistsURL: string = this._baseApiUrl + "CheckHeaderBmiControlExists";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  geteSourceSection(id) {
    const url = this._geteSourceSectionURL + "?id=" + id;
    return this.endpoint.get<eSourceSection>(url);
  }

  getAlleSourceSection(sponsorStudyProcedureId) {
    const url = this._getAlleSourceSectionURL + "?sponsorStudyProcedureId=" + sponsorStudyProcedureId;
    return this.endpoint.get<eSourceSection[]>(url);
  }

  checkIfSectionExists(section: eSourceSection) {
    return this.endpoint.addupdate<any>(section, this._checkIfSectionExistsURL);
  }

  saveeSourceSection(section: eSourceSection) {
    if (section.id <= 0 || section.id == null || section.id == undefined)
      section.createdBy = this.authService.currentUser.id;
    section.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<eSourceSection>(section, this._saveeSourceSectionURL);
  }

  deleteeSourceSection(id: number) {
    const url = this._deleteeSourceSectionURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  geteSourceQuestionnaireTemplate(id) {
    const url = this._geteSourceQuestionnaireTemplateURL + "?id=" + id;
    return this.endpoint.get<eSourceQuestionnaireTemplate>(url);
  }

  getAlleSourceQuestionnaireTemplate(sectionid) {
    return this.endpoint.get<eSourceQuestionnaireTemplate[]>(this._getAlleSourceQuestionnaireTemplateURL + "?sectionid=" + sectionid);
  }

  saveeSourceQuestionnaireTemplate(questionnaireTemplate: eSourceQuestionnaireTemplate) {
    if (questionnaireTemplate.id <= 0 || questionnaireTemplate.id == undefined || questionnaireTemplate.id == null) {
      questionnaireTemplate.createdBy = this.authService.currentUser.id;
      questionnaireTemplate.createdOn = this.momentDatePipe.currentDate;
    }
    questionnaireTemplate.updatedBy = this.authService.currentUser.id;
    questionnaireTemplate.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<eSourceQuestionnaireTemplate>(questionnaireTemplate, this._saveeSourceQuestionnaireTemplateURL);
  }

  deleteeSourceQuestionnaireTemplate(id: number) {
    const url = this._deleteeSourceQuestionnaireTemplateURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  prepareeSourceQuestionnaireTemplate(sponsorStudyProcedureId, commonTemplateId) {
    const url = this._prepareeSourceQuestionnaireTemplateURL + "?sponsorStudyProcedureId=" + sponsorStudyProcedureId + "&commonTemplateId=" + commonTemplateId + "&userId=" + this.authService.currentUser.id;
    return this.endpoint.get<boolean>(url);
  }

  geteSourceOptionTemplate(id) {
    const url = this._geteSourceOptionTemplateURL + "?id=" + id;
    return this.endpoint.get<eSourceOptionTemplate>(url);
  }

  getAlleSourceOptionTemplate(questionnaireTemplateId) {
    return this.endpoint.get<eSourceOptionTemplate[]>(this._getAlleSourceOptionTemplateURL + "?questionnaireTemplateId=" + questionnaireTemplateId);
  }

  saveeSourceOptionTemplate(optionTemplate: eSourceOptionTemplate) {
    if (optionTemplate.id <= 0 || optionTemplate.id == null || optionTemplate.id == undefined)
      optionTemplate.createdBy = this.authService.currentUser.id;
    optionTemplate.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<eSourceOptionTemplate>(optionTemplate, this._saveeSourceOptionTemplateURL);
  }

  deleteeSourceOptionTemplate(id: number) {
    const url = this._deleteeSourceOptionTemplateURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  checkHeaderBmiControlExists(sponsorStudyProcedureId: number, questionId: number) {
    const url = this._checkHeaderBmiControlExistsURL + "?sponsorStudyProcedureId=" + sponsorStudyProcedureId + "&questionId=" + questionId;
    return this.endpoint.get < eSourceQuestionnaireTemplate[]>(url);
  }

}

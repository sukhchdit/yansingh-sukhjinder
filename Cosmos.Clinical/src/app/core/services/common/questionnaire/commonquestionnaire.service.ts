import { Injectable } from '@angular/core';
import { EndPointService } from '../../endpoint.service';
import { AuthService } from '../../account/auth.service';
import { CommonSection } from '../../../models/common/questionnaire/commonsection.model';
import { CommonQuestionnaireTemplate } from '../../../models/common/questionnaire/commonquestionnairetemplate.model';
import { CommonOptionTemplate } from '../../../models/common/questionnaire/commonoptiontemplate.model';
import { CommonTemplate } from '../../../models/common/questionnaire/commontemplate.model';
import { CommonSectionViewModel } from '../../../viewmodels/common/questionnaire/commonsection.viewmodel';


@Injectable()
export class CommonQuestionnaireService {
  private readonly _baseApiUrl: string = "api/CommonQuestionnaire/";

  private readonly _getCommonTemplateURL: string = this._baseApiUrl + "GetCommonTemplate";
  private readonly _getAllCommonTemplateURL: string = this._baseApiUrl + "GetAllCommonTemplate";
  private readonly _getAllCommonTemplateForStudyProcedureURL: string = this._baseApiUrl + "GetAllCommonTemplateForStudyProcedure";
  private readonly _saveCommonTemplateURL: string = this._baseApiUrl + "SaveCommonTemplate";
  private readonly _deleteCommonTemplateURL: string = this._baseApiUrl + "DeleteCommonTemplate";

  private readonly _getCommonSectionURL: string = this._baseApiUrl + "GetCommonSection";
  private readonly _getAllCommonSectionURL: string = this._baseApiUrl + "GetAllCommonSection";
  private readonly _saveCommonSectionURL: string = this._baseApiUrl + "SaveCommonSection";
  private readonly _deleteCommonSectionURL: string = this._baseApiUrl + "DeleteCommonSection";

  private readonly _getCommonQuestionnaireTemplateURL: string = this._baseApiUrl + "GetCommonQuestionnaireTemplate";
  private readonly _getAllCommonQuestionnaireTemplateURL: string = this._baseApiUrl + "GetAllCommonQuestionnaireTemplate";
  private readonly _saveCommonQuestionnaireTemplateURL: string = this._baseApiUrl + "SaveCommonQuestionnaireTemplate";
  private readonly _deleteCommonQuestionnaireTemplateURL: string = this._baseApiUrl + "DeleteCommonQuestionnaireTemplate";
  private readonly _getCommonQuestionnaireByCommonTemplateIdURL: string = this._baseApiUrl + "GetCommonQuestionnaireByCommonTemplateId";

  private readonly _getCommonOptionTemplateURL: string = this._baseApiUrl + "GetCommonOptionTemplate";
  private readonly _getAllCommonOptionTemplateURL: string = this._baseApiUrl + "GetAllCommonOptionTemplate";
  private readonly _saveCommonOptionTemplateURL: string = this._baseApiUrl + "SaveCommonOptionTemplate";
  private readonly _deleteCommonOptionTemplateURL: string = this._baseApiUrl + "DeleteCommonOptionTemplate";

  private readonly _checkHeaderBmiControlExistsURL: string = this._baseApiUrl + "CheckHeaderBmiControlExists";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  getCommonTemplate(id) {
    const url = this._getCommonTemplateURL + "?id=" + id;
    return this.endpoint.get<CommonTemplate>(url);
  }

  getAllCommonTemplate(siteId) {
    const url = this._getAllCommonTemplateURL + "?siteId=" + siteId;
    return this.endpoint.get<CommonTemplate[]>(url);
  }

  getAllCommonTemplateForStudyProcedure(siteId) {
    const url = this._getAllCommonTemplateForStudyProcedureURL + "?siteId=" + siteId;
    return this.endpoint.get<CommonTemplate[]>(url);
  }

  saveCommonTemplate(section: CommonTemplate) {
    if (section.id <= 0 || section.id == null || section.id == undefined)
      section.createdBy = this.authService.currentUser.id;
    section.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<CommonTemplate>(section, this._saveCommonTemplateURL);
  }

  deleteCommonTemplate(id: number) {
    const url = this._deleteCommonTemplateURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getCommonSection(id) {
    const url = this._getCommonSectionURL + "?id=" + id;
    return this.endpoint.get<CommonSection>(url);
  }

  getAllCommonSection(commonTemplateId) {
    const url = this._getAllCommonSectionURL + "?commonTemplateId=" + commonTemplateId;
    return this.endpoint.get<CommonSection[]>(url);
  }

  saveCommonSection(section: CommonSection) {
    if (section.id <= 0 || section.id == null || section.id == undefined)
      section.createdBy = this.authService.currentUser.id;
    section.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<CommonSection>(section, this._saveCommonSectionURL);
  }

  deleteCommonSection(id: number) {
    const url = this._deleteCommonSectionURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getCommonQuestionnaireTemplate(id) {
    const url = this._getCommonQuestionnaireTemplateURL + "?id=" + id;
    return this.endpoint.get<CommonQuestionnaireTemplate>(url);
  }

  getAllCommonQuestionnaireTemplate(sectionId) {
    return this.endpoint.get<CommonQuestionnaireTemplate[]>(this._getAllCommonQuestionnaireTemplateURL + "?sectionId=" + sectionId);
  }

  saveCommonQuestionnaireTemplate(questionnaireTemplate: CommonQuestionnaireTemplate) {
    if (questionnaireTemplate.id <= 0 || questionnaireTemplate.id == undefined || questionnaireTemplate.id==null)
      questionnaireTemplate.createdBy = this.authService.currentUser.id;
    questionnaireTemplate.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<CommonQuestionnaireTemplate>(questionnaireTemplate, this._saveCommonQuestionnaireTemplateURL);
  }

  deleteCommonQuestionnaireTemplate(id: number) {
    const url = this._deleteCommonQuestionnaireTemplateURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getCommonOptionTemplate(id) {
    const url = this._getCommonOptionTemplateURL + "?id=" + id;
    return this.endpoint.get<CommonOptionTemplate>(url);
  }

  getAllCommonOptionTemplate(commonQuestionnaireTemplateId) {
    return this.endpoint.get<CommonOptionTemplate[]>(this._getAllCommonOptionTemplateURL + "?commonQuestionnaireTemplateId=" + commonQuestionnaireTemplateId);
  }

  saveCommonOptionTemplate(optionTemplate: CommonOptionTemplate) {
    if (optionTemplate.id <= 0 || optionTemplate.id == null || optionTemplate.id == undefined)
      optionTemplate.createdBy = this.authService.currentUser.id;
    optionTemplate.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<CommonOptionTemplate>(optionTemplate, this._saveCommonOptionTemplateURL);
  }

  deleteCommonOptionTemplate(commonQuestionnaireTemplateId: number) {
    const url = this._deleteCommonOptionTemplateURL + "?commonQuestionnaireTemplateId=" + commonQuestionnaireTemplateId;
    return this.endpoint.get<boolean>(url);
  }

  getCommonQuestionnaireByCommonTemplateId(commonTemplateId) {
    return this.endpoint.get<CommonSectionViewModel[]>(this._getCommonQuestionnaireByCommonTemplateIdURL + "?commonTemplateId=" + commonTemplateId);
  }

  checkHeaderBmiControlExists(commonTemplateId, questionId) {
    return this.endpoint.get<CommonQuestionnaireTemplate[]>(this._checkHeaderBmiControlExistsURL + "?commonTemplateId=" + commonTemplateId + "&questionId=" + questionId);
  }

}

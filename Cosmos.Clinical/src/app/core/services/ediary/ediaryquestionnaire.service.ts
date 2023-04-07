import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { eDiarySection } from '../../models/ediary/ediarysection.model';
import { eDiaryQuestionnaireTemplate } from '../../models/ediary/ediaryquestionnairetemplate.model';
import { eDiaryOptionTemplate } from '../../models/ediary/ediaryoptiontemplate.model';


@Injectable()
export class eDiaryQuestionnaireService {
  private readonly _baseApiUrl: string = "api/eDiary/";

  private readonly _geteDiarySectionURL: string = this._baseApiUrl + "GeteDiarySection";
  private readonly _getAlleDiarySectionURL: string = this._baseApiUrl + "GetAlleDiarySection";
  private readonly _saveeDiarySectionURL: string = this._baseApiUrl + "SaveeDiarySection";
  private readonly _deleteeDiarySectionURL: string = this._baseApiUrl + "DeleteeDiarySection";

  private readonly _geteDiaryQuestionnaireTemplateURL: string = this._baseApiUrl + "GeteDiaryQuestionnaireTemplate";
  private readonly _getAlleDiaryQuestionnaireTemplateURL: string = this._baseApiUrl + "GetAlleDiaryQuestionnaireTemplate";
  private readonly _saveeDiaryQuestionnaireTemplateURL: string = this._baseApiUrl + "SaveeDiaryQuestionnaireTemplate";
  private readonly _deleteeDiaryQuestionnaireTemplateURL: string = this._baseApiUrl + "DeleteeDiaryQuestionnaireTemplate";

  private readonly _geteDiaryOptionTemplateURL: string = this._baseApiUrl + "GeteDiaryOptionTemplate";
  private readonly _getAlleDiaryOptionTemplateURL: string = this._baseApiUrl + "GetAlleDiaryOptionTemplate";
  private readonly _saveeDiaryOptionTemplateURL: string = this._baseApiUrl + "SaveeDiaryOptionTemplate";
  private readonly _deleteeDiaryOptionTemplateURL: string = this._baseApiUrl + "DeleteeDiaryOptionTemplate";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  geteDiarySection(id) {
    const url = this._geteDiarySectionURL + "?id=" + id;
    return this.endpoint.get<eDiarySection>(url);
  }

  getAlleDiarySection(organizationInfoId) {
    const url = this._getAlleDiarySectionURL + "?organizationInfoId=" + organizationInfoId;
    return this.endpoint.get<eDiarySection[]>(url);
  }

  saveeDiarySection(section: eDiarySection) {
    if (section.id <= 0 || section.id == null || section.id == undefined)
      section.createdBy = this.authService.currentUser.id;
    section.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<eDiarySection>(section, this._saveeDiarySectionURL);
  }

  deleteeDiarySection(id: number) {
    const url = this._deleteeDiarySectionURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  geteDiaryQuestionnaireTemplate(id) {
    const url = this._geteDiaryQuestionnaireTemplateURL + "?id=" + id;
    return this.endpoint.get<eDiaryQuestionnaireTemplate>(url);
  }

  getAlleDiaryQuestionnaireTemplate(sectionid) {
    return this.endpoint.get<eDiaryQuestionnaireTemplate[]>(this._getAlleDiaryQuestionnaireTemplateURL + "?sectionid=" + sectionid);
  }

  saveeDiaryQuestionnaireTemplate(questionnaireTemplate: eDiaryQuestionnaireTemplate) {
    if (questionnaireTemplate.id <= 0 || questionnaireTemplate.id == undefined || questionnaireTemplate.id==null)
      questionnaireTemplate.createdBy = this.authService.currentUser.id;
    questionnaireTemplate.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<eDiaryQuestionnaireTemplate>(questionnaireTemplate, this._saveeDiaryQuestionnaireTemplateURL);
  }

  deleteeDiaryQuestionnaireTemplate(id: number) {
    const url = this._deleteeDiaryQuestionnaireTemplateURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  geteDiaryOptionTemplate(id) {
    const url = this._geteDiaryOptionTemplateURL + "?id=" + id;
    return this.endpoint.get<eDiaryOptionTemplate>(url);
  }

  getAlleDiaryOptionTemplate(questionnaireTemplateId) {
    return this.endpoint.get<eDiaryOptionTemplate[]>(this._getAlleDiaryOptionTemplateURL + "?questionnaireTemplateId=" + questionnaireTemplateId);
  }

  saveeDiaryOptionTemplate(optionTemplate: eDiaryOptionTemplate) {
    if (optionTemplate.id <= 0 || optionTemplate.id == null || optionTemplate.id == undefined)
      optionTemplate.createdBy = this.authService.currentUser.id;
    optionTemplate.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<eDiaryOptionTemplate>(optionTemplate, this._saveeDiaryOptionTemplateURL);
  }

  deleteeDiaryOptionTemplate(id: number) {
    const url = this._deleteeDiaryOptionTemplateURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

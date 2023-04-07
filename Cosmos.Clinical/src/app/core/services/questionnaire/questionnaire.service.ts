import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { Section } from '../../models/questionnaire/section.model';
import { QuestionnaireTemplate } from '../../models/questionnaire/questionnairetemplate.model';
import { OptionTemplate } from '../../models/questionnaire/optiontemplate.model';
import { StudyQuestionnaire } from '../../models/questionnaire/studyquestionnaire.model';
import { StudyOption } from '../../models/questionnaire/studyoption.model';
import { StudyQuestionnaireViewModel } from '../../viewmodels/questionnaire/studyquestionnaire.viewmodel';
import { AuthService } from '../account/auth.service';
import { SectionViewModel } from '../../models/viewmodels/questionnaire/section.viewmodel';


@Injectable()
export class QuestionnaireService {
  private readonly _baseApiUrl: string = "api/Questionnaire/";

  private readonly _getSectionURL: string = this._baseApiUrl + "GetSection";
  private readonly _getAllSectionURL: string = this._baseApiUrl + "GetAllSection";
  private readonly _saveSectionURL: string = this._baseApiUrl + "SaveSection";
  private readonly _deleteSectionURL: string = this._baseApiUrl + "DeleteSection";

  private readonly _getQuestionnaireTemplateURL: string = this._baseApiUrl + "GetQuestionnaireTemplate";
  private readonly _getAllQuestionnaireTemplateURL: string = this._baseApiUrl + "GetAllQuestionnaireTemplate";
  private readonly _saveQuestionnaireTemplateURL: string = this._baseApiUrl + "SaveQuestionnaireTemplate";
  private readonly _deleteQuestionnaireTemplateURL: string = this._baseApiUrl + "DeleteQuestionnaireTemplate";

  private readonly _getOptionTemplateURL: string = this._baseApiUrl + "GetOptionTemplate";
  private readonly _getAllOptionTemplateURL: string = this._baseApiUrl + "GetAllOptionTemplate";
  private readonly _saveOptionTemplateURL: string = this._baseApiUrl + "SaveOptionTemplate";
  private readonly _deleteOptionTemplateURL: string = this._baseApiUrl + "DeleteOptionTemplate";

  private readonly _getStudyQuestionnaireURL: string = this._baseApiUrl + "GetStudyQuestionnaire";
  private readonly _getAllStudyQuestionnaireURL: string = this._baseApiUrl + "GetAllStudyQuestionnaire";
  private readonly _saveStudyQuestionnaireURL: string = this._baseApiUrl + "SaveStudyQuestionnaire";
  private readonly _deleteStudyQuestionnaireURL: string = this._baseApiUrl + "DeleteStudyQuestionnaire";

  private readonly _getStudyOptionURL: string = this._baseApiUrl + "GetStudyOption";
  private readonly _getAllStudyOptionURL: string = this._baseApiUrl + "GetAllStudyOption";
  private readonly _saveStudyOptionURL: string = this._baseApiUrl + "SaveStudyOption";
  private readonly _deleteStudyOptionURL: string = this._baseApiUrl + "DeleteStudyOption";

  private readonly _getSavedSectionURL: string = this._baseApiUrl + "GetSavedSection";
  private readonly _getStudyQuestionnaireBySponsorStudyInfoIdURL: string = this._baseApiUrl + "GetStudyQuestionnaireBySponsorStudyInfoId";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  getSection(id) {
    const url = this._getSectionURL + "?id=" + id;
    return this.endpoint.get<Section>(url);
  }

  getAllSection(organizationInfoId) {
    const url = this._getAllSectionURL + "?organizationInfoId=" + organizationInfoId;
    return this.endpoint.get<Section[]>(url);
  }

  saveSection(section: Section) {
    if (section.id <= 0 || section.id == null || section.id == undefined)
      section.createdBy = this.authService.currentUser.id;
    section.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<Section>(section, this._saveSectionURL);
  }

  deleteSection(id: number) {
    const url = this._deleteSectionURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getQuestionnaireTemplate(id) {
    const url = this._getQuestionnaireTemplateURL + "?id=" + id;
    return this.endpoint.get<QuestionnaireTemplate>(url);
  }

  getAllQuestionnaireTemplate(sectionid) {
    return this.endpoint.get<QuestionnaireTemplate[]>(this._getAllQuestionnaireTemplateURL + "?sectionid=" + sectionid);
  }

  saveQuestionnaireTemplate(questionnaireTemplate: QuestionnaireTemplate) {
    if (questionnaireTemplate.id <= 0 || questionnaireTemplate.id == undefined || questionnaireTemplate.id==null)
      questionnaireTemplate.createdBy = this.authService.currentUser.id;
    questionnaireTemplate.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<QuestionnaireTemplate>(questionnaireTemplate, this._saveQuestionnaireTemplateURL);
  }

  deleteQuestionnaireTemplate(id: number) {
    const url = this._deleteQuestionnaireTemplateURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getOptionTemplate(id) {
    const url = this._getOptionTemplateURL + "?id=" + id;
    return this.endpoint.get<OptionTemplate>(url);
  }

  getAllOptionTemplate(questionnaireTemplateId) {
    return this.endpoint.get<OptionTemplate[]>(this._getAllOptionTemplateURL + "?questionnaireTemplateId=" + questionnaireTemplateId);
  }

  saveOptionTemplate(optionTemplate: OptionTemplate) {
    if (optionTemplate.id <= 0 || optionTemplate.id == null || optionTemplate.id == undefined)
      optionTemplate.createdBy = this.authService.currentUser.id;
    optionTemplate.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<OptionTemplate>(optionTemplate, this._saveOptionTemplateURL);
  }

  deleteOptionTemplate(id: number) {
    const url = this._deleteOptionTemplateURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getStudyQuestionnaire(id) {
    const url = this._getStudyQuestionnaireURL + "?id=" + id;
    return this.endpoint.get<StudyQuestionnaire>(url);
  }

  getAllStudyQuestionnaire(sponsorStudyInfoId) {
    return this.endpoint.get<StudyQuestionnaire[]>(this._getAllStudyQuestionnaireURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  saveStudyQuestionnaire(studyQuestionnaire: StudyQuestionnaireViewModel) {
    return this.endpoint.addupdate<boolean>(studyQuestionnaire, this._saveStudyQuestionnaireURL);
  }

  deleteStudyQuestionnaire(id: number) {
    const url = this._deleteStudyQuestionnaireURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getStudyOption(id) {
    const url = this._getStudyOptionURL + "?id=" + id;
    return this.endpoint.get<StudyOption>(url);
  }

  getAllStudyOption(studyQuestionnaireId) {
    return this.endpoint.get<StudyOption[]>(this._getAllStudyOptionURL + "?studyQuestionnaireId=" + studyQuestionnaireId);
  }

  saveStudyOption(section: StudyOption) {
    if (section.id <= 0 || section.id == null || section.id == undefined)
      section.createdBy = this.authService.currentUser.id;
    section.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudyOption>(section, this._saveStudyOptionURL);
  }

  deleteStudyOption(id: number) {
    const url = this._deleteStudyOptionURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSavedSection(organizationInfoId, sponsorStudyInfoId) {
    return this.endpoint.get<Section[]>(this._getSavedSectionURL + "?organizationInfoId=" + organizationInfoId + "&sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  getStudyQuestionnaireBySponsorStudyInfoId(sponsorStudyInfoId, sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<SectionViewModel[]>(this._getStudyQuestionnaireBySponsorStudyInfoIdURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

}

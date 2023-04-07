import { Injectable } from '@angular/core';
import { EndPointService } from '../../endpoint.service';
import { AuthService } from '../../account/auth.service';
import { eSourceSubjectQuestionnaire } from '../../../models/esource/questionnaire/esourcesubjectquestionnaire.model';
import { eSourceSubjectOption } from '../../../models/esource/questionnaire/esourcesubjectoption.model';
import { eSourceSectionViewModel } from '../../../models/viewmodels/esource/questionnaire/esourcesection.viewmodel';
import { MomentDatePipe } from '../../../pipes/momentdate.pipe';
import { eSourceSubjectQuestionnaireAudit } from '../../../models/esource/questionnaire/esourcesubjectquestionnaireaudit.model';
import { eSourceSubjectQuestionnaireWithAuditViewModel } from '../../../viewmodels/esource/esourcesubjectquestionnairewithaudit.viewmodel';
import { VisitSummaryViewModel } from '../../../models/viewmodels/esource/questionnaire/visitsummary.viewmodel';

@Injectable()
export class eSourceSubjectQuestionnaireService {
  private readonly _baseApiUrl: string = "api/eSourceSubjectQuestionnaire/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getWithOptionsURL: string = this._baseApiUrl + "GetWithOptions";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _getAllHistoryURL: string = this._baseApiUrl + "GetAllHistory";
  private readonly _getAllOptionsURL: string = this._baseApiUrl + "GetAllOptions";
  private readonly _getUnsavedQuestionnaireBySponsorStudyInfoIdURL: string = this._baseApiUrl + "GetUnsavedQuestionnaireBySponsorStudyInfoId";
  private readonly _getUnsavedQuestionnaireBystudyVisitTemplateProcedureIdURL: string = this._baseApiUrl + "GetUnsavedQuestionnaireBystudyVisitTemplateProcedureId";
  private readonly _getSavedQuestionnaireBySponsorStudyInfoIdURL: string = this._baseApiUrl + "GetSavedQuestionnaireBySponsorStudyInfoId";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _createURL: string = this._baseApiUrl + "Create";
  private readonly _createWithAuditURL: string = this._baseApiUrl + "CreateWithAudit";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";
  private readonly _getVisitSummaryURL: string = this._baseApiUrl + "GetVisitSummary";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<eSourceSubjectQuestionnaire>(url);
  }

  getWithOptions(id) {
    const url = this._getWithOptionsURL + "?id=" + id;
    return this.endpoint.get<eSourceSubjectQuestionnaire>(url);
  }

  getAll(studyVisitTrackingProcedureId) {
    const url = this._getAllURL + "?studyVisitTrackingProcedureId=" + studyVisitTrackingProcedureId;
    return this.endpoint.get<eSourceSubjectQuestionnaire[]>(url);
  }

  getAllHistory(studySubjectQuestionnaireId) {
    const url = this._getAllHistoryURL + "?studySubjectQuestionnaireId=" + studySubjectQuestionnaireId;
    return this.endpoint.get<any[]>(url);
  }

  getAllOptions(eSourceSubjectQuestionnaireId) {
    const url = this._getAllOptionsURL + "?eSourceSubjectQuestionnaireId=" + eSourceSubjectQuestionnaireId;
    return this.endpoint.get<eSourceSubjectOption[]>(url);
  }

  getUnsavedQuestionnaireBySponsorStudyInfoId(studyVisitTrackingProcedureId, procedureId) {
    const url = this._getUnsavedQuestionnaireBySponsorStudyInfoIdURL + "?studyVisitTrackingProcedureId=" + studyVisitTrackingProcedureId + "&procedureId=" + procedureId;
    return this.endpoint.get<eSourceSectionViewModel[]>(url);
  }

  GetUnsavedQuestionnaireBystudyVisitTemplateProcedureId(studyVisitTemplateProcedureId) {
    const url = this._getUnsavedQuestionnaireBystudyVisitTemplateProcedureIdURL + "?studyVisitTemplateProcedureId=" + studyVisitTemplateProcedureId;
    return this.endpoint.get<eSourceSectionViewModel[]>(url);
  }

  getSavedQuestionnaireBySponsorStudyInfoId(studyVisitTrackingProcedureId) {
    const url = this._getSavedQuestionnaireBySponsorStudyInfoIdURL + "?studyVisitTrackingProcedureId=" + studyVisitTrackingProcedureId;
    return this.endpoint.get<eSourceSectionViewModel[]>(url);
  }

  save(sections: eSourceSectionViewModel[]) {
    sections.forEach(section => {
      section.esourceSubjectQuestionnaires.forEach(questionnaire => {
        questionnaire.createdBy = this.authService.currentUser.id;
        questionnaire.createdOn = this.momentDatePipe.currentDate;
        questionnaire.updatedBy = this.authService.currentUser.id;

        questionnaire.studyOptions.forEach(option => {
          option.createdBy = this.authService.currentUser.id;
          option.createdOn = this.momentDatePipe.currentDate;
          option.updatedBy = this.authService.currentUser.id;
        });
      });
    });
    return this.endpoint.addupdate<eSourceSectionViewModel[]>(sections, this._saveURL);
  }

  create(questionnaire: eSourceSubjectQuestionnaire) {
    if (questionnaire.id <= 0 || questionnaire.id == null || questionnaire.id == undefined) {
      questionnaire.createdBy = this.authService.currentUser.id;
      questionnaire.createdOn = this.momentDatePipe.currentDate;
    }
    questionnaire.updatedBy = this.authService.currentUser.id;
    questionnaire.updatedOn = this.momentDatePipe.currentDate;

    questionnaire.studyOptions.forEach(option => {
      if (option.id <= 0 || option.id == null || option.id == undefined) {
        option.createdBy = this.authService.currentUser.id;
        option.createdOn = this.momentDatePipe.currentDate;
      }
      option.updatedBy = this.authService.currentUser.id;
      option.updatedOn = this.momentDatePipe.currentDate;
    });

    return this.endpoint.addupdate<eSourceSubjectQuestionnaire>(questionnaire, this._createURL);
  }

  createWithAudit(questionnaire: eSourceSubjectQuestionnaire, audit: eSourceSubjectQuestionnaireAudit) {
    if (questionnaire.id <= 0 || questionnaire.id == null || questionnaire.id == undefined) {
      questionnaire.createdBy = this.authService.currentUser.id;
      questionnaire.createdOn = this.momentDatePipe.currentDate;
    }
    questionnaire.updatedBy = this.authService.currentUser.id;
    questionnaire.updatedOn = this.momentDatePipe.currentDate;

    questionnaire.studyOptions.forEach(option => {
      if (option.id <= 0 || option.id == null || option.id == undefined) {
        option.createdBy = this.authService.currentUser.id;
        option.createdOn = this.momentDatePipe.currentDate;
      }
      option.updatedBy = this.authService.currentUser.id;
      option.updatedOn = this.momentDatePipe.currentDate;
    });

    if (audit.id <= 0 || audit.id == null || audit.id == undefined) {
      audit.createdBy = this.authService.currentUser.id;
      audit.createdOn = this.momentDatePipe.currentDate;
    }
    audit.updatedBy = this.authService.currentUser.id;
    audit.updatedOn = this.momentDatePipe.currentDate;

    var model = new eSourceSubjectQuestionnaireWithAuditViewModel();
    model.questionnaire = questionnaire;
    model.audit = audit;

    return this.endpoint.addupdate<eSourceSubjectQuestionnaire>(model, this._createWithAuditURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getVisitSummary(studyVisitTrackingId: number) {
    const url = this._getVisitSummaryURL + "?studyVisitTrackingId=" + studyVisitTrackingId;
    return this.endpoint.get<VisitSummaryViewModel>(url);
  }

}

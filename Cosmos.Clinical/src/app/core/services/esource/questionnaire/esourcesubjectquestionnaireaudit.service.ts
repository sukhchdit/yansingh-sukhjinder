import { Injectable } from '@angular/core';
import { EndPointService } from '../../endpoint.service';
import { AuthService } from '../../account/auth.service';
import { eSourceSubjectQuestionnaireAudit } from '../../../models/esource/questionnaire/esourcesubjectquestionnaireaudit.model';


@Injectable()
export class eSourceSubjectQuestionnaireAuditService {
  private readonly _baseApiUrl: string = "api/eSourceSubjectQuestionnaireAudit/";

  private readonly _getURL: string = this._baseApiUrl + "Gete";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<eSourceSubjectQuestionnaireAudit>(url);
  }

  getAll(esourceSubjectQuestionnaireId) {
    const url = this._getAllURL + "?esourceSubjectQuestionnaireId=" + esourceSubjectQuestionnaireId;
    return this.endpoint.get<eSourceSubjectQuestionnaireAudit[]>(url);
  }

  save(section: eSourceSubjectQuestionnaireAudit) {
    if (section.id <= 0 || section.id == null || section.id == undefined)
      section.createdBy = this.authService.currentUser.id;
    section.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<eSourceSubjectQuestionnaireAudit>(section, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}

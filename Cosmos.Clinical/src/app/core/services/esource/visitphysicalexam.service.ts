import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { VisitPhysicalExam } from '../../models/esource/visitphysicalexam.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { VisitPhysicalExamAudit } from '../../models/esource/visitphysicalexamaudit.model';

@Injectable()
export class VisitPhysicalExamService {
  port = environment.apiport;
  private readonly _baseURL: string = "api/VisitPhysicalExam/";
  private readonly _getURL: string = this._baseURL + "Get";
  private readonly _getAllByStudyVisitTrackingIdURL: string = this._baseURL + "GetAllByStudyVisitTrackingId";
  private readonly _saveURL: string = this._baseURL + "Save";
  private readonly _deleteURL: string = this._baseURL + "Delete";
  private readonly _getVitalHistoryURL: string = this._baseURL + "GetVitalHistory";

  private readonly _getAuditURL: string = this._baseURL + "GetAudit";
  private readonly _getAllAuditByVisitPhysicalExamIdURL: string = this._baseURL + "GetAllAuditByVisitPhysicalExamId";
  private readonly _saveAuditURL: string = this._baseURL + "SaveAudit";
  private readonly _deleteAuditURL: string = this._baseURL + "DeleteAudit";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<VisitPhysicalExam>(url);
  }

  getAllByStudyVisitTrackingId(studyVisitTrackingId) {
    const url = this._getAllByStudyVisitTrackingIdURL + "?studyVisitTrackingId=" + studyVisitTrackingId;
    return this.endpoint.get<VisitPhysicalExam[]>(url);
  }

  save(models: VisitPhysicalExam[]) {
    models.forEach(model => {
    if (model.id <= 0 || model.id == null || model.id == undefined) {
      model.createdBy = this.authService.currentUser.id;
      model.createdOn = this.momentDatePipe.currentDate;
    }
      model.updatedBy = this.authService.currentUser.id;
      model.updatedOn = this.momentDatePipe.currentDate;
    });
    return this.endpoint.addupdate<VisitPhysicalExam[]>(models, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getVitalHistory(vitalId) {
    const url = this._getVitalHistoryURL + "?vitalId=" + vitalId;
    return this.endpoint.get<any[]>(url);
  }

  getAudit(id) {
    const url = this._getAuditURL + "?id=" + id;
    return this.endpoint.get<VisitPhysicalExamAudit>(url);
  }

  getAllAuditByVisitPhysicalExamId(visitPhysicalExamId) {
    const url = this._getAllAuditByVisitPhysicalExamIdURL + "?visitPhysicalExamId=" + visitPhysicalExamId;
    return this.endpoint.get<VisitPhysicalExamAudit[]>(url);
  }

  saveAudit(models: VisitPhysicalExamAudit[]) {
    models.forEach(model => {
      if (model.id <= 0 || model.id == null || model.id == undefined) {
        model.createdBy = this.authService.currentUser.id;
        model.createdOn = this.momentDatePipe.currentDate;
      }
      model.updatedBy = this.authService.currentUser.id;
      model.updatedOn = this.momentDatePipe.currentDate;
    });
    return this.endpoint.addupdate<VisitPhysicalExamAudit[]>(models, this._saveAuditURL);
  }

  deleteAudit(id) {
    const url = this._deleteAuditURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudyVisitTrackingProcedure } from '../../models/site/studyvisittrackingprocedure.model';
import { AuthService } from '../account/auth.service';
import { StudyVisitTrackingProcedureBasicInfoViewModel } from '../../viewmodels/site/studyvisittrackingprocedurebasicinfo.viewmodel';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';

@Injectable()
export class StudyVisitTrackingProcedureService {
  private readonly _baseApiUrl: string = "api/StudyVisitTrackingProcedure/";
  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _saveStudyVisitTrackingProcedureURL: string = this._baseApiUrl + "SaveStudyVisitTrackingProcedure";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";
  private readonly _updateSubjectSignatureURL: string = this._baseApiUrl + "UpdateSubjectSignature";
  private readonly _getStudyVisitTrackingProcedureBasicInfoURL: string = this._baseApiUrl + "GetStudyVisitTrackingProcedureBasicInfo";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudyVisitTrackingProcedure>(url);
  }

  getAll(studyVisitTrackingId) {
    return this.endpoint.get<StudyVisitTrackingProcedure[]>(this._getAllURL + "?studyVisitTrackingId=" + studyVisitTrackingId);
  }

  save(studyVisitTrackingProcedures: StudyVisitTrackingProcedure[], studyVisitTrackingId: number) {
    studyVisitTrackingProcedures.forEach(studyVisitTrackingProcedure => {
      if (studyVisitTrackingProcedure.id <= 0 || studyVisitTrackingProcedure.id == null || studyVisitTrackingProcedure.id == undefined) {
        studyVisitTrackingProcedure.createdBy = this.authService.currentUser.id;
        studyVisitTrackingProcedure.createdOn = this.momentDatePipe.currentDate;
      }
      else {
        studyVisitTrackingProcedure.updatedBy = this.authService.currentUser.id;
        studyVisitTrackingProcedure.updatedOn = this.momentDatePipe.currentDate;
      }
    });
    return this.endpoint.addupdate<boolean>(studyVisitTrackingProcedures, this._saveURL + "?studyVisitTrackingId=" + studyVisitTrackingId);
  }

  saveStudyVisitTrackingProcedure(studyVisitTrackingProcedure: StudyVisitTrackingProcedure) {
      if (studyVisitTrackingProcedure.id <= 0 || studyVisitTrackingProcedure.id == null || studyVisitTrackingProcedure.id == undefined) {
        studyVisitTrackingProcedure.createdBy = this.authService.currentUser.id;
        studyVisitTrackingProcedure.createdOn = this.momentDatePipe.currentDate;
      }
      else {
        studyVisitTrackingProcedure.updatedBy = this.authService.currentUser.id;
        studyVisitTrackingProcedure.updatedOn = this.momentDatePipe.currentDate;
    }
    return this.endpoint.addupdate<StudyVisitTrackingProcedure>(studyVisitTrackingProcedure, this._saveStudyVisitTrackingProcedureURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  updateSubjectSignature(id, signature64BaseString) {
    return this.endpoint.addupdate<boolean>({ id: id, signature64BaseString: signature64BaseString }, this._updateSubjectSignatureURL);
  }

  getStudyVisitTrackingProcedureBasicInfo(studyVisitTrackingId: number) {
    const url = this._getStudyVisitTrackingProcedureBasicInfoURL + "?studyVisitTrackingId=" + studyVisitTrackingId;
    return this.endpoint.get<StudyVisitTrackingProcedureBasicInfoViewModel>(url);
  }
}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HistoryStudySubjectMedical, StudySubjectMedical } from '../../models/subject/studysubjectMedical.model';
import { AuthService } from '../account/auth.service';


@Injectable()
export class StudySubjectMedicalService {
  private readonly _baseApiUrl: string = "api/StudySubjectMedicalHistory/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectMedical>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectMedical[]>(url);
  }

  save(studySubjectMedical: StudySubjectMedical) {
    if (studySubjectMedical.id <= 0 || studySubjectMedical.id == null || studySubjectMedical.id == undefined)
      studySubjectMedical.createdBy = this.authService.currentUser.id;
    studySubjectMedical.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectMedical>(studySubjectMedical, this._saveURL);
  }

  deleteStudySubjectMedical(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}
export class HistoryStudySubjectMedicalService {
  private readonly _baseApiUrl: string = "api/StudySubjectMedicalHistory/";
  private readonly _getURL: string = this._baseApiUrl + "GetAllMedicalHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService) { }

  getAll(medicalID) {
    const url = this._getURL + "?medicalID=" + medicalID;
    return this.endpoint.get<HistoryStudySubjectMedical[]>(url);
  }
}

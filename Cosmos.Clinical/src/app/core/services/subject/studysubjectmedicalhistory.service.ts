import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudySubjectMedicalHistory } from '../../models/subject/studysubjectmedicalhistory.model';
import { AuthService } from '../account/auth.service';


@Injectable()
export class StudySubjectMedicalHistoryService {
  private readonly _baseApiUrl: string = "api/StudySubjectMedicalHistory/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectMedicalHistory>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectMedicalHistory[]>(url);
  }

  save(studySubjectMedicalHistory: StudySubjectMedicalHistory) {
    if (studySubjectMedicalHistory.id <= 0 || studySubjectMedicalHistory.id == null || studySubjectMedicalHistory.id == undefined)
      studySubjectMedicalHistory.createdBy = this.authService.currentUser.id;
    studySubjectMedicalHistory.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectMedicalHistory>(studySubjectMedicalHistory, this._saveURL);
  }

  deleteStudySubjectMedicalHistory(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

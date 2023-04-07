import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudySubjectStudyHistory } from '../../models/subject/studysubjectstudyhistory.model';
import { AuthService } from '../account/auth.service';
import { SubjectStudyHistoryViewModel } from '../../viewmodels/subject/subjectstudyhistory.viewmodel';


@Injectable()
export class StudySubjectStudyHistoryService {
  private readonly _baseApiUrl: string = "api/StudySubjectStudyHistory/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _getSubjectPreviousStudyHistoryURL: string = this._baseApiUrl + "GetSubjectPreviousStudyHistory";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectStudyHistory>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectStudyHistory[]>(url);
  }

  getSubjectPreviousStudyHistory(studySubjectId) {
    const url = this._getSubjectPreviousStudyHistoryURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<SubjectStudyHistoryViewModel[]>(url);
  }

  save(studySubjectStudyHistory: StudySubjectStudyHistory) {
    if (studySubjectStudyHistory.id <= 0 || studySubjectStudyHistory.id == null || studySubjectStudyHistory.id == undefined)
      studySubjectStudyHistory.createdBy = this.authService.currentUser.id;
    studySubjectStudyHistory.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectStudyHistory>(studySubjectStudyHistory, this._saveURL);
  }

  deleteStudySubjectStudyHistory(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

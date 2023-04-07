import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HistoryStudySubjectFamily, StudySubjectFamilyHistory } from '../../models/subject/studysubjectESCfamilyhistory.model';
import { AuthService } from '../account/auth.service';


@Injectable()
export class StudySubjectFamilyHistoryService {
  private readonly _baseApiUrl: string = "api/StudySubjectFamilyHistory/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectFamilyHistory>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectFamilyHistory[]>(url);
  }

  save(studySubjectFamilyHistory: StudySubjectFamilyHistory) {
    if (studySubjectFamilyHistory.id <= 0 || studySubjectFamilyHistory.id == null || studySubjectFamilyHistory.id == undefined)
      studySubjectFamilyHistory.createdBy = this.authService.currentUser.id;
    studySubjectFamilyHistory.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectFamilyHistory>(studySubjectFamilyHistory, this._saveURL);
  }

  deleteStudySubjectFamilyHistory(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}
export class HistoryStudySubjectFamilyService {
  private readonly _baseApiUrl: string = "api/StudySubjectFamilyHistory/";
  private readonly _getURL: string = this._baseApiUrl + "GetAllFamilyHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService) { }

  getAll(FamilyHistoryID) {
    const url = this._getURL + "?FamilyHistoryID=" + FamilyHistoryID;
    return this.endpoint.get<HistoryStudySubjectFamily[]>(url);
  }
}

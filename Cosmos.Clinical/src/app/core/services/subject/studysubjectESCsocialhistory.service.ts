import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HistoryStudySubjectSocial, StudySubjectSocialHistory } from '../../models/subject/studysubjectESourcesocialhistory.model';
import { AuthService } from '../account/auth.service';


@Injectable()
export class StudySubjectSocialHistoryService {
  private readonly _baseApiUrl: string = "api/StudySubjectSocialHistory/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectSocialHistory>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectSocialHistory[]>(url);
  }

  save(studySubjectSocialHistory: StudySubjectSocialHistory) {
    if (studySubjectSocialHistory.id <= 0 || studySubjectSocialHistory.id == null || studySubjectSocialHistory.id == undefined)
      studySubjectSocialHistory.createdBy = this.authService.currentUser.id;
    studySubjectSocialHistory.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectSocialHistory>(studySubjectSocialHistory, this._saveURL);
  }

  deleteStudySubjectSocialHistory(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
  
}
export class HistoryStudySubjectSocialService {
  private readonly _baseApiUrl: string = "api/StudySubjectSocialHistory/";
  private readonly _getURL: string = this._baseApiUrl + "GetAllHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService) { }

  getAll(SocialID) {
    const url = this._getURL + "?SocialID=" + SocialID;
    return this.endpoint.get<HistoryStudySubjectSocial[]>(url);
  }
}

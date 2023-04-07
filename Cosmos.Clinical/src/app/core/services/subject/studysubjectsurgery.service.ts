import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HistoryStudySubjectSurgeries, StudySubjectSurgery } from '../../models/subject/studysubjectsurgery.model';
import { AuthService } from '../account/auth.service';


@Injectable()
export class StudySubjectSurgeryService {
  private readonly _baseApiUrl: string = "api/StudySubjectSurgery/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectSurgery>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectSurgery[]>(url);
  }

  save(studySubjectSurgery: StudySubjectSurgery) {
    if (studySubjectSurgery.id <= 0 || studySubjectSurgery.id == null || studySubjectSurgery.id == undefined)
      studySubjectSurgery.createdBy = this.authService.currentUser.id;
    studySubjectSurgery.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectSurgery>(studySubjectSurgery, this._saveURL);
  }

  deleteStudySubjectSurgery(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}
export class HistoryStudySubjectSurgeryService {
  private readonly _baseApiUrl: string = "api/StudySubjectSurgery/";
  private readonly _getURL: string = this._baseApiUrl + "GetAllSurgeryHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService) { }

  getAll(studySubjectSurgeryId) {
    const url = this._getURL + "?studySubjectSurgeryId=" + studySubjectSurgeryId;
    return this.endpoint.get<HistoryStudySubjectSurgeries[]>(url);
  }
}

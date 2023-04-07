import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudySubjectIndicator } from '../../models/subject/studysubjectindicator.model';
import { AuthService } from '../account/auth.service';


@Injectable()
export class StudySubjectIndicatorService {
  private readonly _baseApiUrl: string = "api/StudySubjectIndicator/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectIndicator>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectIndicator[]>(url);
  }

  save(studySubjectIndicator: StudySubjectIndicator) {
    if (studySubjectIndicator.id <= 0 || studySubjectIndicator.id == null || studySubjectIndicator.id == undefined)
      studySubjectIndicator.createdBy = this.authService.currentUser.id;
    studySubjectIndicator.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectIndicator>(studySubjectIndicator, this._saveURL);
  }

  deleteStudySubjectIndicator(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

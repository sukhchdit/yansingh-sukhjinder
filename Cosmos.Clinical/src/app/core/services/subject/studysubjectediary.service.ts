import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudySubjecteDiary } from '../../models/subject/studysubjectediary.model';
import { AttemptedeDiaryViewModel } from '../../viewmodels/ediary/attemptedediary.viewmodel';
import { SectionViewModel } from '../../viewmodels/ediary/section.viewmodel';


@Injectable()
export class StudySubjecteDiaryService {
  private readonly _baseApiUrl: string = "api/StudySubjecteDiary/";

  private readonly _getByeDiaryKeyURL: string = this._baseApiUrl + "GetByeDiaryKey";
  private readonly _getAttemptedeDiaryURL: string = this._baseApiUrl + "GetAttemptedeDiary";
  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _getAllByAttemptedStatusURL: string = this._baseApiUrl + "GetAllByAttemptedStatus";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _updateIsAttemptedURL: string = this._baseApiUrl + "UpdateIsAttempted";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService) {

  }

  getByeDiaryKey(eDiaryKey) {
    const url = this._getByeDiaryKeyURL + "?eDiaryKey=" + eDiaryKey;
    return this.endpoint.get<SectionViewModel[]>(url);
  }

  getAttemptedeDiary(eDiaryKey) {
    const url = this._getAttemptedeDiaryURL + "?eDiaryKey=" + eDiaryKey;
    return this.endpoint.get<AttemptedeDiaryViewModel>(url);
  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjecteDiary>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjecteDiary[]>(url);
  }

  getAllByAttemptedStatus(studySubjectId, attemptedStatus) {
    const url = this._getAllByAttemptedStatusURL + "?studySubjectId=" + studySubjectId + "&attemptedStatus=" + attemptedStatus;
    return this.endpoint.get<StudySubjecteDiary[]>(url);
  }

  updateIsQualified(id, isAttempted) {
    const url = this._updateIsAttemptedURL + "?id=" + id + "&isAttempted=" + isAttempted;
    return this.endpoint.get<boolean>(url);
  }

  save(studySubjecteDiary: StudySubjecteDiary) {
    return this.endpoint.addupdate<StudySubjecteDiary>(studySubjecteDiary, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

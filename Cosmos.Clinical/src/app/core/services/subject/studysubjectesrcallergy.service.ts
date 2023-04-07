import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HistoryStudySubjectAllergy, StudySubjectAllergy } from '../../models/subject/studysubjectescallergy.model';
import { AuthService } from '../account/auth.service';


@Injectable()
export class StudySubjectAllergyService {
  private readonly _baseApiUrl: string = "api/StudySubjectAllergy/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectAllergy>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectAllergy[]>(url);
  }

  save(studySubjectAllergy: StudySubjectAllergy) {
    if (studySubjectAllergy.id <= 0 || studySubjectAllergy.id == null || studySubjectAllergy.id == undefined)
      studySubjectAllergy.createdBy = this.authService.currentUser.id;
    studySubjectAllergy.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectAllergy>(studySubjectAllergy, this._saveURL);
  }

  deleteStudySubjectAllergy(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

export class HistoryStudySubjectAllergyService {
  private readonly _baseApiUrl: string = "api/StudySubjectAllergy/";
  private readonly _getURL: string = this._baseApiUrl + "GetAllAllergyHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService) { }

  getAll(AllergyID) {
    const url = this._getURL + "?allergyID=" + AllergyID;
    return this.endpoint.get<HistoryStudySubjectAllergy[]>(url);
  }
}

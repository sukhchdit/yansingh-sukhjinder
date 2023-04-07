import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { historyStudySubjectConMedication, StudySubjectConcomitantMedicationHistory } from 'src/app/models/subject/studysubjectconcomitantmedicationhistory.model';


@Injectable()
export class StudySubjectConMedicationService {
  private readonly _baseApiUrl: string = "api/StudySubjectConMedication/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectConcomitantMedicationHistory>(url);
  }

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectConcomitantMedicationHistory[]>(url);
  }

  save(studySubjectConMedication: StudySubjectConcomitantMedicationHistory) {
    if (studySubjectConMedication.id <= 0 || studySubjectConMedication.id == null || studySubjectConMedication.id == undefined)
      studySubjectConMedication.createdBy = this.authService.currentUser.id;
    studySubjectConMedication.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectConcomitantMedicationHistory>(studySubjectConMedication, this._saveURL);
  }

  deleteStudySubjectConMedication(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}
export class HistoryStudySubjectConMedicationService {
  private readonly _baseApiUrl: string = "api/StudySubjectConMedication/";
  private readonly _getURL: string = this._baseApiUrl + "GetAllConMedicationHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService) { }

  getAll(studySubjectConMedicationId) {
    const url = this._getURL + "?studySubjectConMedicationId=" + studySubjectConMedicationId;
    return this.endpoint.get<historyStudySubjectConMedication[]>(url);
  }
}

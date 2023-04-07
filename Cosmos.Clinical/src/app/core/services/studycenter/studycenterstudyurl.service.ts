//===================================================================================== Imports ===============================================================//
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../account/services/auth.service';
import { StudyCenterHistory } from '../../../models/studycenter/studycenterhistory.model';
import { StudyUrl } from '../../../models/studycenter/studyurl.model';
import { StudyUrlViewModel } from '../../../viewmodels/studycenter/studyurlviewmodel.model';
import { EndPointService } from '../endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class StudyCenterStudyURLService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/StudyCenterStudyURL/";
  private readonly _saveStudyUrlURL: string = this._baseApiUrl + "SaveStudyUrl";
  private readonly _getStudyUrlURL: string = this._baseApiUrl + "GetStudyUrl";
  private readonly _getAllStudyUrlsURL: string = this._baseApiUrl + "GetAllStudyUrls";
  private readonly _deleteStudyUrlURL: string = this._baseApiUrl + "DeleteStudyUrl";
  private readonly _updateStudyUrlStatusURL: string = this._baseApiUrl + "UpdateStudyUrlStatus";
  private readonly _getStudyCenterHistoryURL: string = this._baseApiUrl + "GetStudyCenterHistory";
  private readonly _getStudyUrlsLinksURL: string = this._baseApiUrl + "GetStudyUrlsLinks";
  private readonly _updateStatusURL: string = this._baseApiUrl + "UpdateQCStatus";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private endpoint: EndPointService
  ) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  getStudyCenterHistory(historyTypeId: number, historyType: string) {
    return this.endpoint.get<StudyCenterHistory[]>(this._getStudyCenterHistoryURL + "?historyTypeId=" + historyTypeId + "&historyType=" + historyType);
  }

  saveStudyUrl(studyUrl: StudyUrl) {
    if (studyUrl.id <= 0 || studyUrl.id == undefined || studyUrl.id == null || studyUrl.createdBy <= 0 || studyUrl.createdBy == null || studyUrl.createdBy == undefined)
      studyUrl.createdBy = this.authService.currentUser.id;
    studyUrl.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(studyUrl, this._saveStudyUrlURL);
  }

  getAllStudyUrl(studyId: number) {
    return this.endpoint.get<StudyUrlViewModel[]>(this._getAllStudyUrlsURL + "?studyId=" + studyId);
  }

  getStudyUrlsLinks(studyId: number) {
    return this.endpoint.get<any[]>(this._getStudyUrlsLinksURL + "?studyId=" + studyId);
  }

  getStudyUrl(id) {
    const url = this._getStudyUrlURL + "?id=" + id;
    return this.endpoint.get<StudyUrl>(url);
  }

  deleteStudyUrl(id: number) {
    const url = this._deleteStudyUrlURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  updateStudyUrlStatus(study: StudyUrl) {
    study.createdBy = study.updatedBy = this.authService.currentUser.id;
    study.updatedOn = new Date();
    return this.endpoint.addupdate<StudyUrl>(study, this._updateStudyUrlStatusURL);
  }

  updateStatus(QCFlagModel: StudyUrl) {
    QCFlagModel.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(QCFlagModel, this._updateStatusURL);
  }

}

//===================================================================================== Imports ===============================================================//
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../account/services/auth.service';
import { StudyCenterFaq } from '../../../models/studycenter/studycenterfaq.model';
import { StudyCenterHistory } from '../../../models/studycenter/studycenterhistory.model';
import { StudyCenterFaqViewModel } from '../../../viewmodels/studycenter/studycenterfaqviewmodel.model';
import { EndPointService } from '../endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class StudyCenterFaqService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/StudyCenterFaq/";
  private readonly _getStudyCenterHistoryURL: string = this._baseApiUrl + "GetStudyCenterHistory";
  private readonly _saveStudyCenterFaqURL: string = this._baseApiUrl + "SaveStudyCenterFaq";
  private readonly _getStudyCenterFaqURL: string = this._baseApiUrl + "GetStudyCenterFaq";
  private readonly _getAllStudyCenterFaqsURL: string = this._baseApiUrl + "GetAllStudyCenterFaqs";
  private readonly _getSiteSiteFaqsURL: string = this._baseApiUrl + "GetSiteSiteFaqs";
  private readonly _getFaqLinksURL: string = this._baseApiUrl + "GetFaqLinks";
  private readonly _deleteStudyCenterFaqURL: string = this._baseApiUrl + "DeleteStudyCenterFaq";
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

  saveFaq(studyCenterFaq: StudyCenterFaq) {
    if (studyCenterFaq.id <= 0 || studyCenterFaq.id == undefined || studyCenterFaq.id == null || studyCenterFaq.createdBy <= 0 || studyCenterFaq.createdBy == null || studyCenterFaq.createdBy == undefined)
      studyCenterFaq.createdBy = this.authService.currentUser.id;
    studyCenterFaq.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(studyCenterFaq, this._saveStudyCenterFaqURL);
  }

  getAllFaq(studyId: number) {
    return this.endpoint.get<StudyCenterFaqViewModel[]>(this._getAllStudyCenterFaqsURL + "?studyId=" + studyId);
  }

  getSiteSiteFaqs(studyId: number, languageId: number) {
    return this.endpoint.get<StudyCenterFaqViewModel[]>(this._getSiteSiteFaqsURL + "?studyId=" + studyId + "&languageId=" + languageId);
  }

  getFaqLinks(studyId: number) {
    return this.endpoint.get<any[]>(this._getFaqLinksURL + "?studyId=" + studyId);
  }

  getFaq(id) {
    const url = this._getStudyCenterFaqURL + "?id=" + id;
    return this.endpoint.get<StudyCenterFaq>(url);
  }

  deleteFaq(id: number) {
    const url = this._deleteStudyCenterFaqURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  updateStatus(QCFlagModel: StudyCenterFaq) {
    QCFlagModel.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(QCFlagModel, this._updateStatusURL);
  }
}

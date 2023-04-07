import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EconsentLanguage } from 'src/app/models/econsent/econsentlanguage.model';
import { EConsentDashboardViewModel } from 'src/app/models/viewmodels/econsent/econsentdashboard.viewmodel';
import { AuthService } from 'src/app/account/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EconsentService {
  port = environment.apiport;
  public readonly _getEconsentGridDataURL: string = "api/eConsent/";
  public readonly _createEconsentICFDataURL: string = "api/eConsent/AddEConsent";
  public readonly _updateEconsentCellDataURL: string = "api/eConsent/UpdateStatus/";
  public readonly _getEconsentSponsor: string = "api/Sponsor/GetSponsor/";
  public readonly _getActiveEconsentURL: string = "api/eConsent/GetActiveConsent/";
  public readonly _getAlleConsentLanguagesURL : string = "api/eConsentLanguages/GetAll";
  public readonly _geteConsentLanguageURL : string = "api/eConsentLanguages/Get/";
  public readonly _saveEConsentLanguageURL : string = "api/eConsentLanguages/Save";
  public readonly _updateEConsentLanguageURL : string = "api/eConsentLanguages/Update/";
  public readonly _deleteEConsentLanguageURL : string = "api/eConsentLanguages/Delete/";
  public readonly _getEConsentDashboardDataURL : string ="api/eConsent/GetDashboard/";
  public readonly _getEConsentSubjectDetailsURL : string ="api/StudySubjectContact/GetAll";
  public readonly _getDashboardDocDetailsURL: string = "api/DocumentMaster/GetDocumentDetails";
  public readonly _previewDashboardDocURL: string = "api/DocumentMaster/DownloadDocumentFile";
  public readonly _getEConsentCommentsURL: string = "api/eConsentDashboard/Get/";  
  public readonly _addEConsentCommentsURL: string = "api/eConsentDashboard/AddComment";  
  public readonly _getEConsentSubjectHistoryURL: string = "api/eConsent/GetEConsentSubjectHistory/";
  public readonly _createEConsentSubjectHistoryURL: string = "api/eConsent/CreateEConsentSubjectHistory";
  public readonly _sendEConsentEmailURL: string = "api/eConsentDashboard/SendEConsentEmail";
  public readonly _sendConsentEmailURL: string = "api/eConsentDashboard/SendConsentEmail";
  public readonly _getEConsentReportURL: string = "api/eConsentReport/Get/";
  public readonly _createICFSubjectLogURL: string = "api/eConsent/CreateICFSubjectLog";
  
  constructor(public endpoint: EndPointService, public authService: AuthService, public httpClient: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken
    });
  }
  getEconsentGridData(id: any) {
    const url = this._getEconsentGridDataURL + id;
    return this.endpoint.get(url);
  }

  saveEconsentICFData(formData: object) {
    const url = this.port + this._createEconsentICFDataURL;
    // return this.endpoint.uploadFile(formData, url);
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  }

  updateCellData(eConsentId, formData) {
    const url = this._updateEconsentCellDataURL + eConsentId;
    return this.endpoint.addupdate(formData, url);
    // return this.httpClient.post<any>(url, formData, { headers: this.getHeaders()});
  }

  getEconsentSponserName(id: any) {
    const url = this._getEconsentSponsor + "?id=" + id;
    return this.endpoint.get(url);
  }

  getActiveEconsent(id: any) {
    const url = this._getActiveEconsentURL + id;
    return this.endpoint.get(url);
  }

  getAlleConsentLanguages() {
    return this.endpoint.get<EconsentLanguage[]>(this._getAlleConsentLanguagesURL);
  }

  saveEconsentLanguage(language: EconsentLanguage) {
    return this.endpoint.addupdate<EconsentLanguage>(language, this._saveEConsentLanguageURL);
  }

  geteConsentLanguage(id) {
    const url = this._geteConsentLanguageURL + id;
    return this.endpoint.get<EconsentLanguage>(url);
  }

  deleteeConsentLanguage(id: number) {
    const url = this._deleteEConsentLanguageURL + id;
    return this.endpoint.addupdate<boolean>({}, url);
  }

  updateeConsentLanguage(language: EconsentLanguage, id: number) {
    const url = this._updateEConsentLanguageURL + id;
    return this.endpoint.addupdate<EconsentLanguage>(language, url);
  }

  getEConsentDashboardData(id: any){
    const url = this._getEConsentDashboardDataURL + id;
    return this.endpoint.get<EConsentDashboardViewModel[]>(url);
  }

  getSubjectDetails(id: any){
    const url = this._getEConsentSubjectDetailsURL + "?studySubjectId=" + id;
    return this.endpoint.get(url);
  }
  
  getEDashboardDocDetails(docId) {
    const url = this._getDashboardDocDetailsURL + '?documentId=' + docId;
    return this.endpoint.get(url);

  }

  previewDashboardDocument(formData) {
    const url = this.port + this._previewDashboardDocURL;
    return this.httpClient.post(url, formData, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });
  }

  getComments(id){
    const url = this._getEConsentCommentsURL + id;
    return this.endpoint.get(url);
  }

  saveEconsentComment(Comment){
    return this.endpoint.addupdate(Comment, this._addEConsentCommentsURL);
  }

  getEConsentReport(cdaID) {
    const url = this._getEConsentReportURL + cdaID;
    return this.endpoint.get(url);
  }

} 

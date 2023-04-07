import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { NonDocumented } from '../../models/document/nondocumented.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocumentMaster } from '../../models/document/documentmaster.model';

@Injectable()
export class NonDocumentedService {
  port = environment.apiport;
  private readonly _apiURL: string = "api/NonDocumented/";
  private readonly _getURL: string = this._apiURL + "Get";
  private readonly _deleteURL: string = this._apiURL + "Delete";
  private readonly _getAllURL: string = this._apiURL + "GetAll";
  private readonly _saveURL: string = this._apiURL + "Save";
  private readonly _uploadFilesURL: string = this._apiURL + "UploadFiles";
  private readonly _downloadByteArrayURL: string = this._apiURL + "DownloadByteArray";
  private readonly _addToeRegulatoryURL: string = this._apiURL + "AddToeRegulatory";

  constructor(private endpoint: EndPointService, private httpClient: HttpClient, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<NonDocumented>(url);
  }

  getAll(sponsorSiteStudyCDAInvitationId) {
    const url = this._getAllURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<NonDocumented[]>(url);
  }

  save(document: NonDocumented) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
      document.createdOn = this.momentDatePipe.currentDate;
    }
    document.updatedBy = this.authService.currentUser.id;
    document.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<NonDocumented>(document, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

  uploadDocumentFile(formData) {
    const url = this.port + this._uploadFilesURL;
    //return this.httpClient.post<any>(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });

    return this.endpoint.uploadFileWithObservable<any>(formData, this._uploadFilesURL);
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  downloadByteArrayForPDFViewer(obj) {    
    const url = this.port + this._downloadByteArrayURL;
    return this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });
  }

  addToeRegulatory(document: DocumentMaster, nonDocumentedId) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
      document.createdOn = this.momentDatePipe.currentDate;
    }
    document.updatedBy = this.authService.currentUser.id;
    document.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<DocumentMaster>(document, this._addToeRegulatoryURL + "?nonDocumentedId=" + nonDocumentedId);
  }
}

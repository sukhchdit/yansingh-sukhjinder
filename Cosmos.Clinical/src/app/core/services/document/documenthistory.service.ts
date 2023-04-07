import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { DocumentHistory } from '../../models/document/documenthistory.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable()
export class DocumentHistoryService {
  port = environment.apiport;
  private readonly _baseURL: string = "api/DocumentHistory/";
  private readonly _getURL: string = this._baseURL + "Get";
  private readonly _deleteURL: string = this._baseURL + "Delete";
  private readonly _getAllURL: string = this._baseURL + "GetAll";
  private readonly _saveURL: string = this._baseURL + "Save";
  private readonly _downloadHistoryURL: string = this._baseURL + "DownloadHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe, private httpClient: HttpClient) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<DocumentHistory>(url);
  }
    
  getAll(documentId) {
    const url = this._getAllURL + "?documentId=" + documentId;
    return this.endpoint.get<DocumentHistory[]>(url);
  }

  save(document: DocumentHistory) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
      document.createdOn = this.momentDatePipe.currentDate;
    }
    document.updatedBy = this.authService.currentUser.id;
    document.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<DocumentHistory>(document, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

  downloadHistory(documentId, displayName) {
    //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
    var obj = { id : documentId };
    const url = this.port + this._downloadHistoryURL;
    this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, displayName);
    }, err => {
      console.log(err);
    });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }
}

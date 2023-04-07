import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
//import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MonitorInfo } from 'src/app/models/monitor/monitorinfo.model';
import { MonitorSearchCriteriaViewModel } from 'src/app/viewmodels/monitor/monitorsearchcriteriaviewmodel.model';
import { MonitorDocument } from 'src/app/models/monitor/monitordocument.model';
import { AuthService } from 'src/app/account/services/auth.service';

@Injectable()
export class MonitorService {
  port = environment.apiport;
  private readonly _getMonitorURL: string = "api/Monitor/GetMonitor";
  private readonly _getMonitorByOrganizationId: string = "api/Monitor/GetMonitorInfoByOrganizationId";
  private readonly _getAllMonitorURL: string = "api/Monitor/GetAllMonitor";
  private readonly _searchMonitorURL: string = "api/Monitor/SearchMonitor";
  private readonly _saveMonitorURL: string = "api/Monitor/SaveMonitor";
  private readonly _deleteMonitorURL: string = "api/Monitor/DeleteMonitor";
  private readonly _uploadDocumentFileURL: string = "api/Monitor/UploadDocumentFile";

  private readonly _getMonitorListByOrganizationIdURL: string = "api/Monitor/GetMonitorListByOrganizationId";
  private readonly _getAllMonitorDocumentByMonitorIdURL: string = "api/Monitor/GetAllMonitorDocumentByMonitorId";
  private readonly _saveMonitorDocumentURL: string = "api/Monitor/SaveMonitorDocument";
  private readonly _deleteUploadedMonitorFileURL: string = "api/Monitor/DeleteUploadedDocumentFile";
  private readonly _deleteMonitorDocumentURL: string = "api/Monitor/DeleteMonitorDocument";

  constructor(private endpoint: EndPointService, private httpClient: HttpClient, private authService: AuthService) {

  }

  get(id) {
    const url = this._getMonitorURL + "?id=" + id;
    return this.endpoint.get<MonitorInfo>(url);
  }

  getMonitorInfoByOrganizationId(organizationId) {
    const url = this._getMonitorByOrganizationId + "?organizationId=" + organizationId;
    return this.endpoint.get<MonitorInfo>(url);
  }

  getMonitorListByOrganizationId(organizationId) {
    const url = this._getMonitorListByOrganizationIdURL + "?organizationId=" + organizationId;
    return this.endpoint.get<MonitorInfo[]>(url);
  }

  getAll() {
    return this.endpoint.get<MonitorInfo[]>(this._getAllMonitorURL);
  }

  searchMonitor(searchCriteria: MonitorSearchCriteriaViewModel) {
    return this.endpoint.addupdate<MonitorInfo[]>(searchCriteria, this._searchMonitorURL);
  }

  save(monitor: MonitorInfo) {
    if (monitor.id <= 0 || monitor.id == null || monitor.id == undefined) {
      monitor.organizationInfoId = this.authService.organization.id;
      monitor.createdBy = this.authService.organization.id;
    }
    monitor.updatedBy = this.authService.organization.id;
    return this.endpoint.addupdate<MonitorInfo>(monitor, this._saveMonitorURL);
  }

  delete(id) {
    const url = this._deleteMonitorURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  uploadMonitorDocumentFile(formData) {
    var url = this.port + this._uploadDocumentFileURL;
    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  getAllMonitorDocumentByMonitorId(monitorId) {
    const url = this._getAllMonitorDocumentByMonitorIdURL + "?monitorId=" + monitorId;
    return this.endpoint.get<MonitorDocument[]>(url);
  }

  saveMonitorDocument(monitorDocumentData) {
    monitorDocumentData.createdBy = this.authService.currentUser.id;
    monitorDocumentData.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<MonitorDocument>(monitorDocumentData, this._saveMonitorDocumentURL);
  }

  DeleteUploadedLicenseFile(model) {
    const url = this._deleteUploadedMonitorFileURL;
    return this.endpoint.addupdate<any>(model, url);
  }

  DeleteMonitorDocument(model) {
    const url = this._deleteMonitorDocumentURL;
    return this.endpoint.addupdate<any>(model, url);
  }

}

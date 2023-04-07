import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SponsorSiteStudyCDAInvitation } from 'src/app/models/sponsor/sponsorsitestudycdainvitation.model';
import { environment } from 'src/environments/environment';
import { EndPointService } from '../endpoint.service';
import { SponsorStudyService } from '../sponsor/sponsorstudy.service';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/account/services/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaultService {

  port = environment.apiport;
  public readonly _getSiteListDataURL: string = "api/SponsorStudy/GetSponsorStudyCDAInvitationList/";
  public readonly _uploadFileDataURL: string = "api/eVault/SaveDocument";
  public readonly _getSiteUserGridDataURL: string = "api/eVault/";
  public readonly _getSiteSafetyDataUrl: string = "api/eVault/SiteSafetyDocuments/";
  public readonly _getSiteEOSDataUrl: string = "api/eVault/SiteEOSDocuments/";
  public readonly _saveSiteDetailsDataURL: string = "api/SponsorStudy/SaveSponsorSiteStudyCDAInvitation";
  public readonly _updateFileStatusURL: string = "api/eVault/UpdateFileStatus/";
  public readonly _saveOrganizationContactURL: string = "api/Organization/SaveOrganizationContact";
  public readonly _saveSponsorSiteCDAURL: string = "api/SponsorStudyCDAInvitation/SaveSponsorSiteCDA";
  public readonly _downloadSiteFileURL: string = "api/eVault/Download";
  public readonly _getSafetyCompliance: string = "api/evault/SafetyCompliene/";
  public readonly _getEosCompliance: string = "api/evault/EosCompliene/";
  public readonly _evaultDocSignatureURL: string = "api/evault/eVaultDocSignature/";
  public readonly _uploadSiteListDataURL: string = "api/evault/AddNewSite/";
  public readonly _getPIregisterSiteListURL: string = "api/evault/SitesByEmails/";
  public readonly _downloadEvaultComplianceFilesURL: string = "api/eVault/DownloadFiles";
  public containerAction = new Subject();

  constructor(public sponsorStudyService: SponsorStudyService, public endpoint: EndPointService, public authService: AuthService, public httpClient: HttpClient) { }

  public getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken
    });
  }
  getSiteListStudyInfo(id: any) {
    const url = this._getSiteListDataURL + "?sponsorStudyInfoId=" + id;
    return this.endpoint.get(url);
  }

  addEvaultDigitalSignatureToDocument(obj, site_id: any, evault_id: any) {
    const url = this._evaultDocSignatureURL + site_id + '/' + evault_id;
    return this.endpoint.addupdate<any>(obj, url);
  }

  getSafetyCompliance(sponsor_id, study_id) {
    const url = this._getSafetyCompliance + sponsor_id + '/' + study_id;
    return this.endpoint.get(url);
  }

  getEosCompliance(sponsor_id, study_id) {
    const url = this._getEosCompliance + sponsor_id + '/' + study_id;
    return this.endpoint.get(url);
  }

  uploadEvaultFile(formData) {
    const url = this.port + this._uploadFileDataURL;
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  }

  getSiteSafetyGridData(study_id, site_id) {
    const url = this._getSiteSafetyDataUrl + site_id + '/' + study_id;
    return this.endpoint.get(url);
  }

  getSiteEOSGridData(study_id, site_id) {
    const url = this._getSiteEOSDataUrl + site_id + '/' + study_id;
    return this.endpoint.get(url);
  }

  saveSiteDetails(model: any) {
    return this.sponsorStudyService.saveSponsorSiteStudyCDAInvitation(model);
  }

  updateFileStatus(_id, commentObj) {
    const url = this._updateFileStatusURL + _id;
    return this.endpoint.addupdate(commentObj, url);
  }

  saveOrganizationContact(formData: any) {
    const url = this.port + this._saveOrganizationContactURL;
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  }

  saveSponsorSiteCDA(formData: any) {
    const url = this.port + this._saveSponsorSiteCDAURL;
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  }

  downloadSiteFile(formData: any) {
    const url = this.port + this._downloadSiteFileURL;
    return this.httpClient.post(url, formData, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });
  }

  getSafetyEosDocuments(study_id: any, site_id: any) {
    const url = this._getSiteUserGridDataURL + study_id + '/' + site_id;
    return this.endpoint.get(url);
  }

  getSafetyUserGridData(study_id: any) {
    const url = this._getSiteUserGridDataURL + study_id;
    return this.endpoint.get(url);
  }

  downloadEvaultDocument(formData: any) {
    const url = this.port + this._downloadSiteFileURL;
    this.httpClient.post(url, formData, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, formData.fileName);
    }, err => {
      console.log(err);
    });
  }

  uploadBulkSiteData(jsonData, org_id, study_id) {
    const url = this._uploadSiteListDataURL + org_id + '/' + study_id;
    return this.endpoint.addupdate(jsonData, url);
  }

  getPIregisteredSiteList(email) {
    let requestData = [email.toString()];
    const url = this._getPIregisterSiteListURL;
    return this.endpoint.addupdate(requestData, url);
  }
  getPIregisteredSiteListData(id){
    const url = this._getPIregisterSiteListURL + id;
    return this.endpoint.get(url);
  }

  downloadEvaultComplianceFiles(formData: any) {
    const url = this.port + this._downloadEvaultComplianceFilesURL;
    this.httpClient.post(url, formData, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, formData.fileName);
    }, err => {
      console.log(err);
    });
  }
}

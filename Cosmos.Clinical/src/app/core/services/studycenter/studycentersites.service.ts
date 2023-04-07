//===================================================================================== Imports ===============================================================//
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { BulkSaveStudySiteResponseViewModel } from 'src/app/viewmodels/studycenter/bulksavestudysiteresponseviewmodel.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../account/services/auth.service';
import { StudySite } from '../../../models/studycenter/studysite.model';
import { MySiteViewModel } from '../../../viewmodels/studycenter/mysiteviewmodel.model';
import { SitesViewModel } from '../../../viewmodels/studycenter/sitesviewmodel.model';
import { EndPointService } from '../endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class StudyCenterSitesService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/StudyCenterSites/";

  private readonly _downloadSitesSampleFileURL: string = this._baseApiUrl + "DownloadSitesSampleFormat";
  private readonly _getAllSitesURL: string = this._baseApiUrl + "GetAllSites";
  private readonly _bulkSaveSitesURL: string = this._baseApiUrl + "BulkSaveSites";
  private readonly _updateSiteStatusURL: string = this._baseApiUrl + "UpdateSiteStatus";
  private readonly _getStudySiteURL: string = this._baseApiUrl + "GetStudySite";
  private readonly _saveStudySiteURL: string = this._baseApiUrl + "SaveStudySite";
  private readonly _getMySiteURL: string = this._baseApiUrl + "GetMySite";
  private readonly _updateStatusURL: string = this._baseApiUrl + "UpdateStatus";
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

  downloadSitesSampleFormat() {
    var url = this.port + this._downloadSitesSampleFileURL;
    this.httpClient.post(url, null, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, 'Site_Bulk _Upload.csv');
    }, (err) => {
      //console.log(err);
    });
  }

  getAllSites(studyId: number) {
    return this.endpoint.get<SitesViewModel[]>(this._getAllSitesURL + "?studyId=" + studyId);
  }

  bulkSaveSites(studySites: StudySite[]) {
    console.log(this.authService.currentUser.id);
    studySites.forEach(studySite => {
      studySite.createdBy = studySite.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<BulkSaveStudySiteResponseViewModel>(studySites, this._bulkSaveSitesURL);
  }

  updateSiteStatus(site: SitesViewModel) {
    site.createdBy = site.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(site, this._updateSiteStatusURL);
  }

  getStudySite(id) {
    const url = this._getStudySiteURL + "?id=" + id;
    return this.endpoint.get<StudySite>(url);
  }

  saveStudySite(studySite: StudySite) {
    studySite.createdBy = this.authService.currentUser.id;
    studySite.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(studySite, this._saveStudySiteURL);
  }

  getMySite(siteInfoId: number, userId: number) {
    return this.endpoint.get<MySiteViewModel[]>(this._getMySiteURL + "?siteInfoId=" + siteInfoId + "&userId=" + userId);
  }

  updateStatus(QCFlagModel: QCFlagModel) {
    QCFlagModel.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(QCFlagModel, this._updateStatusURL);
  }
}

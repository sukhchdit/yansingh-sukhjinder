import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { TMFZone } from '../../models/sponsor/tmfzone.model';
import { TMFSection } from '../../models/sponsor/tmfsection.model';
import { TMFArtifact } from '../../models/sponsor/tmfartifact.model';
import { EssentialDoc } from '../../models/sponsor/essentialdoc.model';
import { SponsorStudyInfo } from '../../models/sponsor/sponsorstudyinfo.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SiteEssentialDoc } from '../../models/sponsor/siteessentialdoc.model';

@Injectable()
export class TMFService {
  port = environment.apiport;
  private readonly _getDocumentZoneURL: string = "api/TMF/Get";
  private readonly _deleteDocumentZoneURL: string = "api/TMF/Delete";
  private readonly _getAllTMFZonesURL: string = "api/TMF/GetAllZone";
  private readonly _createDocumentZoneURL: string = "api/TMF/Save";
  private readonly _getAllSectionURL: string = "api/TMF/GetAllSection";
  private readonly _getAllArtifactURL: string = "api/TMF/GetAllArtifact";
  private readonly _createEssentialDocURL: string = "api/EssentialDoc/SaveEssentialDoc";
  private readonly _getAllSponsorStudyURL: string = "api/SponsorStudy/GetAllSponsorStudy";

  
  private readonly _updateEssentialDocURL: string = "api/EssentialDoc/UpdateEssentialDoc";
  private readonly _getEssentialDocForQAURL: string = "api/EssentialDoc/GetAllEssentialDocForQA";

  private readonly _getEssentialDocURL: string = "api/EssentialDoc/GetAllEssentialDoc";
  private readonly _getAllActiveSectionURL: string = "api/TMF/GetAllActiveSection";
  private readonly _getAllActiveArtifactURL: string = "api/TMF/GetAllActiveArtifact";

  private readonly _createSiteEssentialDocURL: string = "api/EssentialDoc/SaveSiteEssentialDoc";


  constructor(private endpoint: EndPointService, private authService: AuthService, public httpClient: HttpClient) {

  }

  getZoneById(id) {
    const url = this._getDocumentZoneURL + "?id=" + id;
    return this.endpoint.get<TMFZone>(url);
  }

  getAllZones() {
    const url = this._getAllTMFZonesURL;// + "?id=" + id;
    return this.endpoint.get<TMFZone[]>(url);
  }

  saveTMFZone(document: TMFZone) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
    }
    document.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<TMFZone>(document, this._createDocumentZoneURL);
  }

  delete(id) {
    const url = this._deleteDocumentZoneURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

  getAllSection(id: number) {
    const url = this._getAllSectionURL + "?zoneId=" + id;
    return this.endpoint.get<TMFSection[]>(url);
  }
  getAllActiveSection() {
    const url = this._getAllActiveSectionURL;
    return this.endpoint.get<TMFSection[]>(url);
  }

  getAllArtifact(id: number) {
    const url = this._getAllArtifactURL + "?sectionId=" + id;
    return this.endpoint.get<TMFArtifact[]>(url);
  }


  updateEssentialDoc(document: EssentialDoc) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
    }
    document.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<EssentialDoc>(document, this._updateEssentialDocURL);
  }

  getAllActiveArtifact() {
    const url = this._getAllActiveArtifactURL;
    return this.endpoint.get<TMFArtifact[]>(url);
  }
  saveSiteEssentialDoc(document: SiteEssentialDoc) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
    }
    document.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SiteEssentialDoc>(document, this._createSiteEssentialDocURL);
  }


  saveEssentialDoc(formData: object) {
    const url = this.port + this._createEssentialDocURL;
    // return this.endpoint.uploadFile(formData, url);
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  }

  getAllSponsorStudy() {
    const url = this._getAllSponsorStudyURL + "?sponsorInfoId=" + this.authService.currentUser.id;
    return this.endpoint.get<SponsorStudyInfo[]>(url);
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken
    });
  }

  getEssentialDoc() {
    const url = this._getEssentialDocURL;
    return this.endpoint.get<EssentialDoc[]>(url);
  }

  getEssentialDocForQA(sponserId: number, userType: string) {
    const url = this._getEssentialDocForQAURL + "?sponserId=" + sponserId + "&userType=" + userType;
    return this.endpoint.get<EssentialDoc[]>(url);
  }
}

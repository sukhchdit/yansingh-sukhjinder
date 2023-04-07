import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { SiteDetail } from 'src/app/models/site/sitedetail.model';
import { SiteEmergencyRoom } from 'src/app/models/site/siteemergencyroom.model';
import { SiteEquipment } from 'src/app/models/site/siteequipment.model';
import { SiteImaging } from 'src/app/models/site/siteimaging.model';
import { SiteInfo } from 'src/app/models/site/siteinfo.model';
import { SiteIT } from 'src/app/models/site/siteit.model';
import { SiteLabDetail } from 'src/app/models/site/sitelabdetail.model';
import { SponsorSiteStudyCDAInvitation } from 'src/app/models/sponsor/sponsorsitestudycdainvitation.model';
import { SearchSiteResultViewModel } from 'src/app/viewmodels/site/searchsiteresult.viewmodel';
import { SiteDashboardViewModel } from 'src/app/viewmodels/site/sitedashboardviewmodel.model';
import { EndPointService } from '../endpoint.service';


@Injectable()
export class SiteService {
  private readonly _getURL: string = "api/Site/Get";
  private readonly _getByEmailURL: string = "api/Site/GetByEmail";
  private readonly _getAllURL: string = "api/Site/GetAll";
  private readonly _getSiteInfoDetailsURL: string = "api/Site/GetSiteInfoDetails";
  private readonly _getAllForAdminURL: string = "api/Site/GetAllForAdmin";
  private readonly _saveURL: string = "api/Site/Save";
  private readonly _deleteURL: string = "api/Site/Delete";
  private readonly _updateSiteSmsFaxNumberURL: string = "api/Site/UpdateSiteSmsFaxNumber";
  private readonly _checkSiteExistsURL: string = "api/Site/CheckSiteExists";

  private readonly _getSiteDetailURL: string = "api/Site/GetSiteDetail";
  private readonly _getSiteInfosByOrganizationIdURL: string = "api/Site/GetSiteInfosByOrganizationId";
  private readonly _getSiteDetailBySiteIdURL: string = "api/Site/GetSiteDetailBySiteId";
  private readonly _getAllSiteDetailURL: string = "api/Site/GetAllSiteDetail";
  private readonly _saveSiteDetailURL: string = "api/Site/SaveSiteDetail";
  private readonly _deleteSiteDetailURL: string = "api/Site/DeleteSiteDetail";

  private readonly _getSiteEquipmentURL: string = "api/Site/GetSiteEquipement";
  private readonly _getSiteEquipmentBySiteIdURL: string = "api/Site/GetSiteEquipementBySiteId";
  private readonly _getAllSiteEquipmentURL: string = "api/Site/GetAllSiteEquipement";
  private readonly _saveSiteEquipmentURL: string = "api/Site/SaveSiteEquipement";
  private readonly _deleteSiteEquipmentURL: string = "api/Site/DeleteSiteEquipement";

  private readonly _getSiteLabDetailURL: string = "api/Site/GetSiteLabDetail";
  private readonly _getSiteLabDetailBySiteIdURL: string = "api/Site/GetSiteLabDetailBySiteId";
  private readonly _getAllSiteLabDetailURL: string = "api/Site/GetAllSiteLabDetail";
  private readonly _saveSiteLabDetailURL: string = "api/Site/SaveSiteLabDetail";
  private readonly _deleteSiteLabDetailURL: string = "api/Site/DeleteSiteLabDetail";

  private readonly _getSiteImagingURL: string = "api/Site/GetSiteImaging";
  private readonly _getSiteImagingBySiteIdURL: string = "api/Site/GetSiteImagingBySiteId";
  private readonly _getAllSiteImagingURL: string = "api/Site/GetAllSiteImaging";
  private readonly _saveSiteImagingURL: string = "api/Site/SaveSiteImaging";
  private readonly _deleteSiteImagingURL: string = "api/Site/DeleteSiteImaging";

  private readonly _getSiteITURL: string = "api/Site/GetSiteIT";
  private readonly _saveSiteITURL: string = "api/Site/SaveSiteIT";
  private readonly _deleteSiteITURL: string = "api/Site/DeleteSiteIT";
  private readonly _getSiteInfoByOrganizationId: string = "api/Site/GetSiteInfoByOrganizationId";

  private readonly _getSiteEmergencyRoomURL: string = "api/Site/GetSiteEmergencyRoom";
  private readonly _saveSiteEmergencyRoomURL: string = "api/Site/SaveSiteEmergencyRoom";
  private readonly _deleteSiteEmergencyRoomURL: string = "api/Site/DeleteSiteEmergencyRoom";

  private readonly _searchSiteForCdaInvitationURL: string = "api/Site/SearchSiteForCdaInvitation";

  private readonly _getSiteSavedStudyDetailsURL: string = "api/Site/GetSiteSavedStudyDetails";
  private readonly _getSiteSavedStudyDetailURL: string = "api/Site/GetSiteSavedStudyDetail";
  private readonly _getSitesByTeamContactURL: string = "api/Site/GetSitesByTeamContact";

  private readonly _savesearch: string = "api/SSUSiteSearch/SaveSearch/";
  private readonly _usersearch: string = "api/SSUSiteSearch/UserSearch/";
  private readonly _sendcdainvitationURL: string = "api/SSUSiteSearch/SendCDAInvitation/";
  private readonly _getcdainvitaitonURL: string = "api/SSUSiteSearch/SSUCDAInvitaiton/";
  private readonly _getSaveUserSearchURL: string = "api/SSUSiteSearch/FilterBySearch/";
  private readonly _getGetByWorkflow:string="api/SSUWorkflow/WorkflowDetails/";
  private readonly _getGetByWorkflowSSURequestURL:string="api/SSUSiteWorkflow/GetSSUSiteRequests/";

  private readonly _getSiteDashboardData1URL: string = "api/Site/GetSiteDashboardData1";

    constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SiteInfo>(url);
  }

  getByEmail(email) {
    const url = this._getByEmailURL + "?email=" + email;
    return this.endpoint.get<SiteInfo>(url);
  }

  getSiteInfoByOrganizationId(organizationId) {
    const url = this._getSiteInfoByOrganizationId + "?organizationId=" + organizationId;
    return this.endpoint.get<SiteInfo>(url);
  }


  getSiteNamesAndIdByOrganizationId(organizationId) {
    const url = this._getSiteInfosByOrganizationIdURL + "?organizationId=" + organizationId;
    return this.endpoint.get<any[]>(url);
  }

  getAll(organizationid) {
    const url = this._getAllURL + "?organizationid=" + organizationid;
    return this.endpoint.get<SiteInfo[]>(url);
  }

  getSiteInfoDetails(organizationId) {
    const url = this._getSiteInfoDetailsURL + "?organizationId=" + organizationId;
    return this.endpoint.get<any[]>(url);
  }

  getAllForAdmin() {
    const url = this._getAllForAdminURL;
    return this.endpoint.get<SiteInfo[]>(url);
  }

  save(site) {
    if (site.siteInfo.id <= 0 || site.siteInfo.id == null || site.siteInfo.id == undefined) {
      site.siteInfo.createdBy = this.authService.currentUser.id;
      site.siteInfo.organizationInfoId = this.authService.organization.id;
    }
    site.siteInfo.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SiteInfo>(site, this._saveURL);
  }

  checkSiteExists(site) {
    if (site.siteInfo.id <= 0 || site.siteInfo.id == null || site.siteInfo.id == undefined) {      
      site.siteInfo.organizationInfoId = this.authService.organization.id;
    }
    return this.endpoint.addupdate<any>(site, this._checkSiteExistsURL);
  }

  updateSiteSmsFaxNumber(id, smsNumber, fax) {
    const url = this._updateSiteSmsFaxNumberURL + "?id=" + id + "&smsNumber=" + smsNumber + "&fax=" + fax;
    return this.endpoint.get<SiteInfo[]>(url);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSiteDetail(id) {
    const url = this._getSiteDetailURL + "?id=" + id;
    return this.endpoint.get<SiteDetail>(url);
  }

  getSiteDetailBySiteId(siteid) {
    const url = this._getSiteDetailBySiteIdURL + "?siteid=" + siteid;
    return this.endpoint.get<SiteDetail>(url);
  }

  getAllSiteDetail(siteId) {
    const url = this._getAllSiteDetailURL + "?siteId=" + siteId;
    return this.endpoint.get<SiteDetail[]>(url);
  }

  saveSiteDetail(site: SiteDetail) {
    if (site.id <= 0 || site.id == null || site.id == undefined)
      site.createdBy = this.authService.organization.id;
    site.updatedBy = this.authService.organization.id;
    return this.endpoint.addupdate<SiteDetail>(site, this._saveSiteDetailURL);
  }

  deleteSiteDetail(id: number) {
    const url = this._deleteSiteDetailURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSiteEquipment(id) {
    const url = this._getSiteEquipmentURL + "?id=" + id;
    return this.endpoint.get<SiteEquipment>(url);
  }

  getSiteEquipmentBySiteId(siteid) {
    const url = this._getSiteEquipmentBySiteIdURL + "?siteid=" + siteid;
    return this.endpoint.get<SiteEquipment>(url);
  }

  getAllSiteEquipment(siteId) {
    const url = this._getAllSiteEquipmentURL + "?siteId=" + siteId;
    return this.endpoint.get<SiteEquipment[]>(url);
  }

  saveSiteEquipment(site: SiteEquipment) {
    if (site.id <= 0 || site.id == null || site.id==undefined)
      site.createdBy = this.authService.currentUser.id;
    site.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SiteEquipment>(site, this._saveSiteEquipmentURL);
  }

  deleteSiteEquipment(id: number) {
    const url = this._deleteSiteEquipmentURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSiteLabDetail(id) {
    const url = this._getSiteLabDetailURL + "?id=" + id;
    return this.endpoint.get<SiteLabDetail>(url);
  }

  getSiteLabDetailBySiteId(siteId) {
    const url = this._getSiteLabDetailBySiteIdURL + "?siteId=" + siteId;
    return this.endpoint.get<SiteLabDetail>(url);
  }

  getAllSiteLabDetail(siteId) {
    const url = this._getAllSiteLabDetailURL + "?siteId=" + siteId;
    return this.endpoint.get<SiteLabDetail[]>(url);
  }

  saveSiteLabDetail(site: SiteLabDetail) {
    if (site.id <= 0 || site.id == null || site.id == undefined)
      site.createdBy = this.authService.currentUser.id;
    site.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SiteLabDetail>(site, this._saveSiteLabDetailURL);
  }

  deleteSiteLabDetail(id: number) {
    const url = this._deleteSiteLabDetailURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSiteImaging(id) {
    const url = this._getSiteImagingURL + "?id=" + id;
    return this.endpoint.get<SiteImaging>(url);
  }

  getSiteImagingBySiteId(siteId) {
    const url = this._getSiteImagingBySiteIdURL + "?siteId=" + siteId;
    return this.endpoint.get<SiteImaging>(url);
  }

  getAllSiteImaging(siteId) {
    const url = this._getAllSiteImagingURL + "?siteId=" + siteId;
    return this.endpoint.get<SiteImaging[]>(url);
  }

  saveSiteImaging(site: SiteImaging) {
    if (site.id <= 0 || site.id == null || site.id == undefined)
      site.createdBy = this.authService.currentUser.id;
    site.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SiteImaging>(site, this._saveSiteImagingURL);
  }

  deleteSiteImaging(id: number) {
    const url = this._deleteSiteImagingURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSiteIT(siteId) {
    const url = this._getSiteITURL + "?siteId=" + siteId;
    return this.endpoint.get<SiteIT>(url);
  }

  saveSiteIT(site: SiteIT) {
    if (site.id <= 0 || site.id == null || site.id == undefined)
      site.createdBy = this.authService.currentUser.id;
    site.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SiteIT>(site, this._saveSiteITURL);
  }

  deleteSiteIT(id: number) {
    const url = this._deleteSiteITURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSiteEmergencyRoom(siteId) {
    const url = this._getSiteEmergencyRoomURL + "?siteId=" + siteId;
    return this.endpoint.get<SiteEmergencyRoom>(url);
  }

  saveSiteEmergencyRoom(site: SiteEmergencyRoom) {
    if (site.id <= 0 || site.id == null || site.id == undefined)
      site.createdBy = this.authService.currentUser.id;
    site.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SiteEmergencyRoom>(site, this._saveSiteEmergencyRoomURL);
  }

  deleteSiteEmergencyRoom(id: number) {
    const url = this._deleteSiteEmergencyRoomURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  searchSiteForCdaInvitation(searchCriteria) {
    const url = this._searchSiteForCdaInvitationURL;
    return this.endpoint.addupdate<SearchSiteResultViewModel[]>(searchCriteria, url);
  }

  getSiteSavedStudyDetails(organizationContactId, siteInfoId) {
    const url = this._getSiteSavedStudyDetailsURL + "?organizationContactId=" + organizationContactId + "&siteInfoId=" + siteInfoId;
    return this.endpoint.get<SponsorSiteStudyCDAInvitation[]>(url);
  }

  getSiteSavedStudyDetail(sponsorSiteStudyCDAInvitationId) {
    const url = this._getSiteSavedStudyDetailURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<SponsorSiteStudyCDAInvitation>(url);
  }

  SaveSearch(requiredData) {
    const url = this._savesearch + requiredData.RequestId;
    return this.endpoint.addupdate<any>(requiredData, url);
  }

  UserSearch(RequestId) {
    const url = this._usersearch+ RequestId;
    return this.endpoint.get<any>(url);
  }

  SendCDAInvitation(form,id){
    // const RequestId: any =  requiredData.map(obj => {return obj['RequestId']})
    const url = this._sendcdainvitationURL + id;
    return this.endpoint.addupdate<any>(form, url);
  }

  SSUCDAInvitaiton(id){
    const url = this._getcdainvitaitonURL + id;
    return this.endpoint.get<any>(url);
  }

  SSUSiteWorkFlowGetGetByWorkflow(workflowId,siteguid){
    const url = this._getGetByWorkflow + workflowId+"/"+siteguid;
    return this.endpoint.get<any>(url);
  }
  SSURequestGetByWorkflow(siteguid){
    const url = this._getGetByWorkflowSSURequestURL +siteguid;
    return this.endpoint.get<any>(url);
  }


  UserSearchFilter(searchId) {
    const url = this._getSaveUserSearchURL+ searchId;
    return this.endpoint.get<any>(url);
  }

  getSitesByTeamContact(organizationContactId) {
    const url = this._getSitesByTeamContactURL + "?organizationContactId=" + organizationContactId;
    return this.endpoint.get<SiteInfo[]>(url);
  }

  GetSiteDashboardData1(siteInfoId) {
    const url = this._getSiteDashboardData1URL + "?siteInfoId=" + siteInfoId;
    return this.endpoint.get<SiteDashboardViewModel>(url);
  }

}

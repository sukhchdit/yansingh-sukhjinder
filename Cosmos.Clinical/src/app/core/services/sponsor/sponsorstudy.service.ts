import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/account/services/auth.service';
import { SignPad } from 'src/app/models/document/Signpad.model';
import { OrganizationInfo } from 'src/app/models/organization/organizationinfo.model';
import { SponsorSiteStudyCDAInvitation } from 'src/app/models/sponsor/sponsorsitestudycdainvitation.model';
import { SponsorSiteStudyDocument } from 'src/app/models/sponsor/sponsorsitestudydocument.model';
import { SponsorStudyDocument } from 'src/app/models/sponsor/sponsorstudydocument.model';
import { SponsorStudyInfo, SponsorStudyStatus } from 'src/app/models/sponsor/sponsorstudyinfo.model';
import { SponsorStudyTeam } from 'src/app/models/sponsor/sponsorstudyteam.model';
import { SponsorStudyAuditViewmodel } from 'src/app/models/viewmodels/sponsor/sponsorstudyauditviewmodel.model';
import { SiteStudyCdaListViewModel } from 'src/app/viewmodels/site/sitestudycdalist.viewmodel';
import { SponsorSiteStudyDocumentViewModel } from 'src/app/viewmodels/sponsor/sponsorsitestudydocument.viewmodel';
import { SponsorStudyCdaListViewModel } from 'src/app/viewmodels/sponsor/sponsorstudycdalist.viewmodel';
import { SponsorStudyInfoViewModel } from 'src/app/viewmodels/sponsor/sponsorstudyinfo.viewmodel';
import { StudyDetailsForDashboardViewModel } from 'src/app/viewmodels/study/studydetailsfordashboard.viewmodel';
import { environment } from 'src/environments/environment';


@Injectable()
export class SponsorStudyService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/SponsorStudy";
  private readonly _getSponsorStudyURL: string = this._baseApiUrl + "/GetSponsorStudy";
  private readonly _getSponsorStudyForSiteURL: string = this._baseApiUrl + "/GetSponsorStudyForSite";
  private readonly _getAllSponsorStudyURL: string = this._baseApiUrl + "/GetAllSponsorStudy";
  private readonly _getAllActiveSponsorStudyInfosURL: string = this._baseApiUrl + "/GetAllActiveSponsorStudyInfos";
  private readonly _getAllSponsorStudyViewModelURL: string = this._baseApiUrl + "/GetAllSponsorStudyViewModel";
  private readonly _getAllSponsorCreatedURL: string = this._baseApiUrl + "/GetAllSponsorCreated";
  private readonly _saveSponsorStudyURL: string = this._baseApiUrl + "/SaveSponsorStudy";
  private readonly _deleteSponsorStudyURL: string = this._baseApiUrl + "/DeleteSponsorStudy";

  private readonly _getAllSponsorStudyTeamURL: string = this._baseApiUrl + "/GetAllSponsorStudyTeam";
  private readonly _saveSponsorStudyTeamURL: string = this._baseApiUrl + "/SaveSponsorStudyTeam";

  private readonly _getAllSponsorStudyDocumentURL: string = this._baseApiUrl + "/GetAllSponsorStudyDocument";
  private readonly _getSponsorStudyDocumentURL: string = this._baseApiUrl + "/GetSponsorStudyDocument";
  private readonly _saveSponsorStudyDocumentURL: string = this._baseApiUrl + "/SaveSponsorStudyDocument";
  private readonly _updateSponsorStudyDocumentTemplateReadyURL: string = this._baseApiUrl + "/UpdateSponsorStudyDocumentTemplateReady";
  private readonly _createStudyCdaTemplateURL: string = this._baseApiUrl + "/CreateStudyCdaTemplate";
  private readonly _uploadSponsorStudyDocumentURL: string = this._baseApiUrl + "/UploadStudyDocument";
  private readonly _deleteSponsorStudyDocumentURL: string = this._baseApiUrl + "/DeleteUploadedStudyDocument";
  private readonly _downloadSponsorStudyDocumentURL: string = this._baseApiUrl + "/DownloadStudyDocument";
  private readonly _downloadSponsorCdaFileURL: string = this._baseApiUrl + "/DownloadSponsorCdaFile";

  private readonly _createSponsorSiteStudyCDAInvitationForSponsorURL: string = this._baseApiUrl + "/SaveSponsorSiteStudyCDAInvitationForSponsor";
  private readonly _createSponsorSiteStudyCDAInvitationURL: string = this._baseApiUrl + "/SaveSponsorSiteStudyCDAInvitation";
  private readonly _getSponsorStudyByStudyStatusURL: string = this._baseApiUrl + "/GetSponsorStudyByStudyStatus";
  private readonly _checkSponsorSiteStudyCDAInvitationSentURL: string = this._baseApiUrl + "/CheckSponsorSiteStudyCDAInvitationSent";
  private readonly _getSponsorStudyCDAInvitationListURL: string = this._baseApiUrl + "/GetSponsorStudyCDAInvitationList";
  private readonly _getSponsorStudyCDAInvitationListByBudgetVersionURL: string = this._baseApiUrl + "/GetSponsorStudyCDAInvitationListByBudgetVersion";
  private readonly _getSponsorStudyListByBudgetVersionURL: string = this._baseApiUrl + "/GetSponsorStudyListByBudgetVersion";
  private readonly _getSiteStudyCDAInvitationListURL: string = this._baseApiUrl + "/GetSiteStudyCDAInvitationList";
  private readonly _getOrganizationContactStudyWhereTeamMemberIsBlindURL: string = this._baseApiUrl + "/GetOrganizationContactStudyWhereTeamMemberIsBlind";
  private readonly _getOrganizationContactSponsorSiteStudyCDAInvitationStudiesURL: string = this._baseApiUrl + "/GetOrganizationContactSponsorSiteStudyCDAInvitationStudy";

  private readonly _updateSponsorSiteStudyCDAInvitationStatusURL: string = this._baseApiUrl + "/UpdateSponsorSiteStudyCDAInvitationStatus";
  private readonly _updateSponsorSiteStudyCDAAttemptedStatusURL: string = this._baseApiUrl + "/UpdateSponsorSiteStudyCDAAttemptedStatus";
  private readonly _updateSponsorSiteStudyCDAInvitationSiteNumberURL: string = this._baseApiUrl + "/UpdateSponsorSiteStudyCDAInvitationSiteNumber";
  private readonly _updateSiteStudyStatusURL: string = this._baseApiUrl + "/UpdateSiteStudyStatus";
  private readonly _deleteSponsorSiteStudyCDAInvitationURL: string = this._baseApiUrl + "/DeleteSponsorSiteStudyCDAInvitation";

  private readonly _updateSendeDiaryURL: string = this._baseApiUrl + "/UpdateSendeDiary";
  
  private readonly _getAllSponsorSiteStudyDocumentURL: string = this._baseApiUrl + "/GetAllSponsorSiteStudyDocument";
  private readonly _saveSponsorSiteStudyDocumentURL: string = this._baseApiUrl + "/SaveSponsorSiteStudyDocument";
  private readonly _deleteSponsorSiteStudyDocumentURL: string = this._baseApiUrl + "/DeleteSponsorSiteStudyDocument";
  private readonly _getAllSponsorSiteStudyDocumentViewModelURL: string = this._baseApiUrl + "/GetAllSponsorSiteStudyDocumentViewModel";

  private readonly _getInvestigatorStudyInvitationListURL: string = this._baseApiUrl + "/GetInvestigatorStudyInvitationList";
  private readonly _getStudyListForStudyTeamMembertURL: string = this._baseApiUrl + "/GetStudyListForStudyTeamMember";
  private readonly _getAllSponsorSiteStudyCDAInvitationListURL: string = this._baseApiUrl + "/GetAllSponsorSiteStudyCDAInvitationList";
  private readonly _getSponsorSiteStudyCDAInvitationURL: string = this._baseApiUrl + "/GetSponsorSiteStudyCDAInvitation";
  private readonly _getAllSponsorStudyAuditsURL: string = this._baseApiUrl + "/GetAllSponsorStudyAudit";

  private readonly _saveStudyTeamURL: string = this._baseApiUrl + "/SaveStudyTeam";
  private readonly _createSponsorCroStudyTeamURL: string = this._baseApiUrl + "/CreateSponsorCroStudyTeam";
  private readonly _getStudyTeamURL: string = this._baseApiUrl + "/GetStudyTeam";
  private readonly _getStudyTeamByOrganizationURL: string = this._baseApiUrl + "/GetStudyTeamByOrganization";
  private readonly _getSiteStudyTeamURL: string = this._baseApiUrl + "/GetSiteStudyTeam";
  private readonly _deleteStudyTeamMemberURL: string = this._baseApiUrl + "/DeleteStudyTeamMember";
  private readonly _getOrganizationContactStudyURL: string = this._baseApiUrl + "/GetOrganizationContactStudy";
  private readonly _updateSponsorStudyTeamIsBlindURL: string = this._baseApiUrl + "/UpdateSponsorStudyTeamIsBlind";
  private readonly _updateSponsorStudyTeamIseRegURL: string = this._baseApiUrl + "/UpdateSponsorStudyTeamIseReg";
  private readonly _updateSponsorStudyTeamIseSourceURL: string = this._baseApiUrl + "/UpdateSponsorStudyTeamIseSource";
  private readonly _updateSponsorStudyTeamIseDiaryURL: string = this._baseApiUrl + "/UpdateSponsorStudyTeamIseDiary";
  private readonly _updateSponsorStudyTeamIsCheckedURL: string = this._baseApiUrl + "/UpdateSponsorStudyTeamIsChecked";

  private readonly _getSponsorOrganizationInfoURL: string = this._baseApiUrl + "/GetSponsorOrganizationInfo";
  private readonly _getActiveSiteStudyListURL: string = this._baseApiUrl + "/GetAllActiveSiteStudyList";
  private readonly _getBysponsorSiteStudyCDAInvitationIdURL: string = this._baseApiUrl + "/GetBysponsorSiteStudyCDAInvitationId";
  private readonly _checkProtocolNumberExistsURL: string = this._baseApiUrl + "/CheckProtocolNumberExists";
  private readonly _checkSiteNumberExistsURL: string = this._baseApiUrl + "/CheckSiteNumberExists";
  private readonly _getStudyInvestigatorsURL: string = this._baseApiUrl + "/GetStudyInvestigators";
  private readonly _getStudyTeamBySponsorSiteStudyCDAInvitationIdURL: string = this._baseApiUrl + "/GetStudyTeamBySponsorSiteStudyCDAInvitationId";
  private readonly _getStudyDetailsForDashboardURL: string = this._baseApiUrl + "/GetStudyDetailsForDashboard";
  private readonly _getSponsorSiteStudyCDAInvitationByVisitTrackingIdURL: string = this._baseApiUrl + "/GetSponsorSiteStudyCDAInvitationByVisitTrackingId";
  private readonly _getStudyDetailsByTeamContactURL: string = this._baseApiUrl + "/GetStudyDetailsByTeamContact";

  private readonly _addDigitalSignatureURL: string = "api/SignaturePad/AddDigitalSignature";

  private readonly _getAllSiteForStudyURL: string = this._baseApiUrl + "/GetSponserSiteStudyCDAInvitationBySponsorStudyInfoId";
  private readonly _getContactStudyRolesURL: string = this._baseApiUrl + "/GetContactStudyRoles";
  

  constructor(private endpoint: EndPointService, private httpClient: HttpClient, private authService: AuthService) { }

  deleteStudyTeamMember(teamId) {
    return this.endpoint.get<any[]>(this._deleteStudyTeamMemberURL + "?id=" + teamId);
  }

  getStudyInvestigators(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<any[]>(this._getStudyInvestigatorsURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  getOrganizationContactStudy(organizationContactId) {
    return this.endpoint.get<any[]>(this._getOrganizationContactStudyURL + "?organizationContactId=" + organizationContactId);
  }

  getStudyListForStudyTeamMember(organizationContactId) {
    return this.endpoint.get<any[]>(this._getStudyListForStudyTeamMembertURL + "?organizationContactId=" + organizationContactId);
  }

  getStudyTeamBySponsorSiteStudyCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<any[]>(this._getStudyTeamBySponsorSiteStudyCDAInvitationIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  getOrganizationContactStudyWhereTeamMemberIsBlind(organizationContactId) {
    return this.endpoint.get<any[]>(this._getOrganizationContactStudyWhereTeamMemberIsBlindURL + "?organizationContactId=" + organizationContactId);
  }

  getOrganizationContactSponsorSiteStudyCDAInvitationStudies(organizationContactId) {
    return this.endpoint.get<any[]>(this._getOrganizationContactSponsorSiteStudyCDAInvitationStudiesURL + "?organizationContactId=" + organizationContactId);
  }
  
  getStudyTeam(organizationId, studyId) {
    return this.endpoint.get<any[]>(this._getStudyTeamURL + "?organizationId=" + organizationId + "&studyId=" + studyId);
  }

  getStudyTeamByOrganization(organizationType, sponsorStudyInfoId) {
    return this.endpoint.get<any[]>(this._getStudyTeamByOrganizationURL + "?organizationType=" + organizationType + "&sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  getSiteStudyTeam(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<any[]>(this._getSiteStudyTeamURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  saveStudyTeam(studyTeam: SponsorStudyTeam) {
    if (studyTeam.id <= 0 || studyTeam.id == undefined)
      studyTeam.createdBy = this.authService.currentUser.id;
    studyTeam.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorStudyTeam>(studyTeam, this._saveStudyTeamURL);
  }

  createSponsorCroStudyTeam(studyTeam: SponsorStudyTeam) {
    if (studyTeam.id <= 0 || studyTeam.id == undefined)
      studyTeam.createdBy = this.authService.currentUser.id;
    studyTeam.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorStudyTeam>(studyTeam, this._createSponsorCroStudyTeamURL);
  }

  updateSponsorStudyTeamIsBlind(studyTeam: SponsorStudyTeam) {
    return this.endpoint.addupdate<boolean>(studyTeam, this._updateSponsorStudyTeamIsBlindURL);
  }

  updateSponsorStudyTeamIseReg(studyTeam: SponsorStudyTeam) {
    return this.endpoint.addupdate<boolean>(studyTeam, this._updateSponsorStudyTeamIseRegURL);
  }

  updateSponsorStudyTeamIseSource(studyTeam: SponsorStudyTeam) {
    return this.endpoint.addupdate<boolean>(studyTeam, this._updateSponsorStudyTeamIseSourceURL);
  }

  updateSponsorStudyTeamIseDiary(studyTeam: SponsorStudyTeam) {
    return this.endpoint.addupdate<boolean>(studyTeam, this._updateSponsorStudyTeamIseDiaryURL);
  }

  updateSponsorStudyTeamIsChecked(id, isChecked, option) {
    var url = this._updateSponsorStudyTeamIsCheckedURL + "?id=" + id + "&isChecked=" + isChecked + "&option=" + option;
    return this.endpoint.get<boolean>(url);
  }

  get(id) {
    const url = this._getSponsorStudyURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyInfo>(url);
  }

  getForSite(sponsorStudyInfoId) {
    const url = this._getSponsorStudyForSiteURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<SponsorStudyInfo>(url);
  }

  getAll(sponsorInfoId) {
    return this.endpoint.get<SponsorStudyInfo[]>(this._getAllSponsorStudyURL + "?sponsorInfoId=" + sponsorInfoId);
  }

  getAllActiveSponsorStudyInfos(sponsorInfoId) {
    return this.endpoint.get<SponsorStudyInfo[]>(this._getAllActiveSponsorStudyInfosURL + "?sponsorInfoId=" + sponsorInfoId);
  }

  getAllViewModel(sponsorInfoId) {
    return this.endpoint.get<SponsorStudyInfoViewModel[]>(this._getAllSponsorStudyViewModelURL + "?sponsorInfoId=" + sponsorInfoId);
  }

  getAllSponsorCreated(sponsorInfoId) {
    return this.endpoint.get<SponsorStudyInfoViewModel[]>(this._getAllSponsorCreatedURL + "?sponsorInfoId=" + sponsorInfoId);
  }

  save(sponsor: SponsorStudyInfo) {
    if (sponsor.id <= 0 || sponsor.id == undefined)
      sponsor.createdBy = this.authService.currentUser.id;
    sponsor.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorStudyInfo>(sponsor, this._saveSponsorStudyURL);
  }

  delete(id) {
    const url = this._deleteSponsorStudyURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getAllSponsorStudyTeam(sponsorStudyInfoId) {
    const url = this._getAllSponsorStudyTeamURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<SponsorStudyTeam[]>(url);
  }

  getAllSponsorStudyAudits(sponsorStudyInfoId) {
    const url = this._getAllSponsorStudyAuditsURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<SponsorStudyAuditViewmodel[]>(url);
  }

  getSponsorStudyByStudyStatus(sponsorInfoId: number,  studyStatus: SponsorStudyStatus) {
    const url = this._getSponsorStudyByStudyStatusURL + "?studySponsorInfoId="+sponsorInfoId+"&status=" + studyStatus;
    return this.endpoint.get<SponsorStudyInfo[]>(url);
  }

  saveSponsorStudyTeam(sponsorStudyTeamData) {
    sponsorStudyTeamData.forEach(x => {
      if (x.sponsorStudyTeam.id <= 0 || x.sponsorStudyTeam.id == undefined)
        x.sponsorStudyTeam.createdBy = this.authService.currentUser.id;
      x.sponsorStudyTeam.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate(sponsorStudyTeamData, this._saveSponsorStudyTeamURL);
  }

  getAllSponsorStudyDocument(sponsorStudyInfoId) {
    const url = this._getAllSponsorStudyDocumentURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<SponsorStudyDocument[]>(url);
  }

  getSponsorStudyDocument(sponsorStudyDocumentId) {
    const url = this._getSponsorStudyDocumentURL + "?sponsorStudyDocumentId=" + sponsorStudyDocumentId;
    return this.endpoint.get<SponsorStudyDocument>(url);
  }

  createStudyCdaTemplate(sponsorStudyInfoId) {
    const url = this._createStudyCdaTemplateURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<number>(url);
  }

  UpdateSponsorStudyDocumentTemplateReady(id) {
    const url = this._updateSponsorStudyDocumentTemplateReadyURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  saveSponsorStudyDocument(sponsorStudyDocumentData) {
    sponsorStudyDocumentData.forEach(x => {
      if (x.sponsorStudyDocument.id <= 0 || x.sponsorStudyDocument.id == undefined)
        x.sponsorStudyDocument.createdBy = this.authService.currentUser.id;
      x.sponsorStudyDocument.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate(sponsorStudyDocumentData, this._saveSponsorStudyDocumentURL);
  }

  uploadStudyDocument(formData) {
    const url = this._uploadSponsorStudyDocumentURL;
    //return this.httpClient.post(url, formData, { reportProgress: true, observe: 'events' });
    return this.endpoint.uploadFile(formData, url);
  }

  DeleteUploadedLicenseFile(model) {
    return this.endpoint.addupdate<any>(model, this._deleteSponsorStudyDocumentURL);
  }

  downloadStudyDocument(fileName) {
    var url = this.port + this._downloadSponsorStudyDocumentURL + "?fileName=" + fileName;
    this.httpClient.get(url, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
        saveAs(data, fileName);
      }, err => {
        //console.log(err);
      });
  }

  downloadSponsorCdaFile(sponsorStudyDocumentId) {

    const url = this.port + this._downloadSponsorCdaFileURL + "?sponsorStudyDocumentId=" + sponsorStudyDocumentId;
    return this.httpClient.post(url, null, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  saveSponsorSiteStudyCDAInvitationForSponsor(model: SponsorSiteStudyCDAInvitation) {
    if (model.id <= 0 || model.id == undefined)
      model.createdBy = this.authService.currentUser.id;
    model.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorSiteStudyCDAInvitation>(model, this._createSponsorSiteStudyCDAInvitationForSponsorURL);
  }

  saveSponsorSiteStudyCDAInvitation(model: SponsorSiteStudyCDAInvitation) {
    if (model.id <= 0 || model.id == undefined)
      model.createdBy = this.authService.currentUser.id;
    model.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorSiteStudyCDAInvitation>(model, this._createSponsorSiteStudyCDAInvitationURL);
  }

  checkSponsorSiteStudyCDAInvitationSent(sponsorStudyInfoId, siteInfoId, investigatorInfoId) {
    const url = this._checkSponsorSiteStudyCDAInvitationSentURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&siteInfoId=" + siteInfoId + "&investigatorInfoId=" + investigatorInfoId;
    return this.endpoint.get<SponsorSiteStudyCDAInvitation>(url);
  }

  getSponsorSiteStudyCDAInvitationByVisitTrackingId(studyVisitTrackingId) {
    const url = this._getSponsorSiteStudyCDAInvitationByVisitTrackingIdURL + "?studyVisitTrackingId=" + studyVisitTrackingId;
    return this.endpoint.get<SponsorSiteStudyCDAInvitation>(url);
  }

  getSponsorStudyCDAInvitationList(sponsorStudyInfoId) {
    const url = this._getSponsorStudyCDAInvitationListURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<SponsorStudyCdaListViewModel[]>(url);
  }

  getSponsorStudyCDAInvitationListByBudgetVersion(sponsorStudyInfoId, studyProcedureBudgetVersionId) {
    const url = this._getSponsorStudyCDAInvitationListByBudgetVersionURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&studyProcedureBudgetVersionId=" + studyProcedureBudgetVersionId;
    return this.endpoint.get<SponsorStudyCdaListViewModel[]>(url);
  }

  getSponsorStudyListByBudgetVersion(sponsorStudyInfoId, studyProcedureBudgetVersionId) {
    const url = this._getSponsorStudyListByBudgetVersionURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&studyProcedureBudgetVersionId=" + studyProcedureBudgetVersionId;
    return this.endpoint.get<SponsorStudyCdaListViewModel[]>(url);
  }

  getSiteStudyCDAInvitationList(siteInfoId, invitationStatus) {
    // invitationStatus=2 (All Active Studies)
    const url = this._getSiteStudyCDAInvitationListURL + "?siteInfoId=" + siteInfoId + "&invitationStatus=" + invitationStatus;
    return this.endpoint.get<SiteStudyCdaListViewModel[]>(url);
  }

  getActiveSiteStudyList(siteInfoId, invitationStatus) {
    // invitationStatus=2 (All Active Studies)
    const url = this._getActiveSiteStudyListURL + "?siteInfoId=" + siteInfoId + "&invitationStatus=" + invitationStatus;
    return this.endpoint.get<SiteStudyCdaListViewModel[]>(url);
  }

  getAllSponsorSiteStudyDocument(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<SponsorStudyInfo[]>(this._getAllSponsorSiteStudyDocumentURL+ "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  saveSponsorSiteStudyDocument(sponsor: SponsorSiteStudyDocument) {
    if (sponsor.id <= 0 || sponsor.id == undefined)
      sponsor.createdBy = this.authService.currentUser.id;
    sponsor.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorSiteStudyDocument>(sponsor, this._saveSponsorSiteStudyDocumentURL);
  }

  updateSponsorSiteStudyCDAInvitationStatus(data: SponsorSiteStudyCDAInvitation) {
    return this.endpoint.addupdate<SponsorSiteStudyDocument>(data, this._updateSponsorSiteStudyCDAInvitationStatusURL);
  }

  updateSiteStudyStatus(id, status) {
    return this.endpoint.addupdate<boolean>(null, this._updateSiteStudyStatusURL + "?id=" + id + "&status=" + status);
  }

  updateSponsorSiteStudyCDAInvitationSiteNumber(data: SponsorSiteStudyCDAInvitation) {
    return this.endpoint.addupdate<boolean>(data, this._updateSponsorSiteStudyCDAInvitationSiteNumberURL);
  }

  updateSendeDiary(id, sendeDiary) {
    var url = this._updateSendeDiaryURL + "?id=" + id + "&sendeDiary=" + sendeDiary;
    return this.endpoint.get<boolean>(url);
  }

  updateSponsorSiteStudyCDAAttemptedStatus(id, status) {
    let url = this._updateSponsorSiteStudyCDAAttemptedStatusURL + "?id=" + id + "&status=" + status;
    return this.endpoint.addupdate<SponsorSiteStudyDocument>(null, url);
  }

  deleteSponsorSiteStudyCDAInvitation(sponsorSiteStudyCDAInvitationId) {
    let url = this._deleteSponsorSiteStudyCDAInvitationURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.addupdate<boolean>(null, url);
  }

  deleteSponsorSiteStudyDocumen(id) {
    const url = this._deleteSponsorSiteStudyDocumentURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getAllSponsorSiteStudyDocumentViewModel(sponsorStudyInfoId, sponsorSiteStudyCDAInvitationId) {
    var url = this._getAllSponsorSiteStudyDocumentViewModelURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<SponsorSiteStudyDocumentViewModel[]>(url);
  }

  getInvestigatorStudyInvitationList(investigatorInfoId, invitationStatus) {
    var url = this._getInvestigatorStudyInvitationListURL + "?investigatorInfoId=" + investigatorInfoId + "&invitationStatus=" + invitationStatus;
    return this.endpoint.get<SiteStudyCdaListViewModel[]>(url);
  }

  GetAllSponsorSiteStudyCDAInvitationList() {
    return this.endpoint.get<SiteStudyCdaListViewModel[]>(this._getAllSponsorSiteStudyCDAInvitationListURL);
  }

  GetSponsorSiteStudyCDAInvitation(id) {
    var url = this._getSponsorSiteStudyCDAInvitationURL + "?id=" + id;
    return this.endpoint.get<SponsorSiteStudyCDAInvitation>(url);
  }

  getSponsorOrganizationInfo(sponsorStudyInfoId) {
    var url = this._getSponsorOrganizationInfoURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<OrganizationInfo>(url);
  }
  saveSignaturePad(data: SignPad, signOffDateStamp, signByName: string = null) {
    //console.log(data);
    return this.endpoint.addupdate<boolean>(data, "api/DocumentMaster/SaveSignature?signOffDateStamp=" + signOffDateStamp + "&signedByName=" + signByName);
  }

  addDigitalSignature(path) {
    //var url = this._addDigitalSignatureURL + "?path=" + path;
    //return this.endpoint.addupdate<boolean>(url);
    return this.endpoint.addupdate<boolean>(null, this._addDigitalSignatureURL + "?path=" + path);
  }

  getBysponsorSiteStudyCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    var url = this._getBysponsorSiteStudyCDAInvitationIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<SponsorStudyInfo>(url);
  }

  checkProtocolNumberExists(id, protocolNumber) {
    var url = this._checkProtocolNumberExistsURL + "?id=" + id + "&protocolNumber=" + protocolNumber;
    return this.endpoint.get<SponsorStudyInfo>(url);
  }

  checkSiteNumberExists(id, siteNumber) {
    var url = this._checkSiteNumberExistsURL + "?id=" + id + "&siteNumber=" + siteNumber;
    return this.endpoint.get<SponsorStudyInfo>(url);
  }

  getStudyDetailsForDashboard(siteInfoId) {
    var url = this._getStudyDetailsForDashboardURL + "?siteInfoId=" + siteInfoId;
    return this.endpoint.get<StudyDetailsForDashboardViewModel[]>(url);
  }

  getAllSiteForStudy(sponsorStudyInfoId) {
    return this.endpoint.get<SponsorStudyInfoViewModel[]>(this._getAllSiteForStudyURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  getStudyDetailsByTeamContact(organizationContactId) {
    var url = this._getStudyDetailsByTeamContactURL + "?organizationContactId=" + organizationContactId;
    return this.endpoint.get<SponsorSiteStudyCDAInvitation[]>(url);
  }

  getContactStudyRoles(organizationContactId) {
    var url = this._getContactStudyRolesURL + "?organizationContactId=" + organizationContactId;
    return this.endpoint.get<any[]>(url);
  }
}

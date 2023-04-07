export class StudyCenterService {

}
//////===================================================================================== Imports ===============================================================//
////import { Injectable } from '@angular/core';
////import { HttpClient, HttpHeaders } from '@angular/common/http';
////import { saveAs } from 'file-saver';
////import { environment } from 'src/environments/environment';
////import { AnyMxRecord } from 'dns';
////import { EndPointService } from '../endpoint.service';
////import { Role } from 'src/app/models/role.model';
////import { State } from '../../../models/common/state.model';
////import { StudyTeamContact } from '../../../models/studycenter/studyteamcontact.model';
////import { StudyTeamContactViewModel } from '../../../viewmodels/studycenter/studyteamcontactviewmodel.model';
////import { BulkSaveStudyTeamContactResponseViewModel } from 'src/app/viewmodels/studycenter/bulksavestudyteamcontactresponseviewmodel.model';
////import { StudyCenterFaq, StudyCenterFaqHistory } from '../../../models/studycenter/studycenterfaq.model';
////import { StudyCenterFaqViewModel } from '../../../viewmodels/studycenter/studycenterfaqviewmodel.model';
////import { StudyUrl, StudyUrlHistory } from '../../../models/studycenter/studyurl.model';
////import { StudyUrlViewModel } from '../../../viewmodels/studycenter/studyurlviewmodel.model';
////import { SitesViewModel } from '../../../viewmodels/studycenter/sitesviewmodel.model';
////import { MySiteViewModel } from '../../../viewmodels/studycenter/mysiteviewmodel.model';
////import { StudySite } from '../../../models/studycenter/studysite.model';
////import { BulkSaveStudySiteResponseViewModel } from 'src/app/viewmodels/studycenter/bulksavestudysiteresponseviewmodel.model';
////import { SiteInfo } from '../../../models/site/siteinfo.model';
////import { StudyCenterTraining, TrainingRoleMapping, TrainingUserMapping } from '../../../models/studycenter/studycentertraining.model';
////import { StudyCenterTrainingViewModel } from '../../../viewmodels/studycenter/studycentertrainingviewmodel.model';
////import { ComplianceTrainingViewModel, TrainingRoles } from '../../../viewmodels/studycenter/compliancetrainingviewmodel.model';
////import { TitleMaster } from 'src/app/models/common/titlemaster.model';
////import { TrainingRoleMappingViewModel } from '../../../viewmodels/studycenter/trainingrolemappingviewmodel.model';
////import { StudyCenterHistory } from '../../../models/studycenter/studycenterhistory.model';
////@Injectable({
////  providedIn: 'root'
////})
////export class StudyCenterService {
////  port = environment.apiport;
////  private readonly _baseApiUrl: string = "api/StudyCenter/";

////  //===================================================================================== Common ===============================================================//
////  private readonly _getStudyCenterHistoryURL: string = this._baseApiUrl + "GetStudyCenterHistory";

////  //===================================================================================== Study Team Contact ========================================================//
////  private readonly _downloadStudyTeamContactSampleFileURL: string = this._baseApiUrl + "DownloadStudyTeamContactSampleFormat";
////  private readonly _saveStudyTeamContactURL: string = this._baseApiUrl + "SaveStudyTeamContact";
////  private readonly _uploadHeadshotURL: string = this._baseApiUrl + "UploadContactHeadshot";
////  private readonly _getAllStudyTeamContactURL: string = this._baseApiUrl + "GetAllStudyTeamContacts";
////  private readonly _getStudyTeamContactURL: string = this._baseApiUrl + "GetStudyTeamContact";
////  private readonly _bulkSaveURL: string = this._baseApiUrl + "BulkSave";
////  private readonly _getRolesURL: string = this._baseApiUrl + "GetAllRolesByType";
////  private readonly _getStatesURL: string = this._baseApiUrl + "GetAllStates";
////  private readonly _checkEmailURL: string = this._baseApiUrl + "CheckEmailExists";
////  private readonly _getContactHistoryURL: string = this._baseApiUrl + "GetContactHistory";
////  private readonly _updateContactStatusURL: string = this._baseApiUrl + "UpdateContactStatus";
////  private readonly _contactUploadURL: string = this._baseApiUrl + "ContactUpload";
////  //===================================================================================== Study Team Sites ===========================================================//
////  private readonly _downloadSitesSampleFileURL: string = this._baseApiUrl + "DownloadSitesSampleFormat";
////  private readonly _getAllSitesURL: string = this._baseApiUrl + "GetAllSites";
////  private readonly _bulkSaveSitesURL: string = this._baseApiUrl + "BulkSaveSites";
////  private readonly _updateSiteStatusURL: string = this._baseApiUrl + "UpdateSiteStatus";
////  private readonly _getStudySiteURL: string = this._baseApiUrl + "GetStudySite";
////  private readonly _saveStudySiteURL: string = this._baseApiUrl + "SaveStudySite";
//////===================================================================================== Study Team My Site =====================================================//
////  private readonly _getMySiteURL: string = this._baseApiUrl + "GetMySite";
////   //===================================================================================== FAQ ===============================================================//
////  private readonly _saveStudyCenterFaqURL: string = this._baseApiUrl + "SaveStudyCenterFaq";
////  private readonly _getStudyCenterFaqURL: string = this._baseApiUrl + "GetStudyCenterFaq";
////  private readonly _getAllStudyCenterFaqsURL: string = this._baseApiUrl + "GetAllStudyCenterFaqs";
////  private readonly _deleteStudyCenterFaqURL: string = this._baseApiUrl + "DeleteStudyCenterFaq";
////  private readonly _updateStudyCenterFaqStatusURL: string = this._baseApiUrl + "UpdateFaqStatus";  
////  //===================================================================================== Study Url ===============================================================//
////  private readonly _saveStudyUrlURL: string = this._baseApiUrl + "SaveStudyUrl";
////  private readonly _getStudyUrlURL: string = this._baseApiUrl + "GetStudyUrl";
////  private readonly _getAllStudyUrlsURL: string = this._baseApiUrl + "GetAllStudyUrls";
////  private readonly _deleteStudyUrlURL: string = this._baseApiUrl + "DeleteStudyUrl";
////  private readonly _updateStudyUrlStatusURL: string = this._baseApiUrl + "UpdateStudyUrlStatus";
////  private readonly _getStudyUrlHistoryURL: string = this._baseApiUrl + "GetStudyUrlHistory";
//// //===================================================================================== Training ===============================================================//
////  private readonly _saveStudyCenterTrainingURL: string = this._baseApiUrl + "SaveStudyCenterTraining";
////  private readonly _getStudyCenterTrainingURL: string = this._baseApiUrl + "GetStudyCenterTraining";
////  private readonly _getAllStudyCenterTrainingsURL: string = this._baseApiUrl + "GetAllAvailableTraining";
////  private readonly _deleteStudyCenterTrainingURL: string = this._baseApiUrl + "DeleteStudyCenterTraining";
////  private readonly _updateStudyCenterTrainingStatusURL: string = this._baseApiUrl + "UpdateTraningStatus";
////  private readonly _uploadStudyCenterTrainingMaterialURL: string = this._baseApiUrl + "UploadStudyCenterTrainingMaterial";
////  private readonly _fillSiteNumbersURL: string = this._baseApiUrl + "FillSiteNumbers";
////  private readonly _getAllComplianceTrainingURL: string = this._baseApiUrl + "GetAllComplianceTrainings";
////  private readonly _createTrainingRoleMappingURL: string = this._baseApiUrl + "CreateTrainingRoleMapping";
////  private readonly _geTrainingRoleMappingsURL: string = this._baseApiUrl + "GeTrainingRoleMappings";
////  private readonly _deleteTrainingRoleMappingURL: string = this._baseApiUrl + "DeleteTrainingRoleMapping";
////  private readonly _updateTraningCompletionStatusURL: string = this._baseApiUrl + "UpdateTraningCompletionStatus";
////  private readonly _getTrainingRolesURL: string = this._baseApiUrl + "GetTrainingRoles";
////  private readonly _getMappingTrainingsURL: string = this._baseApiUrl + "GetMappingTrainings";
////  //===================================================================================== News ===============================================================//
////  constructor(
////    private httpClient: HttpClient,
////    private authService: AuthService,
////    private endpoint: EndPointService
////  ) { }

////  private getHeaders() {
////    return new HttpHeaders({
////      'Authorization': 'Bearer ' + this.authService.accessToken,
////    });
////  }

////  //===================================================================================== Common ===============================================================//
////  getStudyCenterHistory(historyTypeId: number, historyType:string) {
////    return this.endpoint.get<StudyCenterHistory[]>(this._getStudyCenterHistoryURL + "?historyTypeId=" + historyTypeId + "&historyType=" + historyType);
////  }

////  //===================================================================================== Study Team Contact ========================================================//
////  downloadStudyTeamContactSampleFormat() {
////    var url = this.port + this._downloadStudyTeamContactSampleFileURL;
////    this.httpClient.post(url, null, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
////      saveAs(data, 'Study_Contact_Bulk_Upload.csv');
////    }, (err) => {
////      //console.log(err);
////    });
////  }

////  saveContact(studyTeamContact: StudyTeamContact) {
////    if (studyTeamContact.id <= 0 || studyTeamContact.id == undefined || studyTeamContact.id == null || studyTeamContact.createdBy <= 0 || studyTeamContact.createdBy == null || studyTeamContact.createdBy == undefined)
////      studyTeamContact.createdBy = this.authService.currentUser.id;
////    studyTeamContact.updatedBy = this.authService.currentUser.id;
////    return this.endpoint.addupdate<any>(studyTeamContact, this._saveStudyTeamContactURL);
////  }

////  uploadHeadshot(formData) {
////    var url = this.port + this._uploadHeadshotURL;
////    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
////  }

////  getAllContact(studyId: number, countryIds: string[]) {
////    return this.endpoint.addupdate<StudyTeamContactViewModel[]>(countryIds, this._getAllStudyTeamContactURL + "?studyId=" + studyId);
////  }

////  getContact(id) {
////    const url = this._getStudyTeamContactURL + "?id=" + id;
////    return this.endpoint.get<StudyTeamContact>(url);
////  }

////  updateContactStatus(contact: StudyTeamContact) {
////    contact.status = true;
////    contact.createdBy = contact.updatedBy = this.authService.currentUser.id;
////    contact.updatedOn = new Date();
////    return this.endpoint.addupdate<StudyTeamContact>(contact, this._updateContactStatusURL);
////  }

////  bulkSave(studyContacts: StudyTeamContact[]) {
////    studyContacts.forEach(studyContact => {
////      if (studyContact.id <= 0 || studyContact.id == null || studyContact.id == undefined)
////        studyContact.createdBy = this.authService.currentUser.id;
////      studyContact.updatedBy = this.authService.currentUser.id;
////    });
////    return this.endpoint.addupdate<BulkSaveStudyTeamContactResponseViewModel>(studyContacts, this._bulkSaveURL);
////  }

////  contactUpload(formData) {
////    var url = this.port + this._contactUploadURL;
////    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
////  }

////  getRoles() {
////    const url = this._getRolesURL;
////    return this.endpoint.get<Role[]>(url);
////  }

////  getStates() {
////    return this.endpoint.get<State[]>(this._getStatesURL);
////  }

////  checkEmail(email: string, id: any) {
////    const url = this._checkEmailURL + "?email=" + email + "&id=" + id;
////    return this.endpoint.get<boolean>(url);
////  }

////  getContactHistory(id) {
////    return this.endpoint.get<StudyCenterFaqHistory[]>(this._getContactHistoryURL + "?id=" + id);
////  }

//////===================================================================================== Study Team Sites ===========================================================//
////  downloadSitesSampleFormat() {
////    var url = this.port + this._downloadSitesSampleFileURL;
////    this.httpClient.post(url, null, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
////      saveAs(data, 'Site_Bulk _Upload.csv');
////    }, (err) => {
////      //console.log(err);
////    });
////  }

////  getAllSites(studyId: number) {
////    return this.endpoint.get<SitesViewModel[]>(this._getAllSitesURL + "?studyId=" + studyId);
////  }

////  bulkSaveSites(studySites: StudySite[]) {
////    console.log(this.authService.currentUser.id);
////    studySites.forEach(studySite => {
////      studySite.createdBy = studySite.updatedBy = this.authService.currentUser.id;
////    });
////    return this.endpoint.addupdate<BulkSaveStudySiteResponseViewModel>(studySites, this._bulkSaveSitesURL);
////  }

////  updateSiteStatus(site: SitesViewModel) {
////    site.createdBy = site.updatedBy = this.authService.currentUser.id;
////    return this.endpoint.addupdate<any>(site, this._updateSiteStatusURL);
////  }

////  getStudySite(id) {
////    const url = this._getStudySiteURL + "?id=" + id;
////    return this.endpoint.get<StudySite>(url);
////  }

////  saveStudySite(studySite: StudySite) {
////    studySite.createdBy = this.authService.currentUser.id;
////    studySite.updatedBy = this.authService.currentUser.id;
////    return this.endpoint.addupdate<any>(studySite, this._saveStudySiteURL);
////  }

//// //===================================================================================== Study Team My Site =====================================================//
////  getMySite(id) {
////    return this.endpoint.get<MySiteViewModel[]>(this._getMySiteURL + "?id=" + id);
////  }

////  //===================================================================================== FAQ ===============================================================//
////  saveFaq(studyCenterFaq: StudyCenterFaq) {
////    if (studyCenterFaq.id <= 0 || studyCenterFaq.id == undefined || studyCenterFaq.id == null || studyCenterFaq.createdBy <= 0 || studyCenterFaq.createdBy == null || studyCenterFaq.createdBy == undefined)
////      studyCenterFaq.createdBy = this.authService.currentUser.id;
////    studyCenterFaq.updatedBy = this.authService.currentUser.id;
////    return this.endpoint.addupdate<any>(studyCenterFaq, this._saveStudyCenterFaqURL);
////  }

////  getAllFaq(studyId: number) {
////    return this.endpoint.get<StudyCenterFaqViewModel[]>(this._getAllStudyCenterFaqsURL + "?studyId=" + studyId);
////  }

////  getFaq(id) {
////    const url = this._getStudyCenterFaqURL + "?id=" + id;
////    return this.endpoint.get<StudyCenterFaq>(url);
////  }

////  deleteFaq(id: number) {
////    const url = this._deleteStudyCenterFaqURL + "?id=" + id;
////    return this.endpoint.get<boolean>(url);
////  }  

////   //===================================================================================== Study Url ===============================================================//
////  saveStudyUrl(studyUrl: StudyUrl) {
////    if (studyUrl.id <= 0 || studyUrl.id == undefined || studyUrl.id == null || studyUrl.createdBy <= 0 || studyUrl.createdBy == null || studyUrl.createdBy == undefined)
////      studyUrl.createdBy = this.authService.currentUser.id;
////    studyUrl.updatedBy = this.authService.currentUser.id;
////    return this.endpoint.addupdate<any>(studyUrl, this._saveStudyUrlURL);
////  }

////  getAllStudyUrl(studyId: number) {
////    return this.endpoint.get<StudyUrlViewModel[]>(this._getAllStudyUrlsURL + "?studyId=" + studyId);
////  }

////  getStudyUrl(id) {
////    const url = this._getStudyUrlURL + "?id=" + id;
////    return this.endpoint.get<StudyUrl>(url);
////  }

////  deleteStudyUrl(id: number) {
////    const url = this._deleteStudyUrlURL + "?id=" + id;
////    return this.endpoint.get<boolean>(url);
////  }

////  updateStudyUrlStatus(study: StudyUrl) {
////    study.createdBy = study.updatedBy = this.authService.currentUser.id;
////    study.updatedOn = new Date();
////    return this.endpoint.addupdate<StudyUrl>(study, this._updateStudyUrlStatusURL);
////  }

////  getStudyUrlHistory(id) {
////    return this.endpoint.get<StudyUrlHistory[]>(this._getStudyUrlHistoryURL + "?id=" + id);
////  }

//////===================================================================================== Training ===============================================================//
////  saveTraining(studyCenterTraining: StudyCenterTraining) {
////    if (studyCenterTraining.id <= 0 || studyCenterTraining.id == undefined || studyCenterTraining.id == null || studyCenterTraining.createdBy <= 0 || studyCenterTraining.createdBy == null || studyCenterTraining.createdBy == undefined)
////      studyCenterTraining.createdBy = this.authService.currentUser.id;
////    studyCenterTraining.updatedBy = this.authService.currentUser.id;
////    return this.endpoint.addupdate<any>(studyCenterTraining, this._saveStudyCenterTrainingURL);
////  }

////  getAllAvailableTraining(studyId: number, countryId: number, languageId: number, mandatory: number) {
////    const url = this._getAllStudyCenterTrainingsURL + "?studyId=" + studyId + "&countryId=" + countryId + "&languageId=" + languageId + "&mandatory=" + mandatory + "&currentUserId=" + this.authService.currentUser.id;
////    return this.endpoint.get<StudyCenterTrainingViewModel[]>(url);
////  }

////  getAllComplianceTraining(studyId: number, countryId: number, siteInfoId: number, roleId: number, searchTraining: string) {
////    const url = this._getAllComplianceTrainingURL + "?studyId=" + studyId + "&countryId=" + countryId + "&siteInfoId=" + siteInfoId + "&roleId=" + roleId + "&searchTraining=" + searchTraining;
////    return this.endpoint.get<ComplianceTrainingViewModel[]>(url);
////  }

////  getTraining(id) {
////    const url = this._getStudyCenterTrainingURL + "?id=" + id;
////    return this.endpoint.get<StudyCenterTraining>(url);
////  }

////  deleteTraining(id: number) {
////    const url = this._deleteStudyCenterTrainingURL + "?id=" + id;
////    return this.endpoint.get<boolean>(url);
////  }

////  updateTrainingStatus(studyCenterTraining: StudyCenterTraining) {
////    if (studyCenterTraining.id <= 0 || studyCenterTraining.id == null || studyCenterTraining.id == undefined) {
////      studyCenterTraining.createdBy = this.authService.currentUser.id;
////    }
////    studyCenterTraining.updatedBy = this.authService.currentUser.id;
////    studyCenterTraining.updatedOn = new Date();
////    return this.endpoint.addupdate<any>(studyCenterTraining, this._updateStudyCenterTrainingStatusURL);
////  }

////  uploadStudyCenterTrainingMaterial(formData) {
////    var url = this.port + this._uploadStudyCenterTrainingMaterialURL;
////    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
////  }

////  fillSiteNumbers(studyId: number) {
////    return this.endpoint.get<TitleMaster[]>(this._fillSiteNumbersURL + "?studyId=" + studyId);
////  }

////  saveTrainingRoleMapping(trainingRoleMapping: TrainingRoleMapping) {
////    trainingRoleMapping.createdBy = this.authService.currentUser.id;
////    trainingRoleMapping.updatedBy = this.authService.currentUser.id;
////    return this.endpoint.addupdate<any>(trainingRoleMapping, this._createTrainingRoleMappingURL);
////  }

////  geTrainingRoleMappings(studyId: number, countryId: number, languageId: number, roleId: number) {
////    const url = this._geTrainingRoleMappingsURL + "?studyId=" + studyId + "&countryId=" + countryId + "&languageId=" + languageId + "&roleId=" + roleId;
////    return this.endpoint.get<TrainingRoleMappingViewModel[]>(url);
////  }

////  deleteTrainingMapping(id: number) {
////    const url = this._deleteTrainingRoleMappingURL + "?id=" + id;
////    return this.endpoint.get<boolean>(url);
////  }

////  updateTraningCompletionStatus(trainingUserMapping: TrainingUserMapping) {
////    trainingUserMapping.createdBy = this.authService.currentUser.id;
////    trainingUserMapping.updatedBy = this.authService.currentUser.id;
////    trainingUserMapping.userId = this.authService.currentUser.id;
////    return this.endpoint.addupdate<any>(trainingUserMapping, this._updateTraningCompletionStatusURL);
////  }

////  getTrainingRoles(studyId: number) {
////    return this.endpoint.get<TrainingRoles[]>(this._getTrainingRolesURL + "?studyId=" + studyId);
////  }

////  getMappingTrainings(studyId: number) {
////    const url = this._getMappingTrainingsURL + "?studyId=" + studyId ;
////    return this.endpoint.get<StudyCenterTrainingViewModel[]>(url);
////  }

////  //===================================================================================== News ===============================================================//
////}

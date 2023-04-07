//===================================================================================== Imports ===============================================================//
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Role } from 'src/app/models/role.model';
import { BulkSaveStudyTeamContactResponseViewModel } from 'src/app/viewmodels/studycenter/bulksavestudyteamcontactresponseviewmodel.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../account/services/auth.service';
import { State } from '../../../models/common/state.model';
import { StudyCenterHistory } from '../../../models/studycenter/studycenterhistory.model';
import { StudyTeamContact } from '../../../models/studycenter/studyteamcontact.model';
import { StudyTeamContactViewModel } from '../../../viewmodels/studycenter/studyteamcontactviewmodel.model';

import { EndPointService } from '../endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class StudyCenterStudyTeamContactService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/StudyCenterStudyTeamContact/";
  private readonly _downloadStudyTeamContactSampleFileURL: string = this._baseApiUrl + "DownloadStudyTeamContactSampleFormat";
  private readonly _saveStudyTeamContactURL: string = this._baseApiUrl + "SaveStudyTeamContact";
  private readonly _uploadHeadshotURL: string = this._baseApiUrl + "UploadContactHeadshot";
  private readonly _getAllStudyTeamContactURL: string = this._baseApiUrl + "GetAllStudyTeamContacts";
  private readonly _getStudyTeamContactURL: string = this._baseApiUrl + "GetStudyTeamContact";
  private readonly _bulkSaveURL: string = this._baseApiUrl + "BulkSave";
  private readonly _getRolesURL: string = this._baseApiUrl + "GetAllRolesByType";
  private readonly _getStatesURL: string = this._baseApiUrl + "GetAllStates";
  private readonly _checkEmailURL: string = this._baseApiUrl + "CheckEmailExists";
  private readonly _getStudyCenterHistoryURL: string = this._baseApiUrl + "GetStudyCenterHistory";
  private readonly _updateContactStatusURL: string = this._baseApiUrl + "UpdateContactStatus";
  private readonly _contactUploadURL: string = this._baseApiUrl + "ContactUpload";
  private readonly _validateUploadURL: string = this._baseApiUrl + "ValidateUpload";
  private readonly _updateStatusURL: string = this._baseApiUrl + "UpdateQCStatus";
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

  getStudyCenterHistory(historyTypeId: number, historyType: string) {
    return this.endpoint.get<StudyCenterHistory[]>(this._getStudyCenterHistoryURL + "?historyTypeId=" + historyTypeId + "&historyType=" + historyType);
  }

  downloadStudyTeamContactSampleFormat() {
    var url = this.port + this._downloadStudyTeamContactSampleFileURL;
    this.httpClient.post(url, null, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, 'Study_Contact_Bulk_Upload.xlsx');
    }, (err) => {
      //console.log(err);
    });
  }

  saveContact(studyTeamContact: StudyTeamContact) {
    if (studyTeamContact.id <= 0 || studyTeamContact.id == undefined || studyTeamContact.id == null || studyTeamContact.createdBy <= 0 || studyTeamContact.createdBy == null || studyTeamContact.createdBy == undefined)
      studyTeamContact.createdBy = this.authService.currentUser.id;
    studyTeamContact.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(studyTeamContact, this._saveStudyTeamContactURL);
  }

  uploadHeadshot(formData) {
    var url = this.port + this._uploadHeadshotURL;
    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  getAllContact(studyId: number, countryIds: string[]) {
    return this.endpoint.addupdate<StudyTeamContactViewModel[]>(countryIds, this._getAllStudyTeamContactURL + "?studyId=" + studyId);
  }

  getContact(id) {
    const url = this._getStudyTeamContactURL + "?id=" + id;
    return this.endpoint.get<StudyTeamContact>(url);
  }

  updateContactStatus(contact: StudyTeamContact) {
    contact.status = true;
    contact.createdBy = contact.updatedBy = this.authService.currentUser.id;
    contact.updatedOn = new Date();
    return this.endpoint.addupdate<StudyTeamContact>(contact, this._updateContactStatusURL);
  }

  bulkSave(studyContacts: StudyTeamContact[]) {
    studyContacts.forEach(studyContact => {
      if (studyContact.id <= 0 || studyContact.id == null || studyContact.id == undefined)
        studyContact.createdBy = this.authService.currentUser.id;
      studyContact.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<BulkSaveStudyTeamContactResponseViewModel>(studyContacts, this._bulkSaveURL);
  }

  contactUpload(formData) {
    var url = this.port + this._contactUploadURL;
    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  validateUpload(formData) {
    var url = this.port + this._validateUploadURL;
    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  getRoles() {
    const url = this._getRolesURL;
    return this.endpoint.get<Role[]>(url);
  }

  getStates() {
    return this.endpoint.get<State[]>(this._getStatesURL);
  }

  checkEmail(email: string, id: any) {
    const url = this._checkEmailURL + "?email=" + email + "&id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  updateStatus(QCFlagModel: StudyTeamContact) {
    QCFlagModel.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(QCFlagModel, this._updateStatusURL);
  }
}

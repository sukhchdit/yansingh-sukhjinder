import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/account/services/auth.service';
import { StudySubject, StudySubjectFilter } from 'src/app/models/subject/studysubject.model';
import { StudySubjectViewModel } from 'src/app/viewmodels/subject/studysubject.viewmodel';
import { BulkSaveStudySubjectResponseViewModel } from 'src/app/viewmodels/subject/bulksavestudysubjectresponse.viewmodel';
import { AuthenticateStudySubjectViewModel } from 'src/app/viewmodels/subject/authenticatestudysubject.viewmodel';

@Injectable()
export class StudySubjectService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/StudySubject/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _getAllByFilter: string = this._baseApiUrl + "GetAllByFilter";
  private readonly _getAllBySponsorStudyInfoIdURL: string = this._baseApiUrl + "GetAllBySponsorStudyInfoId";
  private readonly _getAllByOrganizationIdURL: string = this._baseApiUrl + "GetAllByOrganizationId";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _bulkSaveURL: string = this._baseApiUrl + "BulkSave";
  private readonly _downloadSampleFileURL: string = this._baseApiUrl + "DownloadSampleFile";
  private readonly _updateIsQualifiedURL: string = this._baseApiUrl + "UpdateIsQualified";
  private readonly _updateSendeDiaryURL: string = this._baseApiUrl + "UpdateSendeDiary";
  private readonly _updateParticipantNumberURL: string = this._baseApiUrl + "UpdateParticipantNumber";
  private readonly _updateSubjectStatusURL: string = this._baseApiUrl + "UpdateSubjectStatus";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";
  private readonly _authenticateSubjectForeDiaryURL: string = this._baseApiUrl + "AuthenticateSubjectForeDiary";
  private readonly _getStudySubjectURL: string = "api/StudySubject/GetStudySubject";
  private readonly _getAllSubjectsBySponsorSiteStudyCDAInvitationIdURL: string = "api/StudySubject/GetAllSubjectsBySponsorSiteStudyCDAInvitationId";
  private readonly _getSubjectsVisitTrackingsBySponsorSiteStudyCDAInvitationIdAndSubjectIdURL: string = "api/StudySubject/GetSubjectsVisitTrackingsBySponsorSiteStudyCDAInvitationIdAndSubjectId";
  private readonly _getAllSubjectsWithScreenNumberBySponsorSiteStudyCDAInvitationIdURL: string = "api/StudySubject/GetAllSubjectsWithScreenNumberBySponsorSiteStudyCDAInvitationId";
  

  constructor(private endpoint: EndPointService, private authService: AuthService, private httpClient: HttpClient) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubject>(url);
  }

  getAllByFilter(_StudySubjectFilter :StudySubjectFilter) {
    return this.endpoint.addupdate<StudySubject[]>(_StudySubjectFilter, this._getAllByFilter);
  }
  getAll(sponsorSiteStudyCDAInvitationId) {
    const url = this._getAllURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<StudySubject[]>(url);
  }

  getSubjectsVisitTrackingsBySponsorSiteStudyCDAInvitationIdAndSubjectId(sponsorSiteStudyCDAInvitationId, subjectId) {
    const url = this._getSubjectsVisitTrackingsBySponsorSiteStudyCDAInvitationIdAndSubjectIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId + "&subjectId=" + subjectId;
    return this.endpoint.get<any[]>(url);
  }

  getAllBySponsorStudyInfoId(sponsorStudyInfoId) {
    const url = this._getAllBySponsorStudyInfoIdURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<StudySubjectViewModel[]>(url);
  }

  getAllByOrganizationId(organizationInfoId) {
    const url = this._getAllByOrganizationIdURL + "?organizationInfoId=" + organizationInfoId;
    return this.endpoint.get<StudySubject[]>(url);
  }

  updateIsQualified(id, isQualified) {
    const url = this._updateIsQualifiedURL + "?id=" + id + "&isQualified=" + isQualified;
    return this.endpoint.get<boolean>(url);
  }

  updateSendeDiary(id, sendeDiary, sponsorStudyInfoId) {
    const url = this._updateSendeDiaryURL + "?id=" + id + "&sendeDiary=" + sendeDiary + "&sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<boolean>(url);
  }

  updateParticipantNumber(id, participantNumber) {
    const url = this._updateParticipantNumberURL + "?id=" + id + "&participantNumber=" + participantNumber;
    return this.endpoint.get<boolean>(url);
  }

  updateSubjectStatus(id, subjectStatus) {
    const url = this._updateSubjectStatusURL + "?id=" + id + "&subjectStatus=" + subjectStatus;
    return this.endpoint.get<boolean>(url);
  }

  save(studySubject: StudySubject) {
    if (studySubject.id <= 0 || studySubject.id == null || studySubject.id == undefined)
      studySubject.createdBy = this.authService.currentUser.id;
    studySubject.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubject>(studySubject, this._saveURL);
  }

  bulkSave(studySubjects: StudySubject[]) {
    studySubjects.forEach(studySubject => {
      if (studySubject.id <= 0 || studySubject.id == null || studySubject.id == undefined)
        studySubject.createdBy = this.authService.currentUser.id;
      studySubject.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<BulkSaveStudySubjectResponseViewModel>(studySubjects, this._bulkSaveURL);
  }

  downloadDocument() {
    var url = this.port + this._downloadSampleFileURL;
    this.httpClient.post(url, null, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, 'Sample Format.csv');
    }, err => {
      //console.log(err);
    });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  deleteStudySubject(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  authenticateSubjectForeDiary(data: AuthenticateStudySubjectViewModel) {
    return this.endpoint.addupdate<boolean>(data, this._authenticateSubjectForeDiaryURL);
  }

  getStudySubject(sponsorSiteStudyCDAInvitationId) {
    const url = this._getStudySubjectURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<StudySubject[]>(url);
  }

  getAllSubjectsBySponsorSiteStudyCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    const url = this._getAllSubjectsBySponsorSiteStudyCDAInvitationIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<StudySubject[]>(url);
  }

  getAllSubjectsWithScreenNumberBySponsorSiteStudyCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    const url = this._getAllSubjectsWithScreenNumberBySponsorSiteStudyCDAInvitationIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<any[]>(url);
  }
  
}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { SubjectReport } from '../../models/report/subjectreport.model';
import { AuthService } from '../account/auth.service';
import { SubjectReportViewModel } from '../../viewmodels/report/subjectreport.viewmodel';
import { AuthenticateStudySubjectViewModel } from '../../viewmodels/subject/authenticatestudysubject.viewmodel';
import { BulkSaveStudySubjectResponseViewModel } from '../../viewmodels/subject/bulksavestudysubjectresponse.viewmodel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from '../../../environments/environment';
import { StudySubject } from '../../models/subject/studysubject.model';
import { StudySubjectVisitSummary } from '../../models/report/subjectvisitsummery.model';
@Injectable()
export class SubjectReportService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/ReportSubject/";

  //private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly GetAllSubjectsURL: string = this._baseApiUrl + "GetAllByOrganizationId";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _getAllScreeningURL: string = this._baseApiUrl + "GetAllScreening";
  private readonly _GetAllSubjectsWithDatesURL: string = this._baseApiUrl + "GetAllSubjectsWithDates";
  private readonly _GetAllVisitCoordinatorByStudyURL: string = this._baseApiUrl + "GetAllVisitCoordinatorByStudy"; 
constructor(private endpoint: EndPointService,
     private authService: AuthService, 
     private httpClient: HttpClient) {

  }

  getAllSubjectsByOrganizationId(organizationInfoId) {
    const url = this.GetAllSubjectsURL + "?organizationInfoId=" + organizationInfoId;
    return this.endpoint.get<SubjectReport[]>(url);
  }

  getAll(sponsorSiteStudyCDAInvitationId) {
    const url = this._getAllURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<StudySubject[]>(url);
  }

  getAllScreening(sponsorSiteStudyCDAInvitationId,fromDate, toDate, datesChanged) {
    const url = this._getAllScreeningURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId+"&fromDate="+fromDate+"&toDate="+toDate+"&datesChanged="+datesChanged;
    return this.endpoint.get<StudySubject[]>(url);
  }
 
  GetAllSubjectsWithDates(fromDate, toDate) {
    const url = this._GetAllSubjectsWithDatesURL + "?fromDate=" + fromDate+ "&toDate=" + toDate;
    return this.endpoint.get<StudySubject[]>(url);
  }

  GetAllVisitCoordinatorByStudy(DatesChanged,sponsorSiteStudyCDAInvitationId,coordinatorId,fromDate, toDate) {
    const url = this._GetAllVisitCoordinatorByStudyURL +  "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId+"&coordinatorId=" + coordinatorId+"&fromDate=" + fromDate+ "&toDate=" + toDate+"&DatesChanged="+DatesChanged;
    return this.endpoint.get<StudySubjectVisitSummary[]>(url);
  }
}

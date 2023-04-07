import { Injectable } from '@angular/core';
import { AuthService } from '../account/auth.service';
import { EndPointService } from '../endpoint.service';
import { SponsorStudyInfoViewModel } from '../../viewmodels/sponsor/sponsorstudyinfo.viewmodel';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { EvaultService } from '../evault/evault.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SsuSiteService {

  port = environment.apiport;
  private readonly _getAllSponsorStudyViewModelURL: string = "api/SSUSiteInfo/GetStudies/";
  private readonly _getNavigationMenu: string = "api/SSUWorkflow/GetNavigationMenu/";
  private readonly _getSiteNavigationMenu: string = "api/ssusiteworkflow/GetSiteNavigationMenu/";
  private readonly _getSiteNavigationMenuGet: string = "api/SSUSiteNavigation/Get/";
  private readonly _sendSFQWorkflowURL: string = "api/SendSFQ/";
  private readonly _saveByWorkflow:string="api/SSUWorkflow/SendRequest/";
  private readonly _updateSiteNumbers:string="api/SSUSiteSelection/UpdateSiteNumbers/";
  private readonly _getSsuSFQQuestionsListAPI: string = "api/SSUSFQSiteResponse/SQVQuestionTemplate/";
  private readonly _saveCalendarEventAPI: string = "api/SSUScheduleVisits/ScheduleVisit/";
  private readonly _getSsuSiteScheduleVisits: string = "api/SSUScheduleVisits/GetScheduleVisits/";
  private readonly _getSSUSitesSFQURL: string = "api/SSUSFQSiteResponse/SFQDetails/";
  private readonly _updateEventStatusURL: string = "api/SSUScheduleVisits/UpdateStatus/";
  private readonly _allCheckListTasksURL: string = "api/SSUGreenlightChecklist/";
  private readonly _getAllSSUCheckTasksURL: string = "api/SSUGreenlightChecklist/GetChecklist/";
  private readonly _updateSSUCheckTasksURL: string = "api/SSUGreenlightChecklist/UpdatStatus/";
  private readonly _getCDADocumentURL: string = "api/SSUWorkflow/GetCDADocument/";
  private readonly _saveEsignDocumentURL: string = "api/SSUSignature/Sponsor/SaveSignature/";
  private readonly _saveSiteEsignDocumentURL: string = "api/SSUSignature/Site/SaveSignature/";
  private readonly _downloadCDADocumentURL: string = "api/SSUSignature/GetSignatureDocument/";

  constructor(private endpoint: EndPointService, private evaultService: EvaultService, public httpClient: HttpClient) {

  }

  getAllViewModel(sponsorInfoId) {
    return this.endpoint.get<SponsorStudyInfoViewModel[]>(this._getAllSponsorStudyViewModelURL + sponsorInfoId);
  }
  GetSiteNavigationMenu(requestId,cdnInvitation ) {
    const url = this._getSiteNavigationMenuGet + requestId+"/"+cdnInvitation;
    return this.endpoint.get(url);
  }
  GetNavigationMenu(requestId) {
    const url = this._getNavigationMenu + requestId;
    return this.endpoint.get(url);
  }

  sendSFQWorkflow(workflow_id, requestId, formData) {
    const url = this._sendSFQWorkflowURL + workflow_id + '/' + requestId;
    return this.endpoint.addupdate<any>(formData, url);
  }

  saveSSUWorkflow(request,workflowId,siteguid) {
    return this.endpoint.addupdate<any>(request, this._saveByWorkflow+ workflowId+"/"+siteguid);
  }
  saveSSUUpdateSiteNumbers(request,siteNoList) {
    return this.endpoint.addupdate<any>(siteNoList, this._updateSiteNumbers+request);
  }

  getSSUSFQStudyQuestionsList(requestId, CDAInvitationId) {
    const url = this._getSsuSFQQuestionsListAPI + CDAInvitationId +'/'+ requestId;
    return this.endpoint.get(url);
  }

  saveSSUCalenderEvent(formData, id) {
    const url = this._saveCalendarEventAPI + id;
    return this.endpoint.addupdate(formData, url);
  }

  getSSUSiteScheduleVisits(id) {
    const url = this._getSsuSiteScheduleVisits + id;
    return this.endpoint.get(url);
  }

  getSiteSFQ(sfq_id) {
    const url = this._getSSUSitesSFQURL + sfq_id;
    return this.endpoint.get(url);
  }
  sortingNavBarFields(data) {
    return data.sort((a, b)=> {
      return a.workflowIndex - b.workflowIndex;
    })
  }
  updateEventStatus(id, statusObj) {
    const url = this._updateEventStatusURL + id;
    return this.endpoint.addupdate(statusObj, url);
  }

  getAllTasksList(id) {
    const url = this._allCheckListTasksURL + "GetAll/" + id;
    return this.endpoint.get(url);
  }

  addCheckListTask(formdata, id) {
    const url = this._allCheckListTasksURL + "Add/" +id;
    return this.endpoint.addupdate(formdata, url);
  }

  updateCheckListTask(formdata, id) {
    const url = this._allCheckListTasksURL + "Update/" +id;
    return this.endpoint.addupdate(formdata, url);
  }

  deleteCheckListTask(id) {
    const url = this._allCheckListTasksURL + "Delete/" +id;
    return this.endpoint.deleteObj(url);
  }

  getAllSsuCheckList(id) {
    const url = this._getAllSSUCheckTasksURL+id;
    return this.endpoint.get(url);
  }

  updateSsuCheckListTask(formData, id) {
    const url = this._updateSSUCheckTasksURL +id;
    return this.endpoint.addupdate(formData, url);
  }

  getCDADocument(id) {
    const url = this._getCDADocumentURL + id;
    return this.endpoint.get(url);
  }

  saveEsignDocument(formData, requestId) {
    const url = this._saveEsignDocumentURL + requestId;
    return this.endpoint.addupdate(formData, url);
  }
  
  saveSiteEsignDocument(formData, requestId) {
    const url = this._saveSiteEsignDocumentURL + requestId;
    return this.endpoint.addupdate(formData, url);
  }

  getSiteCDAInvitation(id) {

    const url = this._downloadCDADocumentURL + id;
    return this.endpoint.get(url);
  }

  downloadCDADocument(id) {
    const url = this._downloadCDADocumentURL + id;
    return this.endpoint.get(url);
    // this.httpClient.get(url, { responseType: 'blob', headers: this.evaultService.getHeaders().append("Content-Type", "application/json") }).subscribe((data: any) => {
    //   saveAs(data.response, 'CDADocument');
    // }, err => {
    //   console.log(err);
    // });
  }
}

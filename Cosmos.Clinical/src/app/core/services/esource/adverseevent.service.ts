import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { AdverseEvent } from '../../models/esource/adverseevent.model';
import { SaveAdverseEventViewModel } from '../../models/viewmodels/esource/saveadverseevent.viewmodel';

@Injectable()
export class AdverseEventService {
  port = environment.apiport;
  private readonly _baseURL: string = "api/AdverseEvent/";
  private readonly _getURL: string = this._baseURL + "Get";
  private readonly _getAllBySponsorSiteStudyCDAInvitationIdURL: string = this._baseURL + "GetAllBySponsorSiteStudyCDAInvitationId";
  private readonly _getAllByStudySubjectIdURL: string = this._baseURL + "GetAllByStudySubjectId";
  private readonly _saveURL: string = this._baseURL + "Save";
  private readonly _deleteURL: string = this._baseURL + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<AdverseEvent>(url);
  }

  getAllBySponsorSiteStudyCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    const url = this._getAllBySponsorSiteStudyCDAInvitationIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<AdverseEvent[]>(url);
  }

  getAllByStudySubjectId(studySubjectId) {
    const url = this._getAllByStudySubjectIdURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<AdverseEvent[]>(url);
  }

  save(adverseEvent: SaveAdverseEventViewModel) {
    if (adverseEvent.adverseEvent.id <= 0 || adverseEvent.adverseEvent.id == null || adverseEvent.adverseEvent.id == undefined) {
      adverseEvent.adverseEvent.createdBy = this.authService.currentUser.id;
    }
    adverseEvent.adverseEvent.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<AdverseEvent>(adverseEvent, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

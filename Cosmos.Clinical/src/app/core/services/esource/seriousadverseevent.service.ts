import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { SeriousAdverseEvent } from '../../models/esource/seriousadverseevent.model';
import { SaveSeriousAdverseEventViewModel } from '../../models/viewmodels/esource/saveseriousadverseevent.viewmodel';

@Injectable()
export class SeriousAdverseEventService {
  port = environment.apiport;
  private readonly _baseURL: string = "api/SeriousAdverseEvent/";
  private readonly _getURL: string = this._baseURL + "Get";
  private readonly _getAllBySponsorSiteStudyCDAInvitationIdURL: string = this._baseURL + "GetAllBySponsorSiteStudyCDAInvitationId";
  private readonly _getAllByStudySubjectIdURL: string = this._baseURL + "GetAllByStudySubjectId";
  private readonly _saveURL: string = this._baseURL + "Save";
  private readonly _deleteURL: string = this._baseURL + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SeriousAdverseEvent>(url);
  }

  getAllBySponsorSiteStudyCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    const url = this._getAllBySponsorSiteStudyCDAInvitationIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<SeriousAdverseEvent[]>(url);
  }

  getAllByStudySubjectId(studySubjectId) {
    const url = this._getAllByStudySubjectIdURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<SeriousAdverseEvent[]>(url);
  }

  save(seriousAdverseEvent: SaveSeriousAdverseEventViewModel) {
    if (seriousAdverseEvent.seriousAdverseEvent.id <= 0 || seriousAdverseEvent.seriousAdverseEvent.id == null || seriousAdverseEvent.seriousAdverseEvent.id == undefined) {
      seriousAdverseEvent.seriousAdverseEvent.createdBy = this.authService.currentUser.id;
    }
    seriousAdverseEvent.seriousAdverseEvent.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SeriousAdverseEvent>(seriousAdverseEvent, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

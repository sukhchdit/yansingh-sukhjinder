import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../account/auth.service';
import { SponsorSiteStudySubInvestigator } from '../../models/sponsor/sponsorsitestudysubinvestigator.model';

@Injectable()
export class SponsorSiteStudySubInvestigatorService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/SponsorSiteStudySubInvestigator";

  private readonly _getURL: string = this._baseApiUrl + "/Get";
  private readonly _getAllURL: string = this._baseApiUrl + "/GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "/Save";
  private readonly _deleteURL: string = this._baseApiUrl + "/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) { }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SponsorSiteStudySubInvestigator>(url);
  }

  getAll(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<SponsorSiteStudySubInvestigator[]>(this._getAllURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  save(sponsorSiteStudySubInvestigators: SponsorSiteStudySubInvestigator[], sponsorSiteStudyCDAInvitationId: number) {
    sponsorSiteStudySubInvestigators.forEach(sponsorSiteStudySubInvestigator => {
      if (sponsorSiteStudySubInvestigator.id <= 0 || sponsorSiteStudySubInvestigator.id == null || sponsorSiteStudySubInvestigator.id == undefined) {
        sponsorSiteStudySubInvestigator.createdBy = this.authService.currentUser.organizationContactId;
      }
    });
    return this.endpoint.addupdate<SponsorSiteStudySubInvestigator[]>(sponsorSiteStudySubInvestigators, this._saveURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}

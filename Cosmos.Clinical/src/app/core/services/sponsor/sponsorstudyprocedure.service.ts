import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { SponsorStudyProcedure } from '../../models/sponsor/sponsorstudyprocedure.model';
import { environment } from '../../../environments/environment';
import { AuthService } from '../account/auth.service';

@Injectable()
export class SponsorStudyProcedureService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/SponsorStudyProcedure";
  private readonly _getURL: string = this._baseApiUrl + "/Get";
  private readonly _getAllURL: string = this._baseApiUrl + "/GetAll";
  private readonly _getAllByIsNonProcedureURL: string = this._baseApiUrl + "/GetAllByIsNonProcedure";
  private readonly _getAllByIsNonProcedureIsConditionalURL: string = this._baseApiUrl + "/GetAllByIsNonProcedureIsConditional";
  private readonly _saveURL: string = this._baseApiUrl + "/Save";
  private readonly _bulkInsertURL: string = this._baseApiUrl + "/BulkInsert";
  private readonly _updateSortOrderURL: string = this._baseApiUrl + "/UpdateSortOrder";
  private readonly _deleteURL: string = this._baseApiUrl + "/Delete";
  private readonly _deleteBySponsorStudyInfoIdURL: string = this._baseApiUrl + "/DeleteBySponsorStudyInfoId";


  constructor(private endpoint: EndPointService, private authService: AuthService) { }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyProcedure>(url);
  }

  getAll(sponsorStudyInfoId) {
    return this.endpoint.get<SponsorStudyProcedure[]>(this._getAllURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  getAllByIsNonProcedure(sponsorStudyInfoId, isNonProcedure) {
    return this.endpoint.get<SponsorStudyProcedure[]>(this._getAllByIsNonProcedureURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&isNonProcedure=" + isNonProcedure);
  }

  getAllByIsNonProcedureIsConditional(sponsorStudyInfoId, isNonProcedure, isConditional) {
    return this.endpoint.get<SponsorStudyProcedure[]>(this._getAllByIsNonProcedureIsConditionalURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId + "&isNonProcedure=" + isNonProcedure + "&isConditional=" + isConditional);
  }

  updateSortOrder(id, oldSortOrder, newSortOrder, sponsorStudyInfoId) {
    return this.endpoint.get<boolean>(this._updateSortOrderURL + "?id=" + id + "&oldSortOrder=" + oldSortOrder + "&newSortOrder=" + newSortOrder + "&sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  save(sponsor: SponsorStudyProcedure) {
    if (sponsor.id <= 0 || sponsor.id == undefined) {
      sponsor.createdBy = this.authService.currentUser.id;
      sponsor.status = true;
    }
    sponsor.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorStudyProcedure>(sponsor, this._saveURL);
  }

  bulkInsert(sponsors: SponsorStudyProcedure[]) {
    sponsors.forEach(sponsor => {
      if (sponsor.id <= 0 || sponsor.id == undefined) {
        sponsor.createdBy = this.authService.currentUser.id;
        sponsor.status = true;
      }
      sponsor.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<SponsorStudyProcedure[]>(sponsors, this._bulkInsertURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  deleteBySponsorStudyInfoId(sponsorStudyInfoId) {
    const url = this._deleteBySponsorStudyInfoIdURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<boolean>(url);
  }
}

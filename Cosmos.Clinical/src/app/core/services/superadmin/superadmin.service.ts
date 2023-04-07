import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { SuperUserSponsor } from '../../models/superadmin/superusersponsor.model';
import { SponsorInfo } from '../../models/sponsor/sponsorinfo.model';
import { SuperAdminSponsorViewModel } from '../../viewmodels/superadmin/superadminsponsor.viewmodel';
import { SuperUserCro } from '../../models/superadmin/superusercro.model';
import { CroInfo } from '../../models/cro/croinfo.model';
import { SuperAdminCroViewModel } from '../../viewmodels/superadmin/superadmincro.viewmodel';

@Injectable()
export class SuperAdminService {
  private readonly _baseApiUrl: string = "api/SuperAdmin";
  private readonly _getSuperUserSponsorURL: string = this._baseApiUrl + "/GetSuperUserSponsor";
  private readonly _getAllSuperUserSponsorURL: string = this._baseApiUrl + "/GetAllSuperUserSponsor";
  private readonly _saveSuperUserSponsorURL: string = this._baseApiUrl + "/SaveSuperUserSponsor";
  private readonly _deleteSuperUserSponsorURL: string = this._baseApiUrl + "/DeleteSuperUserSponsor";
  private readonly _searchSponsorURL: string = this._baseApiUrl + "/SearchSponsor";

  private readonly _getSuperUserCroURL: string = this._baseApiUrl + "/GetSuperUserCro";
  private readonly _getAllSuperUserCroURL: string = this._baseApiUrl + "/GetAllSuperUserCro";
  private readonly _saveSuperUserCroURL: string = this._baseApiUrl + "/SaveSuperUserCro";
  private readonly _deleteSuperUserCroURL: string = this._baseApiUrl + "/DeleteSuperUserCro";
  private readonly _searchCroURL: string = this._baseApiUrl + "/SearchCro";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  getSuperUserSponsor(id) {
    const url = this._getSuperUserSponsorURL + "?id=" + id;
    return this.endpoint.get<SuperUserSponsor>(url);
  }

  getAllSuperUserSponsor(userId) {
    const url = this._getAllSuperUserSponsorURL + "?id=" + userId;
    return this.endpoint.get<SponsorInfo[]>(url);
  }

  saveSuperUserSponsor(superUserSponsor: SuperUserSponsor) {
    if (superUserSponsor.id <= 0 || superUserSponsor.id == null || superUserSponsor.id == undefined) {
      superUserSponsor.createdBy = this.authService.currentUser.id;
      superUserSponsor.createdOn = new Date();
    }
    superUserSponsor.updatedBy = this.authService.currentUser.id;
    superUserSponsor.updatedOn = new Date();
    return this.endpoint.addupdate<SuperUserSponsor>(superUserSponsor, this._saveSuperUserSponsorURL);
  }

  deleteSuperUserSponsor(superUserId, sponsorInfoId) {
    const url = this._deleteSuperUserSponsorURL + "?superUserId=" + superUserId + "&sponsorInfoId=" + sponsorInfoId;
    return this.endpoint.get<boolean>(url);
  }

  searchSponsor(sponsorName, superUserId) {
    const url = this._searchSponsorURL + "?sponsorName=" + sponsorName + "&superUserId=" + superUserId;
    return this.endpoint.get<SuperAdminSponsorViewModel[]>(url);
  }

  getSuperUserCro(id) {
    const url = this._getSuperUserCroURL + "?id=" + id;
    return this.endpoint.get<SuperUserCro>(url);
  }

  getAllSuperUserCro(userId) {
    const url = this._getAllSuperUserCroURL + "?id=" + userId;
    return this.endpoint.get<CroInfo[]>(url);
  }

  saveSuperUserCro(superUserCro: SuperUserCro) {
    if (superUserCro.id <= 0 || superUserCro.id == null || superUserCro.id == undefined) {
      superUserCro.createdBy = this.authService.currentUser.id;
      superUserCro.createdOn = new Date();
    }
    superUserCro.updatedBy = this.authService.currentUser.id;
    superUserCro.updatedOn = new Date();
    return this.endpoint.addupdate<SuperUserCro>(superUserCro, this._saveSuperUserCroURL);
  }

  deleteSuperUserCro(superUserId, croInfoId) {
    const url = this._deleteSuperUserCroURL + "?superUserId=" + superUserId + "&croInfoId=" + croInfoId;
    return this.endpoint.get<boolean>(url);
  }

  searchCro(croName, superUserId) {
    const url = this._searchCroURL + "?croName=" + croName + "&superUserId=" + superUserId;
    return this.endpoint.get<SuperAdminCroViewModel[]>(url);
  }
}

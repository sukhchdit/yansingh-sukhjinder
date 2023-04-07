import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { SponsorContact } from 'src/app/models/sponsor/sponsorcontact.model';
import { SponsorInfo } from 'src/app/models/sponsor/sponsorinfo.model';
import { EndPointService } from '../endpoint.service';


@Injectable()
export class SponsorService {
  private readonly _getSponsorURL: string = "api/Sponsor/GetSponsor";
  private readonly _getSponsorByOrganizationId: string = "api/Sponsor/GetSponsorInfoByOrganizationId";
  private readonly _getAllSponsorURL: string = "api/Sponsor/GetAllSponsor";
  private readonly _saveSponsorURL: string = "api/Sponsor/SaveSponsor";
  private readonly _deleteSponsorURL: string = "api/Sponsor/DeleteSponsor";
  private readonly _getSponsorInfoBySponsorStudyIdURL: string = "api/Sponsor/GetSponsorInfoBySponsorStudyId";

  private readonly _getSponsorContactURL: string = "api/Sponsor/GetSponsorContact";
  private readonly _getAllSponsorContactURL: string = "api/Sponsor/GetAllSponsorContact";
  private readonly _saveSponsorContactURL: string = "api/Sponsor/SaveSponsorContact";
  private readonly _deleteSponsorContactURL: string = "api/Sponsor/DeleteContact";
  private readonly _getSponsorListBySiteURL: string = "api/Sponsor/GetSponsorListBySite";

  private readonly _registerSponsorURL: string = "api/Sponsor/RegisterSponsor";
  private readonly _checkSponsorByNameURL: string = "api/Sponsor/CheckSponsorByName";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getSponsorURL + "?id=" + id;
    return this.endpoint.get<SponsorInfo>(url);
  }

  getSponsorInfoByOrganizationId(organizationId) {
    const url = this._getSponsorByOrganizationId + "?organizationId=" + organizationId;
    return this.endpoint.get<SponsorInfo>(url);
  }

  getAll() {
    return this.endpoint.get<SponsorInfo[]>(this._getAllSponsorURL);
  }

  save(sponsor: SponsorInfo) {
    if (sponsor.id <= 0 || sponsor.id == null || sponsor.id == undefined) {
      sponsor.organizationInfoId = this.authService.organization.id;
      sponsor.createdBy = this.authService.organization.id;
    }
    sponsor.updatedBy = this.authService.organization.id;
    return this.endpoint.addupdate<SponsorInfo>(sponsor, this._saveSponsorURL);
  }

  delete(id) {
    const url = this._deleteSponsorURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getContact(id) {
    const url = this._getSponsorContactURL + "?id=" + id;
    return this.endpoint.get<SponsorContact>(url);
  }

  getSponsorListBySite(siteInfoId) {
    const url = this._getSponsorListBySiteURL + "?siteInfoId=" + siteInfoId;
    return this.endpoint.get<any[]>(url);
  }

  getAllContact(sponsorId) {
    const url = this._getAllSponsorContactURL + "?sponsorId=" + sponsorId;
    return this.endpoint.get<SponsorContact[]>(url);
  }

  saveContact(sponsorContact: SponsorContact) {
    if (sponsorContact.id <= 0 || sponsorContact.id == null || sponsorContact.id == undefined) {
      sponsorContact.createdBy = this.authService.organization.id;
    }
    sponsorContact.updatedBy = this.authService.organization.id;
    sponsorContact.sponsorInfoId = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorContact>(sponsorContact, this._saveSponsorContactURL);
  }

  deleteContact(id: number) {
    const url = this._deleteSponsorContactURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getSponsorInfoBySponsorStudyId(sponsorStudyId) {
    const url = this._getSponsorInfoBySponsorStudyIdURL + "?sponsorStudyId=" + sponsorStudyId;
    return this.endpoint.get<SponsorInfo>(url);
  }

  registerSponsor(obj) {
    return this.endpoint.addupdate<boolean>(obj, this._registerSponsorURL);
  }

  answr() {
     return this.endpoint.get<any>('api/SSUSFQSiteResponse/SFQDetails/f912dac1-59c6-4c0d-86a9-3638d5bcc14b');
  }

  checkSponsorByName(name) {
    const url = this._checkSponsorByNameURL + "?name=" + name;
    return this.endpoint.get<boolean>(url);
  }
  
}

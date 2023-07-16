import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { Register } from 'src/app/models/account/register.model';
import { OrganizationContact } from 'src/app/models/organization/organizationcontact.model';
import { OrganizationInfo } from 'src/app/models/organization/organizationinfo.model';
import { EndPointService } from '../endpoint.service';

@Injectable()
export class OrganizationService {
  private readonly _getOrganizationURL: string = "api/Organization/GetOrganization";
  private readonly _getOrganizationInfoByNameURL: string = "api/Organization/GetOrganizationInfoByName";
  private readonly _checkOrganizationForSignUpURL: string = "api/Organization/CheckOrganizationForSignUp";
  private readonly _checkSponsorOrganizationForSignUpURL: string = "api/Organization/CheckSponsorOrganizationForSignUp";
  private readonly _getAllOrganizationURL: string = "api/Organization/GetAllOrganization";
  private readonly _saveOrganizationURL: string = "api/Organization/SaveOrganization";
  private readonly _deleteOrganizationURL: string = "api/Organization/DeleteOrganization";
  private readonly _getOrganizationByContactIdURL: string = "api/Organization/GetOrganizationByContactId";

  private readonly _getOrganizationContactURL: string = "api/Organization/GetOrganizationContact";
  private readonly _getOrganizationInvestigatorContactURL: string = "api/Organization/GetOrganizationInvestigatorContact";
  private readonly _getAllOrganizationContactURL: string = "api/Organization/GetAllOrganizationContact";
  private readonly _getAllOrganizationContactsURL: string = "api/Organization/GetAllOrganizationContacts";
  private readonly _getAllOrganizationContactByRoleNameURL: string = "api/Organization/GetAllOrganizationContactByRoleName";
  private readonly _saveOrganizationContactURL: string = "api/Organization/SaveOrganizationContact";
  private readonly _checkOrganizationContactURL: string = "api/Organization/CheckOrganizationContact";
  private readonly _deleteOrganizationContactURL: string = "api/Organization/DeleteContact";
  private readonly _updateOrganizationContactTypeToHybridURL: string = "api/Organization/UpdateOrganizationContactTypeToHybrid";
  private readonly _getOrganizationContactByStudyIdURL: string = "api/Organization/GetOrganizationContactByStudyId";
  
  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }


  get(id) {
    const url = this._getOrganizationURL + "?id=" + id;
    return this.endpoint.get<OrganizationInfo>(url);
  }


  getByName(name) {
    const url = this._getOrganizationInfoByNameURL + "?name=" + name;
    return this.endpoint.get<OrganizationInfo>(url);
  }

  checkOrganizationForSignUp(register: Register) {    
    return this.endpoint.addupdate<OrganizationInfo>(register, this._checkOrganizationForSignUpURL);
  }

  checkSponsorOrganizationForSignUp(register: Register) {
    return this.endpoint.addupdate<OrganizationInfo>(register, this._checkSponsorOrganizationForSignUpURL);
  }

  getByContactId(id) {
    const url = this._getOrganizationByContactIdURL + "?id=" + id;
    return this.endpoint.get<OrganizationInfo>(url);
  }

  getAll() {
    return this.endpoint.get<OrganizationInfo[]>(this._getAllOrganizationURL);
  }

  save(organization: OrganizationInfo) {
    if (organization.id <= 0 || organization.id == undefined || organization.id == null || organization.createdBy <= 0 || organization.createdBy == null || organization.createdBy==undefined)
      organization.createdBy = this.authService.currentUser.id;
    organization.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<OrganizationInfo>(organization, this._saveOrganizationURL);
  }

  delete(id) {
    const url = this._deleteOrganizationURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getContact(id) {
    const url = this._getOrganizationContactURL + "?id=" + id;
    return this.endpoint.get<OrganizationContact>(url);
  }

  getAllContact(organizationId) {
    const url = this._getAllOrganizationContactURL + "?organizationId=" + organizationId;
    return this.endpoint.get<OrganizationContact[]>(url);
  }

  getAllContacts(organizationId) {
    const url = this._getAllOrganizationContactsURL + "?organizationId=" + organizationId;
    return this.endpoint.get<OrganizationContact[]>(url);
  }

  getOrganizationContactByStudyId(organizationId, sponsorSiteStudyCDAInvitationId) {
    const url = this._getOrganizationContactByStudyIdURL + "?organizationId=" + organizationId + "&sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<OrganizationContact[]>(url);
  }

  getAllOrganizationContactByRoleName(organizationInfoId, roleName) {
    const url = this._getAllOrganizationContactByRoleNameURL + "?organizationInfoId=" + organizationInfoId + "&roleName=" + roleName;
    return this.endpoint.get<OrganizationContact[]>(url);
  }

  getAllInvestigatorContact(organizationId) {
    const url = this._getOrganizationInvestigatorContactURL + "?organizationId=" + organizationId;
    return this.endpoint.get<OrganizationContact[]>(url);
  }

  saveContact(organizationContact: OrganizationContact) {
    if (organizationContact.id <= 0 || organizationContact.id == undefined || organizationContact.id == null || organizationContact.createdBy <= 0 || organizationContact.createdBy == null || organizationContact.createdBy == undefined)
      organizationContact.createdBy = this.authService.currentUser.id;
    organizationContact.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(organizationContact, this._saveOrganizationContactURL);
  }

  checkOrganizationContact(organizationContact: OrganizationContact) {
    return this.endpoint.addupdate<boolean>(organizationContact, this._checkOrganizationContactURL);
  }

  deleteContact(id: number) {
    const url = this._deleteOrganizationContactURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  GetOrganizationByContactId(contactId) {
    const url = this._getOrganizationByContactIdURL + "?organizationContactId=" + contactId;
    return this.endpoint.get<OrganizationInfo>(url);
  }

  updateOrganizationContactTypeToHybrid(organizationContactId) {
    var url = this._updateOrganizationContactTypeToHybridURL + "?organizationContactId=" + organizationContactId;
    return this.endpoint.get<boolean>(url);
  }
}

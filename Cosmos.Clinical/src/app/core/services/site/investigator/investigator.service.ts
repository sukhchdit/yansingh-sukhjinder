import { Injectable } from '@angular/core';
import { EndPointService } from '../../endpoint.service';import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MomentDatePipe } from '../../../pipes/momentdate.pipe';
import { environment } from 'src/environments/environment';
import { InvestigatorInfo } from 'src/app/models/site/investigator/investigatorinfo.model';
import { InvestigatorDetailsViewModel } from 'src/app/viewmodels/investigator/investigatordetails.viewmodel';
import { AuthService } from 'src/app/account/services/auth.service';
import { InvestigatorTherapeutic } from 'src/app/models/site/investigator/investigatortherapeutic.model';
import { InvestigatorDocument } from 'src/app/models/site/investigator/investigatordocument.model';
import { InvestigatorClinicalTrialExperience } from 'src/app/models/site/investigator/investigatorclinicaltrialexperience.model';
import { InvestigatorTherapeuticExperienceDetail } from 'src/app/models/site/investigator/investigatortherapeuticexperiencedetail.model';
import { InvestigatorTherapeuticExperienceViewModel } from 'src/app/models/viewmodels/investigatortherapeuticexperienceviewmodel.model';
import { InvestigatorIndicator } from 'src/app/models/site/investigator/investigatorindicator.model';


@Injectable()
export class InvestigatorService {

  port = environment.apiport;

  private readonly _getURL: string = "api/Investigator/Get";
  private readonly _getAllURL: string = "api/Investigator/GetAll";
  private readonly _getAllByRoleNameURL: string = "api/Investigator/GetAllByRoleName";
  private readonly _getDetailsByRoleNameURL: string = "api/Investigator/GetDetailsByRoleName";
  private readonly _getAllForAdminURL: string = "api/Investigator/GetAllForAdmin";
  private readonly _saveURL: string = "api/Investigator/Save";
  private readonly _cloneURL: string = "api/Investigator/Clone";
  private readonly _deleteURL: string = "api/Investigator/Delete";
  private readonly _getByEmailURL: string = "api/Investigator/GetInvestigatorByEmail";

  private readonly _getTherapeuticURL: string = "api/Investigator/GetTherapeutic";
  private readonly _getTherapeuticByInvestigatorIdURL: string = "api/Investigator/GetTherapeuticByInvestigatorId";
  private readonly _getAllTherapeuticURL: string = "api/Investigator/GetAllTherapeutic";
  private readonly _saveTherapeuticURL: string = "api/Investigator/SaveTherapeutic";
  private readonly _deleteTherapeuticURL: string = "api/Investigator/DeleteTherapeutic";

  private readonly _getInvestigatorDocumentURL: string = "api/Investigator/GetInvestigatorDocument";
  private readonly _getAllInvestigatorDocumentByInvestigatorIdURL: string = "api/Investigator/GetAllInvestigatorDocumentByInvestigatorId";
  private readonly _getAllInvestigatorDocumentURL: string = "api/Investigator/GetAllInvestigatorDocument";
  private readonly _saveInvestigatorDocumentURL: string = "api/Investigator/SaveInvestigatorDocument";
  private readonly _deleteUploadedLicenseFileURL: string = "api/Investigator/DeleteUploadedLicenseFile";
  private readonly _deleteInvestigatorDocumentURL: string = "api/Investigator/DeleteInvestigatorDocument";
  //DeleteInvestigatorDocument

  private readonly _getInvestigatorClinicalTrialExperienceURL: string = "api/Investigator/GetInvestigatorClinicalTrialExperience";
  private readonly _saveInvestigatorClinicalTrialExperienceURL: string = "api/Investigator/SaveInvestigatorClinicalTrialExperience";

  private readonly _getInvestigatorIndicatorByInvestigatorIdURL: string = "api/Investigator/GetInvestigatorIndicatorByInvestigatorId";
  private readonly _saveInvestigatorIndicatorURL: string = "api/Investigator/SaveInvestigatorIndicator";

  private readonly _getInvestigatorTherapeuticExperienceDetailByInvestigatorIdURL: string = "api/Investigator/GetInvestigatorTherapeuticExperienceDetailByInvestigatorId";
  private readonly _saveInvestigatorTherapeuticExperienceDetailURL: string = "api/Investigator/SaveInvestigatorTherapeuticExperienceDetail";

  private readonly _uploadLicenseFileURL: string = "api/Investigator/UploadLicenseFile";
  //_uploadLicenceFileURL
  private readonly _getInvestigatorByOrganizationIdURL: string = "api/Investigator/GetInvestigatorByOrganizationId";
  private readonly _getInvestigatorsByOrganizationIdURL: string = "api/Investigator/GetInvestigatorNameByOrganizationId";
  private readonly _getInvestigatorsByOrganizationContactIdURL: string = "api/Investigator/GetInvestigatorNameByOrganizationContactId";
  private readonly _getAllInvestigatorsByOrganizationIdURL: string = "api/Investigator/GetAllInvestigatorsByOrganizationId";
  private readonly _getAllInvestigatorsByOrganizationContactIdURL: string = "api/Investigator/GetAllInvestigatorsByOrganizationContactId";
  private readonly _getInvestigatorExpiringDocumentsURL: string = "api/Investigator/GetInvestigatorExpiringDocuments";
  private readonly _getAllInvestigatorsByOrganizationURL: string = "api/Investigator/GetAllInvestigatorsByOrganization";

  //GetAllInvestigatorsByOrganization

  constructor(private endpoint: EndPointService, private httpClient: HttpClient, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<InvestigatorInfo>(url);
  }

  getByEmail(email) {
    const url = this._getByEmailURL + "?email=" + email;
    return this.endpoint.get<InvestigatorInfo>(url);
  }

  getInvestigatorByOrganizationId(organizationId) {
    const url = this._getInvestigatorByOrganizationIdURL + "?organizationId=" + organizationId;
    return this.endpoint.get<InvestigatorInfo>(url);
  }

  getAllInvestigatorsByOrganization(organizationId) {
    const url = this._getAllInvestigatorsByOrganizationURL + "?organizationInfoId=" + organizationId;
    return this.endpoint.get<InvestigatorDetailsViewModel[]>(url);
  }

  getInvestigatorNamesAndIdByOrganizationId(organizationId) {
    const url = this._getInvestigatorsByOrganizationIdURL + "?organizationId=" + organizationId;
    return this.endpoint.get<any[]>(url);
  }

  getInvestigatorNamesAndIdByOrganizationContactId(organizationContactId) {
    const url = this._getInvestigatorsByOrganizationContactIdURL + "?organizationContactId=" + organizationContactId;
    return this.endpoint.get<any[]>(url);
  }

  getAllInvestigatorsByOrganizationId(organizationId) {
    const url = this._getAllInvestigatorsByOrganizationIdURL + "?organizationId=" + organizationId;
    return this.endpoint.get<any[]>(url);
  }

  getAllInvestigatorsByOrganizationContactId(organizationContactId) {
    const url = this._getAllInvestigatorsByOrganizationContactIdURL + "?organizationContactId=" + organizationContactId;
    return this.endpoint.get<any[]>(url);
  }

  getAll(organizationId) {
    const url = this._getAllURL + "?organizationId=" + organizationId;
    return this.endpoint.get<InvestigatorInfo[]>(url);
  }

  getAllByRoleName(organizationInfoId, roleName) {
    const url = this._getAllByRoleNameURL + "?organizationInfoId=" + organizationInfoId + '&roleName=' + roleName;
    return this.endpoint.get<InvestigatorInfo[]>(url);
  }

  getDetailsByRoleName(organizationInfoId, roleName) {
    const url = this._getDetailsByRoleNameURL + "?organizationInfoId=" + organizationInfoId + '&roleName=' + roleName;
    return this.endpoint.get<InvestigatorDetailsViewModel[]>(url);
  }

  getAllForAdmin() {
    const url = this._getAllForAdminURL;
    return this.endpoint.get<InvestigatorInfo[]>(url);
  }

  save(investigator: InvestigatorInfo) {
    if (investigator.id <= 0 || investigator.id == undefined || investigator.id == null) {
      //investigator.investigatorInfo.organizationInfoId = this.authService.organization.id;
      investigator.createdBy = this.authService.currentUser.id;
    }
    investigator.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<InvestigatorInfo>(investigator, this._saveURL);
  }

  clone(investigator: InvestigatorInfo) {
    investigator.createdBy = this.authService.currentUser.id;
    investigator.createdOn = this.momentDatePipe.currentDate;
    investigator.updatedBy = this.authService.currentUser.id;
    investigator.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<InvestigatorInfo>(investigator, this._cloneURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getTherapeutic(id) {
    const url = this._getTherapeuticURL + "?id=" + id;
    return this.endpoint.get<InvestigatorTherapeutic>(url);
  }

  getTherapeuticByInvestigatorId(investigatorId) {
    const url = this._getTherapeuticByInvestigatorIdURL + "?investigatorId=" + investigatorId;
    return this.endpoint.get<InvestigatorTherapeutic>(url);
  }

  getTherapeuticAll() {
    return this.endpoint.get<InvestigatorTherapeutic[]>(this._getAllTherapeuticURL);
  }

  saveTherapeutic(investigatorTherapeutic: InvestigatorTherapeutic) {
    if (investigatorTherapeutic.id <= 0 || investigatorTherapeutic.id == undefined || investigatorTherapeutic.id==null)
      investigatorTherapeutic.createdBy = this.authService.currentUser.id;
    investigatorTherapeutic.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<InvestigatorTherapeutic>(investigatorTherapeutic, this._saveTherapeuticURL);
  }

  deleteTherapeutic(id: number) {
    const url = this._deleteTherapeuticURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getInvestigatorDocument(id) {
    const url = this._getInvestigatorDocumentURL + "?id=" + id;
    return this.endpoint.get<InvestigatorDocument>(url);
  }

  getInvestigatorExpiringDocuments(id) {
    const url = this._getInvestigatorExpiringDocumentsURL + "?id=" + id;
    return this.endpoint.get<InvestigatorDocument[]>(url);
  }

  getAllInvestigatorDocumentByInvestigatorId(investigatorId) {
    const url = this._getAllInvestigatorDocumentByInvestigatorIdURL + "?investigatorId=" + investigatorId;
    return this.endpoint.get<InvestigatorDocument[]>(url);
  }

  getAllInvestigatorDocument() {
    return this.endpoint.get<InvestigatorDocument[]>(this._getAllInvestigatorDocumentURL);
  }

  saveInvestigatorDocument(investigatorDocumentData) {
    investigatorDocumentData.createdBy = this.authService.currentUser.id;
    investigatorDocumentData.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<InvestigatorDocument>(investigatorDocumentData, this._saveInvestigatorDocumentURL);
  }

  getInvestigatorClinicalTrialExperience(investigatorId) {
    const url = this._getInvestigatorClinicalTrialExperienceURL + "?investigatorId=" + investigatorId;
    return this.endpoint.get<InvestigatorClinicalTrialExperience>(url);
  }
  //DeleteUploadedLicenseFile
  getInvestigatorTherapeuticExperience(investigatorId) {
    const url = this._getInvestigatorTherapeuticExperienceDetailByInvestigatorIdURL + "?investigatorId=" + investigatorId;
    return this.endpoint.get<InvestigatorTherapeuticExperienceDetail[]>(url);
  }

  DeleteUploadedLicenseFile(model) {
    const url = this._deleteUploadedLicenseFileURL;
    return this.endpoint.addupdate<any>(model, url);
  }

  DeleteInvestigatorDocument(model) {
    const url = this._deleteInvestigatorDocumentURL;
    return this.endpoint.addupdate<any>(model, url);
  }

  saveInvestigatorTherapeuticExperience(model: InvestigatorTherapeuticExperienceViewModel) {
    model.investigatorTherapeuticExperienceDetails.forEach(x => {
      if (x.id <= 0 || x.id==undefined || x.id==null)
        x.createdBy = this.authService.currentUser.id;
      x.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<any>(model, this._saveInvestigatorTherapeuticExperienceDetailURL);
  }

  uploadLicenseFile(formData) {
    var url = this.port + this._uploadLicenseFileURL;
    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  saveInvestigatorClinicalTrialExperience(investigatorClinicalTrialExperience: InvestigatorClinicalTrialExperience) {
    if (investigatorClinicalTrialExperience.id <= 0 || investigatorClinicalTrialExperience.id == undefined || investigatorClinicalTrialExperience.id==null)
      investigatorClinicalTrialExperience.createdBy = this.authService.currentUser.id;
    investigatorClinicalTrialExperience.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<InvestigatorClinicalTrialExperience>(investigatorClinicalTrialExperience, this._saveInvestigatorClinicalTrialExperienceURL);
  }

  getInvestigatorIndicatorByInvestigatorId(investigatorId) {
    const url = this._getInvestigatorIndicatorByInvestigatorIdURL + "?investigatorId=" + investigatorId;
    return this.endpoint.get<InvestigatorIndicator[]>(url);
  }

  saveInvestigatorIndicator(indicatorsData) {
    indicatorsData.model.forEach(x => {
      if (x.id <= 0 || x.id==undefined || x.id==null)
        x.createdBy = this.authService.currentUser.id;
      x.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate(indicatorsData, this._saveInvestigatorIndicatorURL);
  }


}

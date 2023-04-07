import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { SuperUserSponsor } from '../../models/superadmin/superusersponsor.model';
import { SponsorInfo } from '../../models/sponsor/sponsorinfo.model';
import { StudyProcedureBudget } from '../../models/studybudget/studyprocedurebudget.model';
import { SponsorStudyProcedureBudgetViewModel } from '../../models/viewmodels/sponsor/sponsorstudyprocedurebudgetviewmodel.model';
import { SiteStudyProcedureBudget } from '../../models/studybudget/sitestudyprocedurebudget.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { SaveStudyBudgetViewModel } from '../../viewmodels/studybudget/savestudybudget.viewmodel';
import { AdditionalStudyChargesBudget } from '../../models/studybudget/additionalstudychargesbudget.model';
import { SaveSiteStudyBudgetViewModel } from '../../viewmodels/studybudget/savesitestudybudget.viewmodel';

@Injectable()
export class StudyProcedureBudgetService {
  private readonly _baseApiUrl: string = "api/StudyBudget";
  private readonly _getStudyProcedureBudgetURL: string = this._baseApiUrl + "/GetStudyProcedureBudget";
  private readonly _getAllStudyProcedureBudgetURL: string = this._baseApiUrl + "/GetAllStudyProcedureBudget";
  private readonly _saveStudyProcedureBudgetURL: string = this._baseApiUrl + "/SaveStudyProcedureBudget";
  private readonly _createStudyProcedureBudgetURL: string = this._baseApiUrl + "/CreateStudyProcedureBudget";
  private readonly _createSiteStudyProcedureBudgetURL: string = this._baseApiUrl + "/CreateSiteStudyProcedureBudget";
  private readonly _deleteStudyProcedureBudgetURL: string = this._baseApiUrl + "/DeleteStudyProcedureBudget";
  private readonly _getSponsorProcedureBudgerBySponsorStudyInfoIdURL: string = this._baseApiUrl + "/GetSponsorProcedureBudgerBySponsorStudyInfoId";

  private readonly _getSiteStudyProcedureBudgetURL: string = this._baseApiUrl + "/GetSiteStudyProcedureBudget";
  private readonly _getSiteAllStudyProcedureBudgetURL: string = this._baseApiUrl + "/GetAllSiteStudyProcedureBudget";
  private readonly _saveSiteStudyProcedureBudgetURL: string = this._baseApiUrl + "/SaveSiteStudyProcedureBudget";
  private readonly _deleteSiteStudyProcedureBudgetURL: string = this._baseApiUrl + "/DeleteSiteStudyProcedureBudget";

  private readonly _getAdditionalStudyChargesBudgetURL: string = this._baseApiUrl + "/GetAdditionalStudyChargesBudget";
  private readonly _getAllAdditionalStudyChargesBudgetURL: string = this._baseApiUrl + "/GetAllAdditionalStudyChargesBudget";
  private readonly _saveAdditionalStudyChargesBudgetURL: string = this._baseApiUrl + "/SaveAdditionalStudyChargesBudget";
  private readonly _deleteAdditionalStudyChargesBudgetURL: string = this._baseApiUrl + "/DeleteAdditionalStudyChargesBudget";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  getStudyProcedureBudget(id) {
    const url = this._getStudyProcedureBudgetURL + "?id=" + id;
    return this.endpoint.get<SuperUserSponsor>(url);
  }

  getAllStudyProcedureBudget(userId) {
    const url = this._getAllStudyProcedureBudgetURL + "?id=" + userId;
    return this.endpoint.get<SponsorInfo[]>(url);
  }

  saveStudyProcedureBudget(studyProcedureBudget: StudyProcedureBudget) {

    if (studyProcedureBudget.id <= 0 || studyProcedureBudget.id == null || studyProcedureBudget.id == undefined) {
      studyProcedureBudget.createdBy = this.authService.currentUser.id;
      studyProcedureBudget.createdOn = this.momentDatePipe.currentDate;
    }
    studyProcedureBudget.updatedBy = this.authService.currentUser.id;
    studyProcedureBudget.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<StudyProcedureBudget>(studyProcedureBudget, this._saveStudyProcedureBudgetURL);
  }

  createStudyProcedureBudget(studyProcedureBudget: SaveStudyBudgetViewModel) {

    if (studyProcedureBudget.model.id <= 0 || studyProcedureBudget.model.id == null || studyProcedureBudget.model.id == undefined) {
      studyProcedureBudget.model.createdBy = this.authService.currentUser.id;
      studyProcedureBudget.model.createdOn = this.momentDatePipe.currentDate;
      studyProcedureBudget.model.status = true;
    }
    studyProcedureBudget.model.updatedBy = this.authService.currentUser.id;
    studyProcedureBudget.model.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<StudyProcedureBudget>(studyProcedureBudget, this._createStudyProcedureBudgetURL);
  }

  createSiteStudyProcedureBudget(studyProcedureBudget: SaveSiteStudyBudgetViewModel) {

    if (studyProcedureBudget.model.id <= 0 || studyProcedureBudget.model.id == null || studyProcedureBudget.model.id == undefined) {
      studyProcedureBudget.model.createdBy = this.authService.currentUser.id;
      studyProcedureBudget.model.createdOn = this.momentDatePipe.currentDate;
      studyProcedureBudget.model.status = true;
    }
    studyProcedureBudget.model.updatedBy = this.authService.currentUser.id;
    studyProcedureBudget.model.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<StudyProcedureBudget>(studyProcedureBudget, this._createSiteStudyProcedureBudgetURL);
  }

  deleteSuperUserSponsor(id) {
    const url = this._deleteStudyProcedureBudgetURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
  getSponsorProcedureBudgerBySponsorStudyInfoId(sponsorStudyInfoId) {
    const url = this._getSponsorProcedureBudgerBySponsorStudyInfoIdURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<SponsorStudyProcedureBudgetViewModel[]>(url);
  }


  getSiteAllStudyProcedureBudget(userId) {
    const url = this._getSiteAllStudyProcedureBudgetURL + "?id=" + userId;
    return this.endpoint.get<SiteStudyProcedureBudget[]>(url);
  }

  saveSiteStudyProcedureBudget(siteStudyProcedureBudgets: SiteStudyProcedureBudget[]) {
    siteStudyProcedureBudgets.forEach(studyProcedureBudget => {
      if (studyProcedureBudget.id <= 0 || studyProcedureBudget.id == null || studyProcedureBudget.id == undefined) {
        studyProcedureBudget.createdBy = this.authService.currentUser.id;
        studyProcedureBudget.createdOn = new Date();
      }
      studyProcedureBudget.updatedBy = this.authService.currentUser.id;
      studyProcedureBudget.updatedOn = new Date();
    });
    return this.endpoint.addupdate<SiteStudyProcedureBudget[]>(siteStudyProcedureBudgets, this._saveSiteStudyProcedureBudgetURL);
  }

  deleteSiteStudyProcedureBudget(id) {
    const url = this._deleteSiteStudyProcedureBudgetURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
  getSiteProcedureBudgerBySponsorSiteStudyCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    const url = this._getSiteStudyProcedureBudgetURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<SponsorStudyProcedureBudgetViewModel[]>(url);
  }

  getAdditionalStudyChargesBudget(id) {
    const url = this._getAdditionalStudyChargesBudgetURL + "?id=" + id;
    return this.endpoint.get<AdditionalStudyChargesBudget>(url);
  }

  getAllAdditionalStudyChargesBudget(studyBudgetVersionArmId) {
    const url = this._getAllAdditionalStudyChargesBudgetURL + "?studyBudgetVersionArmId=" + studyBudgetVersionArmId;
    return this.endpoint.get<AdditionalStudyChargesBudget[]>(url);
  }

  saveAdditionalStudyChargesBudget(additionalStudyChargesBudget: AdditionalStudyChargesBudget) {
    if (additionalStudyChargesBudget.id <= 0 || additionalStudyChargesBudget.id == null || additionalStudyChargesBudget.id == undefined) {
      additionalStudyChargesBudget.createdBy = this.authService.currentUser.id;
      additionalStudyChargesBudget.createdOn = this.momentDatePipe.currentDate;
      }
    additionalStudyChargesBudget.updatedBy = this.authService.currentUser.id;
    additionalStudyChargesBudget.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<AdditionalStudyChargesBudget>(additionalStudyChargesBudget, this._saveAdditionalStudyChargesBudgetURL);
  }

  deleteAdditionalStudyChargesBudget(id) {
    const url = this._deleteAdditionalStudyChargesBudgetURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}

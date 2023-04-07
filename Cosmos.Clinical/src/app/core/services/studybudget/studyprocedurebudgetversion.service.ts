import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { StudyProcedureBudgetVersion } from '../../models/studybudget/studyprocedurebudgetversion.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { StudyBudgetVersionDiscussion } from '../../models/studybudget/studybudgetversiondiscussion.model';

@Injectable()
export class StudyProcedureBudgetVersionService {
  private readonly _baseApiUrl: string = "api/StudyProcedureBudgetVersion";
  private readonly _getURL: string = this._baseApiUrl + "/Get";
  private readonly _getWithJsonURL: string = this._baseApiUrl + "/GetWithJson";
  private readonly _getBySponsorStudyInfoIdURL: string = this._baseApiUrl + "/GetBySponsorStudyInfoId";
  private readonly _getAllURL: string = this._baseApiUrl + "/GetAll";
  private readonly _getAllByArmIdURL: string = this._baseApiUrl + "/GetAllByArmId";
  private readonly _getAllWithStudyInfoURL: string = this._baseApiUrl + "/GetAllWithStudyInfo";
  private readonly _getAllBySponsorInfoIdURL: string = this._baseApiUrl + "/GetAllBySponsorInfoId";
  private readonly _getAwaitingApprovalsURL: string = this._baseApiUrl + "/GetAwaitingApprovals";
  private readonly _getQaAwaitingApprovalsURL: string = this._baseApiUrl + "/GetQaAwaitingApprovals";
  private readonly _saveURL: string = this._baseApiUrl + "/Save";
  private readonly _cloneURL: string = this._baseApiUrl + "/Clone";
  private readonly _deleteURL: string = this._baseApiUrl + "/Delete";
  private readonly _sendForQaApprovalURL: string = this._baseApiUrl + "/SendForQaApproval";
  private readonly _disapprovedByQaURL: string = this._baseApiUrl + "/DisapprovedByQa";
  private readonly _sendForFinalApprovalURL: string = this._baseApiUrl + "/SendForFinalApproval";
  private readonly _disapprovedByFinalApproverURL: string = this._baseApiUrl + "/DisapprovedByFinalApprover";
  private readonly _approveBudgetVersionURL: string = this._baseApiUrl + "/ApproveBudgetVersion";

  private readonly _saveDiscussionURL: string = this._baseApiUrl + "/SaveDiscussion";
  private readonly _createDiscussionForQaURL: string = this._baseApiUrl + "/CreateDiscussionForQa";
  private readonly _createDiscussionForFinalApproverURL: string = this._baseApiUrl + "/CreateDiscussionForFinalApprover";
  private readonly _getDiscussionURL: string = this._baseApiUrl + "/GetDiscussion";
  private readonly _getAllDiscussionsURL: string = this._baseApiUrl + "/GetAllDiscussions";
  private readonly _deleteDiscussionURL: string = this._baseApiUrl + "/DeleteDiscussion";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudyProcedureBudgetVersion>(url);
  }

  getWithJson(id) {
    const url = this._getWithJsonURL + "?id=" + id;
    return this.endpoint.get<StudyProcedureBudgetVersion>(url);
  }

  getBySponsorStudyInfoId(sponsorStudyInfoId) {
    const url = this._getBySponsorStudyInfoIdURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<StudyProcedureBudgetVersion>(url);
  }

  getAll(sponsorStudyInfoId) {
    const url = this._getAllURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<StudyProcedureBudgetVersion[]>(url);
  }

  getAllByArmId(sponsorStudyArmId, withStudyInfo) {
    const url = this._getAllByArmIdURL + "?sponsorStudyArmId=" + sponsorStudyArmId + "&withStudyInfo=" + withStudyInfo;
    return this.endpoint.get<StudyProcedureBudgetVersion[]>(url);
  }

  getAllWithStudyInfo(sponsorStudyInfoId) {
    const url = this._getAllWithStudyInfoURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<StudyProcedureBudgetVersion[]>(url);
  }

  getAllBySponsorInfoId(sponsorInfoId) {
    const url = this._getAllBySponsorInfoIdURL + "?sponsorInfoId=" + sponsorInfoId;
    return this.endpoint.get<StudyProcedureBudgetVersion[]>(url);
  }

  getAwaitingApprovals(approvedBy) {
    const url = this._getAwaitingApprovalsURL + "?approvedBy=" + approvedBy;
    return this.endpoint.get<StudyProcedureBudgetVersion[]>(url);
  }

  getQaAwaitingApprovals(qaApprovedBy) {
    const url = this._getQaAwaitingApprovalsURL + "?qaApprovedBy=" + qaApprovedBy;
    return this.endpoint.get<StudyProcedureBudgetVersion[]>(url);
  }

  save(studyProcedureBudgetVersion: StudyProcedureBudgetVersion) {
    if (studyProcedureBudgetVersion.id <= 0 || studyProcedureBudgetVersion.id == null || studyProcedureBudgetVersion.id == undefined) {
      studyProcedureBudgetVersion.createdBy = this.authService.currentUser.id;
      studyProcedureBudgetVersion.createdOn = this.momentDatePipe.currentDate;
      }
    studyProcedureBudgetVersion.updatedBy = this.authService.currentUser.id;
    studyProcedureBudgetVersion.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<StudyProcedureBudgetVersion>(studyProcedureBudgetVersion, this._saveURL);
  }

  clone(studyProcedureBudgetVersionId) {    
    return this.endpoint.addupdate<StudyProcedureBudgetVersion>({ studyProcedureBudgetVersionId: studyProcedureBudgetVersionId, userId: this.authService.currentUser.id, dateNow: this.momentDatePipe.currentDate }, this._cloneURL);
  }

  sendForQaApproval(studyProcedureBudgetVersion: StudyProcedureBudgetVersion) {
    studyProcedureBudgetVersion.updatedBy = this.authService.currentUser.id;
    studyProcedureBudgetVersion.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<boolean>(studyProcedureBudgetVersion, this._sendForQaApprovalURL);
  }

  disapprovedByQa(studyProcedureBudgetVersion: StudyProcedureBudgetVersion) {
    studyProcedureBudgetVersion.updatedBy = this.authService.currentUser.id;
    studyProcedureBudgetVersion.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<boolean>(studyProcedureBudgetVersion, this._disapprovedByQaURL);
  }

  sendForFinalApproval(studyProcedureBudgetVersion: StudyProcedureBudgetVersion) {
    studyProcedureBudgetVersion.updatedBy = this.authService.currentUser.id;
    studyProcedureBudgetVersion.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<boolean>(studyProcedureBudgetVersion, this._sendForFinalApprovalURL);
  }

  disapprovedByFinalApprover(studyProcedureBudgetVersion: StudyProcedureBudgetVersion) {
    studyProcedureBudgetVersion.updatedBy = this.authService.currentUser.id;
    studyProcedureBudgetVersion.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<boolean>(studyProcedureBudgetVersion, this._disapprovedByFinalApproverURL);
  }

  approveBudgetVersion(studyProcedureBudgetVersion: StudyProcedureBudgetVersion) {
    studyProcedureBudgetVersion.updatedBy = this.authService.currentUser.id;
    studyProcedureBudgetVersion.updatedOn = this.momentDatePipe.currentDate;
    studyProcedureBudgetVersion.approvedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<boolean>(studyProcedureBudgetVersion, this._approveBudgetVersionURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  saveDiscussion(model: StudyBudgetVersionDiscussion) {
    if (model.id <= 0 || model.id == null || model.id == undefined) {
      model.createdBy = this.authService.currentUser.id;
      model.createdOn = this.momentDatePipe.currentDate;
    }
    model.updatedBy = this.authService.currentUser.id;
    model.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<StudyBudgetVersionDiscussion>(model, this._saveDiscussionURL);
  }

  createDiscussionForQa(model: StudyBudgetVersionDiscussion) {
    if (model.id <= 0 || model.id == null || model.id == undefined) {
      model.createdBy = this.authService.currentUser.id;
      model.createdOn = this.momentDatePipe.currentDate;
    }
    model.updatedBy = this.authService.currentUser.id;
    model.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<StudyBudgetVersionDiscussion>(model, this._createDiscussionForQaURL);
  }

  createDiscussionForFinalApprover(model: StudyBudgetVersionDiscussion) {
    if (model.id <= 0 || model.id == null || model.id == undefined) {
      model.createdBy = this.authService.currentUser.id;
      model.createdOn = this.momentDatePipe.currentDate;
    }
    model.updatedBy = this.authService.currentUser.id;
    model.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<StudyBudgetVersionDiscussion>(model, this._createDiscussionForFinalApproverURL);
  }

  getDiscussion(id) {
    const url = this._getDiscussionURL + "?id=" + id;
    return this.endpoint.get<StudyBudgetVersionDiscussion>(url);
  }

  getAllDiscussions(studyProcedureBudgetVersionId) {
    const url = this._getAllDiscussionsURL + "?studyProcedureBudgetVersionId=" + studyProcedureBudgetVersionId;
    return this.endpoint.get<StudyBudgetVersionDiscussion[]>(url);
  }

  deleteDiscussion(id) {
    const url = this._deleteDiscussionURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}

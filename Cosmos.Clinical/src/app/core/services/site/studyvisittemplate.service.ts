import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudyVisitTemplate } from '../../models/site/studyvisittemplate.model';
import { AuthService } from '../account/auth.service';
import { StudyVisitTrackingLastSavedViewModel } from '../../viewmodels/site/studyvisittrackinglastsaved.viewmodel';
import { StudyVisitTrackingNextPreviousViewModel } from '../../viewmodels/site/studyvisittrackingnextprevious.viewmodel';

@Injectable()
export class StudyVisitTemplateService {
  private readonly _getURL: string = "api/StudyVisitTemplate/Get";
  private readonly _getAllURL: string = "api/StudyVisitTemplate/GetAll";
  private readonly _getAllByArmURL: string = "api/StudyVisitTemplate/GetAllByArm";
  private readonly _getAllParentIdURL: string = "api/StudyVisitTemplate/GetAllByParentId";
  private readonly _getVisitTrackingInJsonURL: string = "api/StudyVisitTemplate/GetVisitTrackingInJson";
  private readonly _getVisitTrackingLastSavedURL: string = "api/StudyVisitTemplate/GetVisitTrackingLastSaved";
  private readonly _getVisitTrackingNextPreviousURL: string = "api/StudyVisitTemplate/GetVisitTrackingNextPrevious";
  private readonly _saveURL: string = "api/StudyVisitTemplate/Save";
  private readonly _saveSubVisitURL: string = "api/StudyVisitTemplate/SaveSubVisit";
  private readonly _deleteURL: string = "api/StudyVisitTemplate/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudyVisitTemplate>(url);
  }

  getAll(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<StudyVisitTemplate[]>(this._getAllURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  getAllByArm(sponsorStudyArmId, sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<StudyVisitTemplate[]>(this._getAllByArmURL + "?sponsorStudyArmId=" + sponsorStudyArmId + "&sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  getAllParentId(parentId) {
    return this.endpoint.get<StudyVisitTemplate[]>(this._getAllParentIdURL + "?parentId=" + parentId);
  }

  getVisitTrackingInJson(sponsorSiteStudyCDAInvitationId, sponsorStudyArmId) {
    return this.endpoint.get<any>(this._getVisitTrackingInJsonURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId + "&sponsorStudyArmId=" + sponsorStudyArmId);
  }

  getVisitTrackingLastSaved(studyVisitTemplateId, studySubjectId) {
    return this.endpoint.get<StudyVisitTrackingLastSavedViewModel>(this._getVisitTrackingLastSavedURL + "?studyVisitTemplateId=" + studyVisitTemplateId + "&studySubjectId=" + studySubjectId);
  }

  getVisitTrackingNextPrevious(studyVisitTemplateId, studySubjectId, isWashoutRequired) {
    return this.endpoint.get<StudyVisitTrackingNextPreviousViewModel>(this._getVisitTrackingNextPreviousURL + "?studyVisitTemplateId=" + studyVisitTemplateId + "&studySubjectId=" + studySubjectId + "&isWashoutRequired=" + isWashoutRequired);
  }

  save(studyVisitTemplates: StudyVisitTemplate[], sponsorSiteStudyCDAInvitationId, sponsorStudyArmId) {
    studyVisitTemplates.forEach(studyVisitTemplate => {
      if (studyVisitTemplate.id <= 0 || studyVisitTemplate.id == null || studyVisitTemplate.id == undefined)
        studyVisitTemplate.createdBy = this.authService.currentUser.id;
      studyVisitTemplate.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<boolean>(studyVisitTemplates, this._saveURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId + "&sponsorStudyArmId=" + sponsorStudyArmId);
  }

  saveSubVisit(studyVisitTemplates: StudyVisitTemplate[], parentId) {
    studyVisitTemplates.forEach(studyVisitTemplate => {
      if (studyVisitTemplate.id <= 0 || studyVisitTemplate.id == null || studyVisitTemplate.id == undefined)
        studyVisitTemplate.createdBy = this.authService.currentUser.id;
      studyVisitTemplate.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<boolean>(studyVisitTemplates, this._saveSubVisitURL + "?parentId=" + parentId);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}

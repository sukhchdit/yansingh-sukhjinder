import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { SponsorStudyVisitTemplate } from '../../models/sponsor/sponsorstudyvisittemplate.model';

@Injectable()
export class SponsorStudyVisitTemplateService {
  private readonly _getURL: string = "api/SponsorStudyVisitTemplate/Get";
  private readonly _getAllURL: string = "api/SponsorStudyVisitTemplate/GetAll";
  private readonly _getAllByArmIdURL: string = "api/SponsorStudyVisitTemplate/GetAllByArmId";
  private readonly _getAllParentIdURL: string = "api/SponsorStudyVisitTemplate/GetAllByParentId";
  private readonly _saveURL: string = "api/SponsorStudyVisitTemplate/Save";
  private readonly _saveWithArmIdURL: string = "api/SponsorStudyVisitTemplate/SaveWithArmId";
  private readonly _saveSubVisitURL: string = "api/SponsorStudyVisitTemplate/SaveSubVisit";
  private readonly _deleteURL: string = "api/SponsorStudyVisitTemplate/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyVisitTemplate>(url);
  }

  getAll(sponsorStudyInfoId) {
    return this.endpoint.get<SponsorStudyVisitTemplate[]>(this._getAllURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  getAllByArmId(sponsorStudyArmId) {
    return this.endpoint.get<SponsorStudyVisitTemplate[]>(this._getAllByArmIdURL + "?sponsorStudyArmId=" + sponsorStudyArmId);
  }

  getAllParentId(parentId) {
    return this.endpoint.get<SponsorStudyVisitTemplate[]>(this._getAllParentIdURL + "?parentId=" + parentId);
  }

  save(studyVisitTemplates: SponsorStudyVisitTemplate[], sponsorStudyInfoId) {
    studyVisitTemplates.forEach(studyVisitTemplate => {
      if (studyVisitTemplate.id <= 0 || studyVisitTemplate.id == null || studyVisitTemplate.id == undefined)
        studyVisitTemplate.createdBy = this.authService.currentUser.id;
      studyVisitTemplate.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<boolean>(studyVisitTemplates, this._saveURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  saveWithArmId(studyVisitTemplates: SponsorStudyVisitTemplate[], sponsorStudyArmId) {
    studyVisitTemplates.forEach(studyVisitTemplate => {
      if (studyVisitTemplate.id <= 0 || studyVisitTemplate.id == null || studyVisitTemplate.id == undefined)
        studyVisitTemplate.createdBy = this.authService.currentUser.id;
      studyVisitTemplate.updatedBy = this.authService.currentUser.id;
    });
    return this.endpoint.addupdate<boolean>(studyVisitTemplates, this._saveWithArmIdURL + "?sponsorStudyArmId=" + sponsorStudyArmId);
  }

  saveSubVisit(studyVisitTemplates: SponsorStudyVisitTemplate[], parentId) {
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

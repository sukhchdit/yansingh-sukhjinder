import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../account/auth.service';
import { SponsorStudyeDiary } from '../../models/sponsor/sponsorstudyediary.model';
import { StudyeDiaryViewModel } from '../../viewmodels/ediary/studyediaryviewmodel.model';
import { SponsorStudyeDiaryQuestionnaire } from '../../models/sponsor/sponsorstudyediaryquestionnaire.model';
import { eDiarySection } from '../../models/ediary/ediarysection.model';
import { SectionViewModel } from '../../viewmodels/ediary/section.viewmodel';
import { SponsorStudyArchiveeDiary } from '../../models/sponsor/sponsorstudyarchiveediary.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';

@Injectable()
export class SponsorStudyeDiaryService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/SponsorStudyeDiary";

  private readonly _getSponsorStudyeDiaryURL: string = this._baseApiUrl + "/GetSponsorStudyeDiary";
  private readonly _getAllSponsorStudyeDiaryURL: string = this._baseApiUrl + "/GetAllSponsorStudyeDiary";
  private readonly _saveSponsorStudyeDiaryURL: string = this._baseApiUrl + "/SaveSponsorStudyeDiary";
  private readonly _updateSponsorStudyeDiaryVersionApprovedURL: string = this._baseApiUrl + "/UpdateSponsorStudyeDiaryVersionApproved";
  private readonly _updateSponsorStudyArchiveeDiaryVersionApprovedURL: string = this._baseApiUrl + "/UpdateSponsorStudyArchiveeDiaryVersionApproved";  
  private readonly _deleteSponsorStudyeDiaryURL: string = this._baseApiUrl + "/DeleteSponsorStudyeDiary";

  private readonly _getSponsorStudyeDiaryQuestionnaireURL: string = this._baseApiUrl + "/GetSponsorStudyeDiaryQuestionnaire";
  private readonly _getAllSponsorStudyeDiaryQuestionnaireURL: string = this._baseApiUrl + "/GetAllSponsorStudyeDiaryQuestionnaire";
  private readonly _saveSponsorStudyeDiaryQuestionnaireURL: string = this._baseApiUrl + "/SaveSponsorStudyeDiaryQuestionnaire";
  private readonly _deleteSponsorStudyeDiaryQuestionnaireURL: string = this._baseApiUrl + "/DeleteSponsorStudyeDiaryQuestionnaire";
  private readonly _getSavedSectionURL: string = this._baseApiUrl + "/GetSavedSection";
  private readonly _getSponsorStudyeDiaryBySponsorStudyeDiaryIdURL: string = this._baseApiUrl + "/GetSponsorStudyeDiaryBySponsorStudyeDiaryId";
  private readonly _geteDiaryVersionListURL: string = this._baseApiUrl + "/GeteDiaryVersionList";


  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) { }

  geteDiary(id) {
    const url = this._getSponsorStudyeDiaryURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyeDiary>(url);
  }

  getAlleDiary(sponsorStudyInfoId) {
    return this.endpoint.get<SponsorStudyeDiary[]>(this._getAllSponsorStudyeDiaryURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  saveeDiary(eDiary: SponsorStudyeDiary) {
    if (eDiary.id <= 0 || eDiary.id == null || eDiary.id == undefined) {
      eDiary.createdBy = this.authService.organization.id;
      eDiary.createdOn = this.momentDatePipe.currentDate;
    }
    else {
      eDiary.updatedOn = this.momentDatePipe.currentDate;
      eDiary.updatedBy = this.authService.currentUser.organizationContactId;
    } 
    return this.endpoint.addupdate<SponsorStudyeDiary>(eDiary, this._saveSponsorStudyeDiaryURL);
  }

  updateSponsorStudyeDiaryVersionApproved(id, isVersionApproved) {
    const url = this._updateSponsorStudyeDiaryVersionApprovedURL + "?id=" + id + "&isVersionApproved=" + isVersionApproved;
    return this.endpoint.get<boolean>(url);
  }

  updateSponsorStudyArchiveeDiaryVersionApproved(id, isVersionApproved) {
    const url = this._updateSponsorStudyArchiveeDiaryVersionApprovedURL + "?id=" + id + "&isVersionApproved=" + isVersionApproved;
    return this.endpoint.get<boolean>(url);
  }

  deleteeDiary(id) {
    const url = this._deleteSponsorStudyeDiaryURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  geteDiaryQuestionnaire(id) {
    const url = this._getSponsorStudyeDiaryQuestionnaireURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyeDiaryQuestionnaire>(url);
  }

  getAlleDiaryQuestionnaire(sponsorStudyeDiaryId) {
    return this.endpoint.get<SponsorStudyeDiaryQuestionnaire[]>(this._getAllSponsorStudyeDiaryQuestionnaireURL + "?sponsorStudyeDiaryId=" + sponsorStudyeDiaryId);
  }

  saveeDiaryQuestionnaire(eDiaryQuestionnaire: StudyeDiaryViewModel) {    
    return this.endpoint.addupdate<SponsorStudyeDiaryQuestionnaire>(eDiaryQuestionnaire, this._saveSponsorStudyeDiaryQuestionnaireURL);
  }

  deleteSponsorStudyeDiaryQuestionnaire(sponsorStudyeDiaryId, sectionId) {
    const url = this._deleteSponsorStudyeDiaryQuestionnaireURL + "?sponsorStudyeDiaryId=" + sponsorStudyeDiaryId + "&sectionId=" + sectionId;
    return this.endpoint.get<boolean>(url);
  }

  getSavedSection(organizationInfoId, sponsorStudyeDiaryId) {
    return this.endpoint.get<eDiarySection[]>(this._getSavedSectionURL + "?organizationInfoId=" + organizationInfoId + "&sponsorStudyeDiaryId=" + sponsorStudyeDiaryId);
  }

  getSponsorStudyeDiaryBySponsorStudyeDiaryId(sponsorStudyeDiaryId, studySubjecteDiaryId) {
    return this.endpoint.get<SectionViewModel[]>(this._getSponsorStudyeDiaryBySponsorStudyeDiaryIdURL + "?sponsorStudyeDiaryId=" + sponsorStudyeDiaryId + "&studySubjecteDiaryId=" + studySubjecteDiaryId);
  }

  geteDiaryVersionList(eDiaryId) {
    return this.endpoint.get<SponsorStudyArchiveeDiary[]>(this._geteDiaryVersionListURL + "?eDiaryId=" + eDiaryId);
  }
}

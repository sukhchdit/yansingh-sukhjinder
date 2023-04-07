import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { SectionViewModel } from '../../models/viewmodels/questionnaire/section.viewmodel';


@Injectable()
export class SiteQuestionnaireService {

  private readonly _baseApiUrl: string = "api/SiteQuestionnaire/";

  private readonly _saveSiteStudyQuestionnaireURL: string = this._baseApiUrl + "SaveSiteStudyQuestionnaire";
  private readonly _updateTextAnswerURL: string = this._baseApiUrl + "UpdateTextAnswer";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  saveSiteStudyQuestionnaire(sections: SectionViewModel[], sponsorSiteStudyCDAInvitationId: number) {
    return this.endpoint.addupdate<boolean>(sections, this._saveSiteStudyQuestionnaireURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  updateTextAnswer(id: number, isAnswerCorrect: boolean) {
    return this.endpoint.get<boolean>(this._updateTextAnswerURL + "?id=" + id + "&isAnswerCorrect=" + isAnswerCorrect);
  }

}

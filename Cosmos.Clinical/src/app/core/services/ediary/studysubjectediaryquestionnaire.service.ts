import { Injectable } from '@angular/core';
import { SectionViewModel } from '../../viewmodels/ediary/section.viewmodel';
import { EndPointService } from '../endpoint.service';



@Injectable()
export class StudySubjecteDiaryQuestionnaireService {

  private readonly _baseApiUrl: string = "api/StudySubjecteDiaryQuestionnaire/";

  private readonly _saveStudySubjecteDiaryQuestionnaireURL: string = this._baseApiUrl + "SaveStudySubjecteDiaryQuestionnaire";
  private readonly _updateTextAnswerURL: string = this._baseApiUrl + "UpdateTextAnswer";

  constructor(private endpoint: EndPointService) {

  }

  saveStudySubjecteDiaryQuestionnaire(sections: SectionViewModel[], eDiaryKey: string) {
    return this.endpoint.addupdate<boolean>(sections, this._saveStudySubjecteDiaryQuestionnaireURL + "?eDiaryKey=" + eDiaryKey);
  }

  updateTextAnswer(id: number, isAnswerCorrect: boolean) {
    return this.endpoint.get<boolean>(this._updateTextAnswerURL + "?id=" + id + "&isAnswerCorrect=" + isAnswerCorrect);
  }

}

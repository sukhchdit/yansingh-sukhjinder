import { BaseEntity } from '../baseentity.model';
import { StudySubjecteDiaryOption } from './studysubjectediaryoption.model';

export class StudySubjecteDiaryQuestionnaire extends BaseEntity {

  answer: string;
  isAnswerCorrect: boolean;
  studyOptions: StudySubjecteDiaryOption[] = [];

  sponsorStudyeDiaryQuestionnaireId: number;
  studySubjecteDiaryId: number;

}

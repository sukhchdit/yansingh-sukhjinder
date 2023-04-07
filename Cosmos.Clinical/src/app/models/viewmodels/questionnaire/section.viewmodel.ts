import { StudyQuestionnaireAnswerViewModel } from './studyquestionnaireanswer.viewmodel';

export class SectionViewModel {

  id: number;
  sectionName: string;
  sortOrder: number;
  studyQuestionnaire: StudyQuestionnaireAnswerViewModel[] = [];

  organizationInfoId: number;

}

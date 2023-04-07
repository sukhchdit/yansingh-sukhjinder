import { ControlType } from '../../models/ediary/ediaryquestionnairetemplate.model';
import { StudyeDiaryOptionViewModel } from './studyediaryoption.viewmodel';

export class StudyeDiaryAnswerViewModel {
  
  id: number;
  title: string;
  controlType: ControlType;
  isNumeric: boolean;
  maxLength: number;
  sortOrder: number;
  studyOptions: StudyeDiaryOptionViewModel[] = [];
  answer: string;
  isAnswerCorrect: boolean;
  siteStudyeDiaryId: number;
  parentId: number;

  sectionId: number;
  sponsorStudyeDiaryId: number;

}

import { ControlType } from '../../questionnaire/questionnairetemplate.model';
import { StudyOptionViewModel } from './studyoption.viewmodel';

export enum HeightUnit { cm = 1, inches }
export enum WeightUnit { kg = 1, lbs }
export enum TempratureUnit { celsius = 1, fahrenheit }

export class StudyQuestionnaireAnswerViewModel {
  
  id: number;
  title: string;
  controlType: ControlType;
  isNumeric: boolean;
  maxLength: number;
  minValue: number;
  maxValue: number;
  sortOrder: number;
  studyOptions: StudyOptionViewModel[] = [];
  answer: string;
  isAnswerCorrect: boolean;
  siteStudyQuestionnaireId: number;
  parentId: number;
  childQuestionnaires: StudyQuestionnaireAnswerViewModel[] = [];

  sectionId: number;
  sponsorStudyInfoId: number;

}

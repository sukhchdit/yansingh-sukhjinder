import { BaseEntity } from '../../baseentity.model';
import { ControlType } from './esourcequestionnairetemplate.model';
import { eSourceSubjectOption } from './esourcesubjectoption.model';

export class eSourceSubjectQuestionnaire extends BaseEntity {
  constructor() {
    super();
    this.controlType = 0;
    this.isNumeric = false;
    this.studyOptions = [];
  }

  title: string;
  controlType: ControlType;
  isNumeric: boolean;
  maxLength: number;
  parentId: number;
  minValue: number;
  maxValue: number;
  sortOrder: number;
  answer: string;
  isAnswerCorrect: boolean;
  esourceQuestionnaireId: number;
  isRequired: boolean;
  imageFile: any;
  visitSummary: boolean;

  studyOptions: eSourceSubjectOption[] = [];

  childQuestionnaires: any[];

  sectionId: number;
  studyVisitTrackingProcedureId: number;
}

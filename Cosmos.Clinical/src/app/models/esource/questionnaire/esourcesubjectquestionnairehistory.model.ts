import { BaseEntity } from '../../baseentity.model';
import { eSourceSubjectOptionHistory } from './esourcesubjectoptionhistory.model';

export class eSourceSubjectQuestionnaireHistory extends BaseEntity {
  constructor() {
    super();
    this.studyOptions = [];
  }
  answer: string;
  isAnswerCorrect: boolean;
  
  studyOptions: eSourceSubjectOptionHistory[] = [];
    
  esourceSubjectQuestionnaireId: number;
}

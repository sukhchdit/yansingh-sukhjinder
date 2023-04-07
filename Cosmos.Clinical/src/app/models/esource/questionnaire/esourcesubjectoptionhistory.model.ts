import { BaseEntity } from '../../baseentity.model';

export class eSourceSubjectOptionHistory extends BaseEntity {
  constructor() {
    super();
    this.status = true;
  }

  label: string;
  isRightAnswer: boolean;
  isAnswer: boolean;

  eSourceSubjectQuestionnaireHistoryId: number;

}

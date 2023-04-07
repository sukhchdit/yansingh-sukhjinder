import { BaseEntity } from '../../baseentity.model';

export class eSourceSubjectOption extends BaseEntity {
  constructor() {
    super();
    this.status = true;
  }

  label: string;
  isRightAnswer: boolean;
  isAnswer: boolean;

  eSourceSubjectQuestionnaireId: number;

}

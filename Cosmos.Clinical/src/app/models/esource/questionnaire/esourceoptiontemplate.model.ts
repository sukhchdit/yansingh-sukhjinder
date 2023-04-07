import { BaseEntity } from '../../baseentity.model';

export class eSourceOptionTemplate extends BaseEntity {
  constructor() {
    super();
    this.status = true;
  }

  label: string;
  isRightAnswer: boolean;
  isAdverseEvent: boolean;

  eSourceQuestionnaireTemplateId: number;

}

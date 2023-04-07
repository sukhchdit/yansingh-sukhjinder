import { BaseEntity } from '../../baseentity.model';

export class CommonOptionTemplate extends BaseEntity {
  constructor() {
    super();
    this.status = true;
  }

  label: string;
  isRightAnswer: boolean;

  commonQuestionnaireTemplateId: number;

}

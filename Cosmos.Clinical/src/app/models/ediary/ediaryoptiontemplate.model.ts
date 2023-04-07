import { BaseEntity } from '../baseentity.model';

export class eDiaryOptionTemplate extends BaseEntity {
  constructor() {
    super();
    this.status = true;
  }

  label: string;
  isRightAnswer: boolean;
  isAdverseEvent: boolean;

  eDiaryQuestionnaireTemplateId: number;

}

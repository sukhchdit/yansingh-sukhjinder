import { BaseEntity } from '../baseentity.model';

export class OptionTemplate extends BaseEntity {

  label: string;
  isRightAnswer: boolean;

  questionnaireTemplateId: number;

}

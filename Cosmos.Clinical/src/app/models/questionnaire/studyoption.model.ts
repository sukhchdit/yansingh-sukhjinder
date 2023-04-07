import { BaseEntity } from '../baseentity.model';

export class StudyOption extends BaseEntity {

  label: string;
  isRightAnswer: boolean;

  studyQuestionnaireId: number;

}

import { BaseEntity } from '../../baseentity.model';

export enum ChangeReason { Error = 1, Update, Other }
export class eSourceSubjectQuestionnaireAudit extends BaseEntity {
  constructor() {
    super();
    this.changeReason = ChangeReason.Other;
  }

  changeReason: ChangeReason;
  details: string;

  esourceSubjectQuestionnaireHistoryId: number;
}

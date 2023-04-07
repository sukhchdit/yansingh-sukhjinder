import { BaseEntity } from '../../baseentity.model';

export enum MonitorQueryStatus { Raised = 1, Acknowledged, Resolved }

export class MonitorQuery extends BaseEntity {
  constructor() {
    super();
    this.monitorQueryStatus = MonitorQueryStatus.Raised;
  }

  esourceSubjectQuestionnaireId: number;
  description: string;
  monitorQueryStatus: MonitorQueryStatus;

}

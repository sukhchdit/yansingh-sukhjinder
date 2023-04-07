import { BaseEntity } from '../baseentity.model';
import { VisitPhysicalExam } from './visitphysicalexam.model';

export enum VitalChangeReason { Error = 1, Update, Other }

export class VisitPhysicalExamAudit extends BaseEntity {
  constructor() {
    super();
    this.vitalChangeReason = VitalChangeReason.Error;
  }

  visitPhysicalExamId: number;
  visitPhysicalExam: VisitPhysicalExam;

  vitalChangeReason: VitalChangeReason;
  details: string;
  oldValue: string;
  newValue: string;
}

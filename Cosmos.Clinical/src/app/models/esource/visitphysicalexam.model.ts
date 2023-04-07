import { BaseEntity } from '../baseentity.model';
import { Vital } from './vital.model';

export class VisitPhysicalExam extends BaseEntity {
  constructor() {
    super();
    this.vital = new Vital();
  }
  normal: boolean;
  abnormalNcs: boolean;
  abnormalCs: boolean;
  abnormalComments: string;
  notDone: boolean;
  na: boolean;

  vitalId: number;
  vital: Vital;

  studyVisitTrackingId: number;

  selected: string;
}

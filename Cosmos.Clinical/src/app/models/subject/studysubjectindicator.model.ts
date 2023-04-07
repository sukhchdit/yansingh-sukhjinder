import { BaseEntity } from '../baseentity.model';
import { Indicator } from '../site/investigator/indicator.model';

export class StudySubjectIndicator extends BaseEntity {
  constructor() {
    super();
    this.indicatorId = 0;
  }
  
  studySubjectId: number;
  indicatorId: number;
  indicator: Indicator;
}

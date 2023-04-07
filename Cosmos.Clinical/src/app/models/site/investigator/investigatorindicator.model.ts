import { BaseEntity } from '../../baseentity.model';
import { Indicator } from './indicator.model';

export class InvestigatorIndicator extends BaseEntity {
  constructor() {
    super();
    this.indicatorId = 0;
  }

  indicatorId: number;
  indicator = new Indicator();

  investigatorTherapeuticDetailId: number;
}

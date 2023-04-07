import { BaseEntity } from '../../baseentity.model';
import { Therapeutic } from '../therapeutic.model';
import { InvestigatorIndicator } from './investigatorindicator.model';

export class InvestigatorTherapeuticDetail extends BaseEntity {
  constructor() {
    super();
    this.therapeuticId = 0;
  }

  therapeuticId: number;
  therapeutic: Therapeutic;

  investigatorIndicators: InvestigatorIndicator[] = [];

  investigatorTherapeuticId: number;
}

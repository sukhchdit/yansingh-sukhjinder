import { BaseEntity } from '../../baseentity.model';
import { InvestigatorTherapeuticDetail } from './investigatortherapeuticdetail.model';

export class InvestigatorTherapeutic extends BaseEntity {
  constructor() {
    super();
    this.investigatorTherapeuticDetails = [];
  }

  ageGroupInfants: boolean;
  pediotric: boolean;
  adolesent: boolean;
  adults: boolean;
  geritric: boolean;

  investigatorTherapeuticDetails: InvestigatorTherapeuticDetail[] = [];

  investigatorInfoId: number;
}

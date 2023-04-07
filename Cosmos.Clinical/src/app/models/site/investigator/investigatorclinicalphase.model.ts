import { BaseEntity } from '../../baseentity.model';

export class InvestigatorClinicalPhase extends BaseEntity {
  constructor() {
    super();

    this.phase1 = false;
    this.phase2 = false;
    this.phase3 = false;
    this.phase4 = false;
  }

  phase1: boolean;
  phase2: boolean;
  phase3: boolean;
  phase4: boolean;
}

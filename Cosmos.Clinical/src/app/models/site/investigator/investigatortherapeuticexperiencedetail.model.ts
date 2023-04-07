import { BaseEntity } from '../../baseentity.model';

export class InvestigatorTherapeuticExperienceDetail extends BaseEntity {
  constructor() {
    super();
  }

  hasAccess: boolean;
  therapeuticExperienceDetailId: number;
  therapeuticExperienceId: number;
  investigatorInfoId: number;
}

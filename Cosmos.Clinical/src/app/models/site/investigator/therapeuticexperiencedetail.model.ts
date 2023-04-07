import { BaseEntity } from '../../baseentity.model';

export class TherapeuticExperienceDetail extends BaseEntity {
  constructor() {
    super();
  }

  name: string;
  therapeuticExperienceId: number;
}

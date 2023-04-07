import { BaseEntity } from '../../baseentity.model';
import { TherapeuticExperienceDetail } from './therapeuticexperiencedetail.model';

export class TherapeuticExperience extends BaseEntity {
  constructor() {
    super();
  }

  name: string;
  therapeuticExperienceDetails: TherapeuticExperienceDetail[];
}

import { Education } from '../../models/organization/organizationcontact.model';

export class InvestigatorDetailsViewModel {
  constructor() {
    this.education = Education.Other;
  }

  investigatorId: number;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  salutation: string;
  education: Education;
}

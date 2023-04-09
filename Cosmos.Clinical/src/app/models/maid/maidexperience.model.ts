import { BaseContact } from '../basecontact.model';
import { MaidExperienceJobDuty } from './maidexperiencejobduty.model';

export class MaidExperience extends BaseContact {
  startDate: Date;
  endDate: Date;
  countryName: string;
  experienceYears: string;
  sizeOfHouse: string;
  lastSalary: string;
  numberOfPersonServed: number;
  reasonOfLeaving: string;
  maidExperienceJobDuty: MaidExperienceJobDuty[] = [];
}

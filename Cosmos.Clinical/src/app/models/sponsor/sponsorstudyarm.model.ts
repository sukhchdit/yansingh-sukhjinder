import { BaseEntity } from '../baseentity.model';

export class SponsorStudyArm extends BaseEntity {
  constructor() {
    super();    
  }

  title: string;

  sponsorStudyInfoId: number;
}

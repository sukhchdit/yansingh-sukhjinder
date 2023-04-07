import { BaseEntity } from '../baseentity.model';

export class SponsorStudyeDiary extends BaseEntity {
  
  name: string;
  header: string;
  footer: string;
  comments: string;
  version: number;
  isApprovedVersion: boolean;
  versionApprovedDate: Date;
  sponsorName: string;
  protocolNumber: string;
  currentDate: Date;

  sponsorStudyInfoId: number;

}

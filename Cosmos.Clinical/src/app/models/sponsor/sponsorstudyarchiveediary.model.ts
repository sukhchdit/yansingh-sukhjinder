import { BaseEntity } from '../baseentity.model';

export class SponsorStudyArchiveeDiary extends BaseEntity {

  eDiaryId: number;
  name: string;
  header: string;
  footer: string;
  comments: string;
  version: number;
  isApprovedVersion: boolean;
  versionApprovedDate: Date;

  sponsorStudyInfoId: number;

}

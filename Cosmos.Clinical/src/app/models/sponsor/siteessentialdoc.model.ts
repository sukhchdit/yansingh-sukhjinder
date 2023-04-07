import { BaseEntity } from '../baseentity.model';

export enum SiteEssentialDocStatus { Draft = 1, Downloded, SentForQaApproval, ApprovedByQA, DisapprovedByQa, SendForManagerApproval, ApprovedByManager, DisapprovedByManager, Uploaded }


export class SiteEssentialDoc extends BaseEntity {
  constructor() {
    super();
  }
  essentialdocId: number;
  documentGuid: string;
  sponsorSiteStudyCDAInvitationId: number;
  siteEssentialDocStatus: SiteEssentialDocStatus;
  uploadedBy: number;
  uploadedOn: Date;
}

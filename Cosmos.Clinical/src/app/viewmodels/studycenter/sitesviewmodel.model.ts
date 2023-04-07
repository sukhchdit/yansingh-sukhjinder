export enum SiteStatus { NotCertified = 1, Certified, Active, InActive, QCReady, QCFlag, QCCompleted }
export class SitesViewModel {
  sponsorSiteStudyCDAInvitationId: number;
  siteInfoId: number;
  siteNumber: string;
  investigatorName: string;
  createdBy: number;
  createdOn: any;
  updatedBy: number;
  updatedOn: any;
  status: boolean;
  sitestatus: SiteStatus;
  sitestatustitle: string;
  showQC: boolean;
}

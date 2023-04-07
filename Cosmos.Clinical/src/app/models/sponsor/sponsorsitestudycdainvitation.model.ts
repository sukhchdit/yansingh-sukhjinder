import { InvestigatorInfo } from '../site/investigator/investigatorinfo.model';
import { SiteInfo } from '../site/siteinfo.model';
import { SponsorStudyInfo } from './sponsorstudyinfo.model';
import { BaseEntity } from '../baseentity.model';

export enum Ranking { Gold = 1, Silver, Bronze }
export enum InvitationStatus { Send = 1, Accepted, Rejected, Completed, Closed, Active }
export enum SiteStudyStatus { Select = 0, Enrolling, EnrollmentClosed, UpcomingStudies, ClosedStudies }

export class SponsorSiteStudyCDAInvitation extends BaseEntity {
  constructor() {
    super();
    this.invitationStatus = InvitationStatus.Send;
    this.siteStudyStatus = SiteStudyStatus.Select;
  }
  invitationRanking: Ranking;
  invitationStatus: InvitationStatus;
  isSponserSignOff: boolean;
  sponserSignOffDate: Date;
  isAttempted: boolean;
  folderId: number;
  embeddedSigningSessionURLSite: string;
  embeddedSigningSessionURLInvestigator: string;
  embeddedSigningSessionURLSponsor: string;
  signCount: number;
  sendeDiary: boolean;
  communicationEmail: string;
  communicationFax: string;
  communicationSmsNumber: string;

  investigatorInfoId: number;
  investigatorInfo: InvestigatorInfo;
  siteInfoId: number;
  siteInfo: SiteInfo;
  sponsorStudyInfoId: number;
  sponsorStudyInfo: SponsorStudyInfo;
  siteNumber: string;
  siteStudyStatus: SiteStudyStatus;
  studyGuid: string;

}

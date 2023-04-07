import { InvitationStatus, SiteStudyStatus } from '../../models/sponsor/sponsorsitestudycdainvitation.model';

export class SiteStudyCdaListViewModel {
  id: number;
  sponsorStudyInfoId: number;
  title: string;
  investigatorInfoId: number;
  investigatorName: string;
  invitationStatus: InvitationStatus;
  sponserSignOffDate: Date;
  sendDate: Date;
  isAttempted: boolean;
  signCount: number;
  folderId: number;
  siteStudyStatus: SiteStudyStatus;
  iseDiaryAvailable: boolean;
  indication: string;
  therapeutic: string;
  isBudgetSaved: boolean;
  isBudgetApproved: boolean;
  siteStudyProcedureBudgetVersionId: number;
}

import { Ranking, InvitationStatus } from '../../models/sponsor/sponsorsitestudycdainvitation.model';

export class SponsorStudyCdaListViewModel {
  id: number;
  invitationRanking: Ranking;
  invitationStatus: InvitationStatus;
  sponserSignOffDate: Date;
  investigatorInfoId: number;
  investigatorName: string;
  siteInfoId: number;
  siteName: string;
  sponsorStudyInfoId: number;
  sendDate: Date;
  percentageCompleted: number;
  isAttempted: boolean;
  result: number;
  isSentForSign: boolean;
  title: string;
  isBudgetSaved: boolean;
  isBudgetApproved: boolean;
  siteStudyProcedureBudgetVersionId: boolean;

  isSending: boolean = false;
}

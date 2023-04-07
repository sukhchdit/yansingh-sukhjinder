import { InvitationStatus, Ranking } from "../../models/sponsor/sponsorsitestudycdainvitation.model";
import { ManagerApprovalStatus } from "../../models/studybudget/sitestudyprocedurebudgetversion.model";

export class BudgetStudyListViewModel {
  
  sponsorSiteStudyCdaInvitationId: number;
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
  managerApprovalStatus: ManagerApprovalStatus;
  isSiteApproved: boolean;
  isSponsorApproved: boolean;

  isSending: boolean = false;
  siteNumber: string;
}

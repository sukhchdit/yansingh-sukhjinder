import { BaseEntity } from '../baseentity.model';
import { SiteStudyBudgetVersionArm } from './sitestudybudgetversionarm.model';

export enum ManagerApprovalStatus { NotAssigned = 1, Assigned, Approved, Disapproved }

export class SiteStudyProcedureBudgetVersion extends BaseEntity {
  constructor() {
    super();
  }
  version: number;
  budgetName: string;
  isSponsorApproved: boolean;
  sponsorApprovedBy: number;
  sponsorApprovedOn: any;
  isSiteApproved: boolean;
  siteApprovedBy: number;
  siteApprovedOn: any;
  managerApprovalStatus: ManagerApprovalStatus;
  managerApprovedBy: number;
  managerApprovedOn: any;
  overhead: number;
  countryId: number;
  studyProcedureBudgetVersionId: number;
  sponsorSiteStudyCDAInvitationId: number;

  siteStudyBudgetVersionArms: SiteStudyBudgetVersionArm[] = [];
}

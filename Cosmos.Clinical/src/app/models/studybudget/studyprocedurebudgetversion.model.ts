import { BaseEntity } from '../baseentity.model';
import { Country } from '../common/country.model';
import { SponsorStudyInfo } from '../sponsor/sponsorstudyinfo.model';

export enum BudgetVersionStatus { Draft = 1, SentForQaApproval, DisapprovedByQa, SentForFinalApproval, DisapprovedByFinalApprover, Approved }

export class StudyProcedureBudgetVersion extends BaseEntity {
  constructor() {
    super();
    this.id = 0;
    this.countryId = 0;
    this.overhead = 0;
  }

  version: number;
  budgetName: string;
  approvedBy: number;
  approvedOn: any;
  qaApprovedBy: number;
  qaApprovedOn: any;
  countryId: number;
  overhead: number;
  budgetVersionStatus: BudgetVersionStatus;
  sponsorStudyInfoId: number;
  sponsorStudyInfo: SponsorStudyInfo;
  
  sentToAnySite: boolean;
  country: Country;
}

import { BaseEntity } from '../baseentity.model';

export enum VisitType { ClinicVisit = 1, PhoneVisit, Other }
export enum OffSetType { Days = 1, Weeks, Months }
export enum VisitTemplateStatus { Completed = 1, Screening, Randomized, RunIn, FollowUp, Dropped, LostToFollowup, Withdraw, NoEnrollmentStatus }
export enum OffSetFrom { BaselineVisit = 1, PreviousVisit, ScreeningVisit }

export class StudyVisitTemplate extends BaseEntity {
  constructor() {
    super();
    this.visitType = VisitType.ClinicVisit;
    this.offSetType = OffSetType.Days;
    this.offSetFrom = OffSetFrom.BaselineVisit;
    this.visitTemplateStatus = VisitTemplateStatus.Screening;
    this.visitDuration = "0";
  }
  visitName: string;
  baseline: boolean;
  visitType: VisitType;
  offSet: number;
  offSetType: OffSetType;
  windowStartDays: number;
  windowEndDays: number;
  offSetFrom: OffSetFrom;
  visitTemplateStatus: VisitTemplateStatus;
  invoiceForVisitRevenueTotal: boolean;
  crcMemo: string;
  accountingNotes: string;
  stipend: number;
  visitDuration: string;
  isNewRow: boolean;
  isWashoutVisit: boolean;
  sortOrder: number;
  subVisitCount: number;
  sponsorStudyArmId: number;

  parentId: number;
  sponsorSiteStudyCDAInvitationId: number;
}

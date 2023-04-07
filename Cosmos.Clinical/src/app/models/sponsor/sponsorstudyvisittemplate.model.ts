import { BaseEntity } from '../baseentity.model';
import { OffSetFrom, OffSetType, VisitTemplateStatus, VisitType } from '../site/studyvisittemplate.model';

export class SponsorStudyVisitTemplate extends BaseEntity {
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

  parentId: number;
  sponsorStudyInfoId: number;
  sponsorStudyArmId: number;
}

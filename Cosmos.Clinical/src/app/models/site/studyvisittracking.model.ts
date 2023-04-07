import { BaseEntity } from '../baseentity.model';
import { VisitTemplateStatus } from './studyvisittemplate.model';

export enum VisitTrackingStatus { Completed = 1, NotCompleted, PartialCompleted, NoShow }

export class StudyVisitTracking extends BaseEntity {
  constructor() {
    super();
    this.coordinatorId = 0;
    this.visitTrackingStatus = VisitTrackingStatus.PartialCompleted;
    this.visitStatus = VisitTemplateStatus.Screening;
  }
  screenNumber: string;
  randomizationNumber: string;
  targetDate: any;
  completionDate: any;
  actualCompletionDate: any;
  coordinatorId: number;
  comments: string;
  convertedCompletionDate: any;
  convertedActualCompletionDate: any;
  visitTrackingStatus: VisitTrackingStatus;
  visitStatus: VisitTemplateStatus;

  parentId: number;
  studyVisitTemplateId: number;
  studySubjectId: number;

  isSigned: boolean;
  subjectSignature: string;

  visitSummaryInvestigatorSignOff: boolean;
  visitSummaryInvestigatorSignOffDate: any;
  visitSummaryQaSignOff: boolean;
  visitSummaryQaSignOffBy: number;
  visitSummaryQaSignOffDate: any;
}

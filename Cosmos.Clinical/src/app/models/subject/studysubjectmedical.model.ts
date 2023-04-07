import { BaseEntity } from '../baseentity.model';
import { SurgicalCondition } from '../common/surgicalcondition.model';

export class StudySubjectMedical extends BaseEntity {
  studySubjectId: number;
  requiresMedication: boolean;
  startDate: Date;
  endDate: Date;
  endDateString:any;
  comments: string;
  specificDetails: string;
  condition: string;
  isAdded:boolean;
  userName:string;
  onGoing:boolean;
  applicable:boolean;
}

export class HistoryStudySubjectMedical extends BaseEntity {
  studySubjectMedicalId: number;
  valueFrom:string;
  valueTo:string;
  column:ColumnType;
  userName:string;
}
export enum ColumnType {condition=0, specificDetails, comments, startDate, endDate, requiresMedication,applicable ,initial}
import { BaseEntity } from '../baseentity.model';
import { SocialCondition } from '../common/socialcondition.model';

export enum SubstanceType { Cigarettes = 1, Pipes, Cigars, ChewTabacco, Alcohol }
export enum UseStatus { Current = 1, Former }
export class StudySubjectSocialHistory extends BaseEntity {
  studySubjectId: number;
  substanceUse: boolean;
  substanceType: SubstanceType;
  useStatus: UseStatus;
  comments: string;
  numberOfYears: string;
  numberOfPacksPerDay: string;
  yearStopped: string;
  userName:string;
  applicable:boolean;
}

export class HistoryStudySubjectSocial extends BaseEntity {
  studySubjectSocialHistoryId: number;
  valueFrom: string;
  valueTo: string;
  column: ColumnType;
  userName: string;
}
export enum ColumnType { substanceUse = 0, substanceType, useStatus, comments, numberOfYears, numberOfPacksPerDay, yearStopped,applicable,initial}
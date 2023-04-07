import { BaseEntity } from '../baseentity.model';

export enum AllergyType { Medication = 1, Food, Environment }
export class StudySubjectAllergy extends BaseEntity {
  allergyType: AllergyType;
  name: string;
  description: string;
  comments: string;
  studySubjectId: number;
  applicable:boolean;
}
export class HistoryStudySubjectAllergy extends BaseEntity {
  studySubjectAllergyId: number;
  valueFrom:string;
  valueTo:string;
  column:AllergyColumnType;
  userName:string;
}
export enum AllergyColumnType {allergyType=0, name, description, comments ,applicable,initial}
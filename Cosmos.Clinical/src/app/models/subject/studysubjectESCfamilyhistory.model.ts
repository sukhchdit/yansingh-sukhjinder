import { BaseEntity } from '../baseentity.model';

export enum FamilyMember { Mother = 1, Father, Sister, Brother, MaternalGrandMother, MaternalGrandFather, PaternalGrandFather, PaternalGrandMother, Daughter, Son, Other }
export class StudySubjectFamilyHistory extends BaseEntity {
    familyMember: FamilyMember;
    indicatorId: number;
    therapeuticId:number;
    comments: string;
    studySubjectId: number;
    indicatorName:string;
    therapeuticName:string;
applicable:boolean;
}
export class HistoryStudySubjectFamily extends BaseEntity {
    studySubjectFamilyId: number;
    valueFrom: string;
    valueTo: string;
    OldIndicatorName:string;
    NewIndicatorName:string;
    column: FamilyColumnType;
    userName: string;
}
export enum FamilyColumnType { familyMember = 0, indicatorId, comments, therapeuticId,applicable,initial }
import { BaseAddress } from '../baseaddress.model';
import { BaseEntity } from '../baseentity.model';

export enum DoseUnit { CAPSULE = 1, g, IU, mg, mL, PUFF, TABLET, ug }
export enum Frequency { AC = 1, BID, BIW, GT, HS, PC, PRN, Q2H, Q3H, Q4H, QD, QH, QID, QOD, QWK, TID }
export enum Route { AD = 1, AS, AU, IM, INH, IR, IV, OD, OS, OU, PO, REC, SC, SL, TD, TOP, VAG }
export enum ConMedicationColumnType { drugName = 0, isOngoing, comments, startDate, endDate, doseUnit, dose, frequency, reasonForUse, route,applicable,initial }
export enum medicationType{Medical=0,Surgical=1}

export class StudySubjectConcomitantMedicationHistory extends BaseAddress {
    studySubjectId: number;
    startDate: Date;
    endDate: Date;
    comments: string;
    endDateString:any;
    drugName: string;
    dose: string;
    doseUnit: DoseUnit;
    frequency: Frequency;
    route: Route;
    userName: string;
    isOngoing: boolean;
    reasonForUse: string;
    medicationIsMedicalHistory:boolean;
    medicalHistoryId:number;
    surgicalHistoryId:number;
    applicable:boolean;
}

export class historyStudySubjectConMedication extends BaseEntity {
    studySubjectConMedicationId: number;
    valueFrom: string;
    valueTo: string;
    column: ConMedicationColumnType;
    userName: string;
}
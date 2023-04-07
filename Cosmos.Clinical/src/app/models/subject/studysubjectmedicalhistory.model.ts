import { BaseEntity } from '../baseentity.model';
import { Treatment } from '../common/treatment.model';
import { Indicator } from '../site/investigator/indicator.model';

export enum DoseUnit { CAPSULE = 1, g, IU, mg, mL, PUFF, TABLET, ug }
export enum Regimen { AC = 1, BID, BIW, GT, HS, PC, PRN, Q2H, Q3H, Q4H, QD, QH, QID, QOD, QWK, TID }
export enum Route { AD = 1, AS, AU, IM, INH, IR, IV, OD, OS, OU, PO, REC, SC, SL, TD, TOP, VAG }

export class StudySubjectMedicalHistory extends BaseEntity {
  constructor() {
    super();
    this.indicatorId = 0;
    this.treatmentId = 0;
    this.doseUnit = 0;
    this.regimen = 0;
    this.route = 0;
  }

  conditionComments: string;
  conditionStartDate: Date;
  conditionEndDate: Date;
  isConditionOngoing: boolean;
  treatmentComments: string;
  treatmentStartDate: Date;
  treatmentEndDate: Date;
  isTreatmentOngoing: boolean;
  doseUnit: DoseUnit;
  dose: string;
  regimen: Regimen;
  route: Route;

  indicatorId: number;
  indicator: Indicator;
  treatmentId: number;
  treatment: Treatment;
  studySubjectId: number;
}

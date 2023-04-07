import { BaseEntity } from '../../baseentity.model';
import { InvestigatorClinicalPhase } from './investigatorclinicalphase.model';

export class InvestigatorClinicalTrialExperience extends BaseEntity {
  constructor() {
    super();
    this.phase = new InvestigatorClinicalPhase();
    this.clinicalTrialsExperience = false;
    this.gcpCertified = false;
    this.iataCertified = false;

    this.vaccines = false;
    this.deviceTrials = false;
    this.mobileApp = false;
    this.diagnostics = false;
    this.observational = false;
  }

  clinicalTrialsExperience: boolean;
  numberofYearsOfExperience: number;
  phase: InvestigatorClinicalPhase;
  p1: boolean;
  sub1: boolean;
  rator: boolean;
  deviceTrials: boolean;
  diagnostics: boolean;
  vaccines: boolean;
  mobileApp: boolean;
  observational: boolean;
  gcpCertified: boolean;
  gcpCertifiedExpiryDate: Date;
  iataCertified: boolean;
  iataCertifiedExpiryDate: Date;
  investigatorInfoId: number;
}

export enum Phase {
  'I' = 1,
  'II',
  'III',
  'IV'
}

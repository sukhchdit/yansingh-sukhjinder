import { BaseEntity } from '../baseentity.model';

export enum Severity { Mild = 1, Moderate, Severe, LifeThreatening }
export enum StudyInterventionRelationship { NotRelated = 0, UnlikelyRelated, PossiblyRelated, ProbablyRelated, DefinitelyRelated }
export enum ActionTakenRegardingStudyIntervention { None = 0, DoseModification, MedicalIntervention, Hospitalization, InterventionDiscontinued, Other }
export enum OutcomeOfAE { Resolved = 1, RecoveredWithMinorSequelae, RecoveredWithMajorSequelae, OngoingContinuingTreatment, ConditionWorsening, Death, Unknown }

export class AdverseEvent extends BaseEntity {
  constructor() {
    super();
    
  }

  title: string;
  screenNumber: string;
  startDate: any;
  stopDate: any;
  severity: Severity;
  studyInterventionRelationship: StudyInterventionRelationship;
  actionTakenRegardingStudyIntervention: ActionTakenRegardingStudyIntervention;
  outcomeOfAE: OutcomeOfAE;
  isExpected: boolean;
  isSeriousAdverseEvent: boolean;
  signatureDate: Date;
  notes: string;
  signOffInvestigator: number;
  studyVisitTrackingId: number;

  studySubjectEsourceDocumentId: number;
  sponsorSiteStudyCDAInvitationId: number;
  studySubjectId: number;
}

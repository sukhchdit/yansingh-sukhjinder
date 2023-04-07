import { BaseEntity } from '../baseentity.model';
import { Gender } from '../subject/studysubject.model';

export enum SeriousnessOfSAE { Death = 0, LifeThreatening, HospitalizationInitialOrProlonged, Disability, CongenitialAnomaly, RequiredInterventionToPreventpermanentImpairmentDamage, Others }
export enum OutcomeOfSAE { Fatal = 0, Continuing, Recovering, Recovered, Unknown, Others }
export enum ReportType { Initial = 0, FollowUp, Final }
export enum CommonInput { Yes = 0, No, NA }

export class SeriousAdverseEvent extends BaseEntity {
  constructor() {
    super();
    
  }

  screenNumber: string;
  ageYear: number;
  ageMonth: number;
  ageDay: number;
  gender: Gender;
  weight: number;
  height: number;
  reportType: ReportType;
  initialReportTypeDate: any;
  isPIRelated: boolean;
  isSponsorRelated: boolean;
  isECRelated: boolean;
  diagnosisDescription: string;
  onsetDate: any;
  reportingDate: any;
  lagtime: string;
  location: string;
  suspectDrug: string;
  suspectDrugIndications: string;
  suspectDrugAdministrationRoute: string;
  therapyStartDate: any;
  therapyStopDate: any;
  isStudyInterventionDiscontinued: boolean;
  isReactionDecline: boolean;
  doseDetailOnReactionDecline: string;
  isReactionAppear: CommonInput;
  doseDetailOnReactionAppear: string;
  concomitantDrug: string;
  concomitantDrugAdministrationDate: any;
  relevantTestData: string;
  relevantTestDate: any;
  relevantHistoryIncludingMedicalConditions: string;
  haveSimilarSAE: boolean;
  ifSimilarSAE: string;
  seriousnessOfSAE: SeriousnessOfSAE;
  seriousnessOfSAEOthers: string;
  medicalManagementProvided: string;
  outcomeOfSAE: OutcomeOfSAE;
  outcomeOfSAEOthers: string;
  isResearchParticipantContinued: CommonInput;
  piFinalAssessmentDetails: string;
  hasInformationCommunicatedToAgencies: boolean;
  alterationRequiredInTrialProtocol: boolean;
  compensationDetails: string;
  piSignatureDate: any;
  notes: string;
  signOffInvestigator: number;
  studyVisitTrackingId: number;

  studySubjectEsourceDocumentId: number;
  sponsorSiteStudyCDAInvitationId: number;
  studySubjectId: number;

}

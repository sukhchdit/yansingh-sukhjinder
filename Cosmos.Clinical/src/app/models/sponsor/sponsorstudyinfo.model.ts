import { BaseEntity } from '../baseentity.model';
import { SponsorStudyTeam } from './sponsorstudyteam.model';
import { SponsorStudyDocument } from './sponsorstudydocument.model';
import { SponsorInfo } from './sponsorinfo.model';

export enum DevelopmentPhase { PhaseI = 1, PhaseII, PhaseIII, PhaseIV, ObservationalPhase }
export enum SponsorStudyStatus { Open = 1, CDAAccepted, Closed }
export enum StudyDesign { Unblinded = 1, SingleBlind, DoubleBlind, TripleBlind, Other }

export class SponsorStudyInfo extends BaseEntity {
  constructor() {
    super();
    this.developmentPhase = DevelopmentPhase.PhaseI;
    this.sponsorStudyStatus = SponsorStudyStatus.Open
    this.croInfoId = 0;
    this.coordinatorId = 0;
    //this.therapeuticId = 0;
    this.indicatorId = 0;
    this.irbId = 0;
    this.medicalHistoryId = 0;
    this.socialConditionId = 0;
    this.surgicalConditionId = 0;
    this.noOfVisits = 0;
  }
  title: string;
  investigationalProduct: string;
  date: any;
  developmentPhase: DevelopmentPhase;
  studyDesign: string;
  percentageCompleted: number;
  protocolNumber: string;
  protocolTitle: string;
  textIndication: string;
  poNumber: string;
  screenFails: string;
  clinicalDescription: string;
  recruitmentGoal: string;
  recruitmentNotes: string;
  irbNumber: string;
  expectedEnrollmentRate: number;
  sponsorPaymentWithholdingPercentage: number;
  sponsorPaymentOverheadPercentage: number;
  startDate: any;
  endDate: any;
  enrollmentEndDate: any;
  noOfVisits: number;
  therapeuticId: number;
  indicatorId: number;
  socialConditionId: number;
  surgicalConditionId: number;
  medicalHistoryId: number;
  irbId: number;
  coordinatorId: number;

  sponsorInfoId: number;
  croInfoId: number;
  sponsorStudyStatus: SponsorStudyStatus;
sponsorInfo= new SponsorInfo();
  sponsorStudyTeams: SponsorStudyTeam[] = [];
  sponsorStudyDocuments: SponsorStudyDocument[] = [];
  studyGuid: string;
  targetdSites: string;
}

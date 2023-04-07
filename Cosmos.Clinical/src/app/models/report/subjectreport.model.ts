import { BaseAddress } from '../baseaddress.model';

export enum Qualified { New = 0, Yes, No }
export enum Gender { Male = 0, Female }
export enum PhoneType { Fax = 1, Home, Mobile, Work, Other }
export enum PreferredLanguage { Dutch = 1, French, English, German, Italian, Spanish }
export enum Race { AmericanIndian = 1, Asian, Black, CaucasianWhite, PacificIslander, Unkown }
export enum Ethnicity { HispanicOrLatino = 1, NotHispanicOrLatino }
export enum HeightUnit { cm = 1, inches }
export enum WeightUnit { kg = 1, lbs }
export enum SubjectStatus { Completed = 1, Screening, Randomized, RunIn, FollowUp, Dropped, LostToFollowUp, Withdraw, NotContacted, ContactAttempt1, ContactAttempt2, ContactAttempt3, DNQ, DNQNotInterested, FollowUpRequested, QualifiedForScreening, PreScreening, PreScreenFail, NoShow, CallBack, ScreenFail, Scheduled }

export class SubjectReport extends BaseAddress {
  constructor() {
    super();
    this.isQualified = Qualified.New;
    this.gender = Gender.Male;
    this.phoneType = PhoneType.Home;
    this.alternatePhoneType = PhoneType.Home;
    this.preferredLanguage = 0;
    this.race = 0;
    this.ethnicity = 0;
    this.heightUnit = HeightUnit.inches;
    this.weightUnit = WeightUnit.lbs;
    this.subjectStatus = SubjectStatus.Screening;
  }

  firstName: string;
  lastName: string;
  middleName: string;
  optInToEmails: boolean;
  phoneType: PhoneType;
  optInToText: boolean;
  alternatePhone: string;
  alternatePhoneType: PhoneType;
  isQualified: Qualified;
  sendeDiary: boolean;
  gender: Gender;
  dob: Date;
  preScreeningNotes: string;
  description: string;
  participantNumber: string;
  ssn: string;
  MRN: string;
  isProfileImageUploaded: boolean;
  preferredLanguage: PreferredLanguage;
  race: Race;
  ethnicity: Ethnicity;
  height: number;
  heightUnit: HeightUnit;
  weight: number;
  weightUnit: WeightUnit;
  referralId: number;
  subjectStatus?: SubjectStatus;
  studyAssignedDate?: Date;

  sponsorSiteStudyCDAInvitationId: number;
  organizationInfoId: number;

}

import { BaseEntity } from '../baseentity.model';
export enum Language { Dutch = 1, French, English, German, Italian, Spanish }
export enum FaqStatus { NotCertified = 1, Certified, QAReady, QAFlag, QACompleted, Inactive, Active }
export class StudyCenterFaq extends BaseEntity {
  constructor() {
    super();
    this.faqstatus = FaqStatus.NotCertified;
  }
  id: number;
  sponsorstudyinfoid: number;
  questionno: number;
  questionname: string;
  questionanswar: string;
  countryId: number;
  country: string;
  certified: boolean;
  faqstatus: FaqStatus;
  studyteamcontactguid: string;
  languageId: number;
}
export class StudyCenterFaqHistory {
  constructor() {

  }
  StudyCenterFaqId: number;
  valueFrom: string;
  valueTo: string;
  column: columnType;
  createdByName: string;
  activity: string;
}
enum columnType { QuestionNo = 1, QuestionName, QuestionAnswar, Language, Country, Status, Upload }

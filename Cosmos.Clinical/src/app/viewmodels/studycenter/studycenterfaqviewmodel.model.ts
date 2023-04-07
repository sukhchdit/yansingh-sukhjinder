export enum Language { Dutch = 1, French, English, German, Italian, Spanish }
import { FaqStatus } from '../../models/studycenter/studycenterfaq.model';
export class StudyCenterFaqViewModel {
  constructor() {
    
  } 
  questionno: number;
  questionname: string;
  questionanswar: string;
  language: Language;
  languagetitle: string;
  countryId: number;
  country: string;
  certified: boolean;
  faqstatus: FaqStatus;
  faqstatustitle: string;
}

export class FaqLinksModel {
  id: number;
  questionno: string;
  questionname: string;
}

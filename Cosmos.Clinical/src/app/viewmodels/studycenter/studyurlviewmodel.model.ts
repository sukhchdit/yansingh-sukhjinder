export enum Language { Dutch = 1, French, English, German, Italian, Spanish }
import { UrlStatus } from '../../models/studycenter/studyurl.model';
export class StudyUrlViewModel {
  constructor() {

  }
  urlType: string;
  urlName: string;
  url: string;
  language: Language;
  languageTitle: string;
  country: string;
  certified: boolean;
  urlStatus: UrlStatus;
  urlStatusTitle: string;
}

export class StudyUrlTypesModel {
  id: number;
  urlType: string;
  studyUrlNames: Array<StudyUrlNamesModel>;
}

export class StudyUrlNamesModel {
  urlName: string;
  url: string;
}

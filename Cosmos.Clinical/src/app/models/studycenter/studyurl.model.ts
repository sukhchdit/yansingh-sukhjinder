import { BaseEntity } from '../baseentity.model';
export enum Language { Dutch = 1, French, English, German, Italian, Spanish }
export enum UrlStatus { NotCertified = 1, Certified, Active, InActive, QCReady, QCFlag, QCCompleted }
export class StudyUrl extends BaseEntity {
  constructor() {
    super();
    this.language = 0;
    this.urlStatus = UrlStatus.NotCertified;
  }
  id: number;
  sponsorStudyInfoId: number;
  urlTypeId: number;
  urlName: string;
  url: string;
  language: Language;
  countryId: number;
  country: string;
  certified: boolean;
  urlStatus: UrlStatus;
  studyUrlGuid: string;
}
export class StudyUrlHistory {
  constructor() {
    this.column = columnType.status;
  }
  studyUrlId: number;
  valueFrom: string;
  valueTo: string;
  column: columnType;
  createdByName: string;
}
enum columnType {
  status
}

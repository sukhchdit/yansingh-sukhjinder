import { BaseEntity } from '../baseentity.model';

export enum EssentialDocClass { Trial = 1, Country, Site }
export enum EssentialDocQCStatus { Certified = 1, QCReady, QCFlag, QCCompleted, Final }
export enum EssentialDocLifeCycleStage { Certified = 1, QC, Approved, SendToSite, Complete, ShareWithSponser, QC2, Approved2, AddToeSiteBinder }
//export enum EssentialDocStatus { Draft = 1, SentForQaApproval, DisapprovedByQa, SendForManagerApproval, DisapprovedByManager, Approved, SentForFinalApproval, DisapprovedByFinalApprover }
export enum EssentialDocStatus {
  Draft = 1, SentForQAApproval, ApprovedByQA, DisApprovedByQA, SentForAttorneyApproval, ApprovedByAttorney, DisApprovedByAttorney, SentForSiteApproval,
  ApprovedBySite, DisApprovedBySite,
}


export class EssentialDoc extends BaseEntity {
  constructor() {
    super();
  }
  essentialDocClass: EssentialDocClass=1;
  name: string;
  documentDate: Date;
  expirationDate: Date; 
  tmfZoneId: number = 0;
  tmfSectionId: number = 0;
  tmfArtifactId: number = 0;
  comment: string;
  approvedBy: number;
  approvedOn: Date;
  aqApprovedBy: number;
  qaApprovedOn: Date;
  countryId: number;
  isClassified: boolean = false;
  essentialDocQCStatus: EssentialDocQCStatus = 1;
  essentialDocStatus: EssentialDocStatus = 1;
  essentialDocLifeCycleStage: EssentialDocLifeCycleStage;
  sponsorStudyInfoId: number = 0
  documentGuid: string;
  organizationInfoId: number;
  studyGuid: string;
}

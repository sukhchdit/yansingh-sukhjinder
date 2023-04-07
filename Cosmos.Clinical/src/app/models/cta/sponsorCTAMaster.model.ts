import { BaseAddress } from '../baseaddress.model';
import { siteCTAMaster } from './siteCTAMaster.model';
export enum SponsorCTAMasterStatus {
    Draft = 1,
    SentForQAApproval, ApprovedByQA, DisApprovedByQA,
    // ApprovedByQC, DisApprovedByQC,
    SentForAttorneyApproval, ApprovedByAttorney, DisApprovedByAttorney,
    // DisapprovedByQa, SentForFinalApproval, DisapprovedByFinalApprover,
    SentForSiteApproval, ApprovedBySite, DisApprovedBySite,
    //  SentForQCApproval
}
export class sponsorCTAMaster extends BaseAddress {
    studyId: number;
    version: string;
    cTADocumentCategoryId: number;
    isSentForQAApproval: boolean;
    sentForQAApprovalOn: string;
    sentForQAApprovalBy: number;

    isApprovedByQA: boolean;
    qAApprovalDate: string;
    qAApprovedBy: number;

    // isSentForQCApproval: boolean;
    // sentForQCApprovalOn: string;
    // sentForQCApprovalBy: number;

    // isApprovedByQC: boolean;
    // qCApprovalDate: string;
    // qCApprovedBy: number;

    isSentForAttorneyApproval: boolean;
    sentForAttorneyApprovalOn: string;
    sentForAttorneyApprovalBy: number;

    isApprovedByAttorney: boolean;
    attorneyApprovalDate: string;
    attorneyApprovalBy: number;

    qaComments: string;
    attorneyComments: string;
    //  qcComments: string;
    sponsorComments: string;
    uploadedFileName: string;
    cTAMasterGuid: string;
    // attachmentAWSPath: string;
    ctaStatus: SponsorCTAMasterStatus;
    sponsorGuid: string;
    studyGuid: string;
    protocolName: string;
    sponsorName: string;
    categoryName: string;
    createdByName: string;
    updatedByName: string;
    documentGuid: string;

    studyName: string;
    isCertified: boolean;
    certifiedOn: string;
    certifiedBy: number;
    qadisapproveComment: string;
    attorneydisapproveComment: string;
    tmfZoneId: number;
    tmfSectionId: number;
    tmfArtifactId: number;
    name: string;
    docclass: string;
    documentDate: any;
    expirationDate: any;
    //isClassified:boolean;
    countryId: number;
    countryName: string;
    tmfZoneName: string;
    tmfSectionName: string;
    tmfArtifactName: string;
    isAdded: boolean;
    documentType: string;
    documentNumber: number;
    certifiedByName: string;
    sharedSiteId:any;

}
export class sponsorCTAMasterHistory extends BaseAddress {
    StudyId: number;
    Version: string;
    CTADocumentCategoryId: number;
    IsSentForQAApproval: boolean;
    SentForQAApprovalOn: string;
    SentForQAApprovalBy: number;

    IsApprovedByQA: boolean;
    QAApprovalDate: string;
    QAApprovedBy: number;

    IsSentForQCApproval: boolean;
    SentForQCApprovalOn: string;
    SentForQCApprovalBy: number;

    IsApprovedByQC: boolean;
    QCApprovalDate: string;
    QCApprovedBy: number;

    IsSentForAttorneyApproval: boolean;
    SentForAttorneyApprovalOn: string;
    SentForAttorneyApprovalBy: number;

    IsApprovedByAttorney: boolean;
    AttorneyApprovalDate: string;
    AttorneyApprovalBy: number;

    qaComments: string;
    AttorneyComments: string;
    qcComments: string;
    sponsorComments: string;
    UploadedFileName: string;
    SponsorCTAMasterId: string;
    AttachmentAWSPath: string;
}
export class sendToSite {

}
export class CTAsiteList {
    sponsorSiteStudyCDAInvitationId: number;
    sentForSiteApprovalOn: string;
    siteId: number;
    siteName: string;
    investigatorFullName: number;
    investigatorLastName: number;
    investigatorId: string;
    isAdded: boolean;
    sponsorName: string;
    protocolNumber: string;
    siteNumber: string;
    siteCTA: siteCTAMaster[];
    sharedCTA:boolean;
}

export class sponsorCTAMasterAuditHistory {
    sponsorCTAMasterId: number;
    valueFrom: string;
    valueTo: string;
    column: columnType;
    ccreatedByName: string;
}
enum columnType {
    version = 1,
    qAComments, attorneyComments,
    sponsorComments,
    ctaStatus, fileUploaded,
    certified
}
export class CTAstats {
    ctaAdminStat = new ctaAdminStat();
    ctaApprovedStat = new ctaApprovedStat();
    ctaSendStat = new ctaSendStat();
    ctaReceivedStat = new ctaReceivedStat();

}

export class ctaAdminStat {
    waitingForQA: number = 0;
    rejectedByQA: number = 0;
    waitingForApproval: number = 0;
    approvedDocs: number = 0;
}

export class ctaApprovedStat {
    approvedDocsByAttorney: number = 0;
    sendToSite: number = 0;
    waitingAtSite: number = 0;
    receivedFromSite: number = 0;

}

export class ctaSendStat {
    sendToSite: number = 0;
    waitingAtSite: number = 0;
    receivedFromSite: number = 0;
    waitingForQC: number = 0;
}

export class ctaReceivedStat {
    receivedFromSite: number = 0;
    waitingForQC: number = 0;
    rejectedByQC: number = 0;
    approvedDocsBySite: number = 0;
}
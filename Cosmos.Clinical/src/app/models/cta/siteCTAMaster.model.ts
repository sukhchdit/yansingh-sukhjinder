import { BaseAddress } from '../baseaddress.model';
import { CalendarEventStatus } from '../calendar/calendarevent.model';
export enum SiteCTAMasterStatus {
    Draft = 1,
    SentForSiteApproval, ApprovedBySite, DisApprovedBySite,
    SentForSponsorApproval, ApprovedBySponsor, DisApprovedBySponsor,
     SentForQCApproval, ApprovedByQC, DisApprovedByQC,
     Approved,
     SentForSponsorQCApproval, ApprovedBySponsorQC, DisApprovedBySponsorQC
    // DisapprovedByQa, SentForFinalApproval, DisapprovedByFinalApprover,
    
}
export class siteCTAMaster extends BaseAddress {
    sponsorSiteStudyCDAInvitationId: number;
    sponsorCTAMasterId: number;
    isSentForSiteApproval: boolean;
    sentForSiteApprovalOn: string;
    sentForSiteApprovalBy: number;

    isSiteApproved: boolean;
    siteApprovalDate: string;
    siteApprovedBy: number;

    isSentForSponsorApproval: boolean;
    sentForSponsorApprovalOn: string;
    sentForSponsorApprovalBy: number;

    isSponsorApproved: boolean;
    sponsorApprovalDate: string;
    sponsorApprovalBy: number;

    IsSentForQCApproval: boolean;
    sentForQCApprovalOn: string;
    sentForQCApprovalBy: number;

    isApprovedByQC: boolean;
    QCApprovalDate: string;
    QCApprovalBy: number;

    IsSentForSponsorQCApproval: boolean;
    sentForSponsorQCApprovalOn: string;
    sentForSponsorQCApprovalBy: number;
    SponsorQCDisApproveComments: string;

    isApprovedBySponsorQC: boolean;
    SponsorQCApprovalDate: string;
    SponsorQCApprovalBy: number;

    version: string;
    siteComments: string;
    sponsorComments: string;
    qaComments: string;
    QCComments: string;
    uploadedFileName: string;
    siteCTAMasterGuid: string;
    attachmentAWSPath: string;
    tmfArtifactName: string;
    tmfSectionName: string;
    ctaStatus: SiteCTAMasterStatus;
    documentGuid: string;
    sponsorDisApproveComments: string;
    siteDisApproveComments: string;
    siteName: String;
    protocolName:string;
    sponsorName:string;
    categoryName:string;
    createdByName:string;
    updatedByName:string;
    displayFileName:string;
    siteNumber:string;
    qcStatus:number;
    isDocExtension:boolean;
    siteHistory: siteCTAMasterHistory[];
}

export class siteCTAMasterHistory extends BaseAddress {
    SiteCTAMasterId: number;
    SponsorSiteStudyCDAInvitationId: number;
    SponsorCTAMasterId: number;
    IsSentForSiteApproval: boolean;
    SentForSiteApprovalOn: string;
    SentForSiteApprovalBy: number;

    IsSiteApproved: boolean;
    SiteApprovalDate: string;
    SiteApprovedBy: number;

    IsSentForSponsorApproval: boolean;
    SentForSponsorApprovalOn: string;
    SentForSponsorApprovalBy: number;

    IsSponsorApproved: boolean;
    SponsorApprovalDate: string;
    SponsorApprovalBy: number;

    IsSentForQCApproval: boolean;
    SentForQCApprovalOn: string;
    SentForQCApprovalBy: number;

    IsApprovedByQC: boolean;
    QCApprovalDate: string;
    QCApprovalBy: number;

    SiteComments: string;
    SponsorComments: string;
    QCComments: string;
    UploadedFileName: string;
    SiteCTAMasterGuid: string;
    AttachmentAWSPath: string;
}export class siteCTAMasterAuditHistory {
    sponsorCTAMasterId: number;
    valueFrom: string;
    valueTo: string;
    column: columnType;
    ccreatedByName: string;
}
enum columnType {
    version = 1,
    qCComments, attorneyComments,
    sponsorComments,
    ctaStatus, fileUploaded,
    certified,SiteComments, commentsAdded
}

export class SponsorStudyInfoAudit {
  id: number;
  updatedBy: number;
  updatedOn: Date;
  sponsorStudyInfoId: number;
  sponsorStudyInfoAuditDetails: SponsorStudyInfoAuditDetail[] = [];  
}

export class SponsorStudyInfoAuditDetail {
  id: number;
  fieldName: string;
  oldValue: string;
  newValue: string;
  sponsorStudyInfoAuditId: number;
}

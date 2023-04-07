import { BaseEntity } from '../baseentity.model';

export class patientReimbursement extends BaseEntity {
  constructor() {
    super();
  }

  studyVisitId: number;
  charges:number;
  sponsorSiteStudyInvitationId:number;
  isOverHeadChargesApplicable:boolean;
  overheadCharges:number;
  isAdded:boolean;
}

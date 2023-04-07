import { BaseEntity } from '../baseentity.model';

export class additionalCharge extends BaseEntity {
  constructor() {
    super();
  }

  studyAdditionalChargeTypeId: number;
  charges:number;
  sponsorSiteStudyInvitationId:number;
  chargeName:string;
  isOverHeadChargesApplicable:boolean;
  overheadCharges:number;
  isAdded:boolean;
}

import { BaseEntity } from '../baseentity.model';

export class NonProcedureCharge extends BaseEntity {
  constructor() {
    super();
  }
  studyProcedureId:number;
  // studyNonProcedureChargeTypeId: number;
  charges:number;
  sponsorSiteStudyInvitationId:number;
  // visitName:string;
  isOverHeadChargesApplicable:boolean;
  overheadCharges:number;
  isAdded:boolean;
}

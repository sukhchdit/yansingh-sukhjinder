import { BaseEntity } from '../baseentity.model';

export class ProcedureCharge extends BaseEntity {
  constructor() {
    super();
  }

  studyProcedureId: number;
  charges:number;
  sponsorSiteStudyInvitationId:number;
  procedureName:string;
  isOverHeadChargesApplicable:boolean;
  overheadCharges:number;
  isInvoiceable:boolean;
  isAdded:boolean;
}

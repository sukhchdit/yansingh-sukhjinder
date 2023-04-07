import { BaseEntity } from '../baseentity.model';

export class SiteStudyProcedureBudget extends BaseEntity {
  constructor() {
      super();
  }  
  description: string;
  quantity: number;
  isOverheadApplicable: boolean;
  invoiceable: boolean;
  budget: number;
  maxBudget: number;
  procedureId: number;
  siteStudyProcedureBudgetVersionId: number;

  isBudgetChanged: boolean;
  isDescriptionChanged: boolean;

  procedureBudgets: any;
  nonProcedureBudgets: any;
  conditionalProcedureBudgets: any;
}

import { BaseEntity } from "../../baseentity.model";

export class sitestudyprocedurebudgethistoryviewmodel extends BaseEntity {
      
  description: string;
  quantity: number;
  isOverheadApplicable: boolean;
  invoiceable: boolean;
  budget: number;
  maxBudget: number;
  siteStudyProcedureBudgetId: number;
  procedureId: number;
  updatedByName: string;
}

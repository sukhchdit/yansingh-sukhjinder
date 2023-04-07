import { BaseEntity } from '../baseentity.model';

export class StudyProcedureBudget extends BaseEntity {
  constructor() {
    super();
    this.isOverheadApplicable = false;
    this.invoiceable = false;
    this.budget = 0;
    this.maxBudget = 0;
    this.quantity = 0;
  }

  description: string;
  quantity: number;
  isOverheadApplicable: boolean;
  invoiceable: boolean;
  budget: number;
  maxBudget: number;

  studyBudgetVersionArmId: number;
  procedureId: number;
}

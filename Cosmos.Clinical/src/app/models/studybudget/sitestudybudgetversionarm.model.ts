import { BaseEntity } from '../baseentity.model';
import { SiteAdditionalStudyChargesBudget } from './siteadditionalstudychargesbudget.model';
import { SiteStudyProcedureBudget } from './sitestudyprocedurebudget.model';

export class SiteStudyBudgetVersionArm extends BaseEntity {
  constructor() {
    super();
    this.siteStudyProcedureBudgets = [];
    this.siteAdditionalStudyChargesBudget = [];
  }

  siteStudyProcedureBudgetVersionId: number;
  sponsorStudyArmId: number;
  
  siteStudyProcedureBudgets: SiteStudyProcedureBudget[];
  siteAdditionalStudyChargesBudget: SiteAdditionalStudyChargesBudget[];

  procedureBudgets: any;
  nonProcedureBudgets: any;
}

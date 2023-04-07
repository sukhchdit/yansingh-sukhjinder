import { BaseEntity } from '../baseentity.model';
import { AdditionalStudyChargesBudget } from './additionalstudychargesbudget.model';
import { StudyProcedureBudget } from './studyprocedurebudget.model';

export class StudyBudgetVersionArm extends BaseEntity {
  constructor() {
    super();
    this.studyProcedureBudgets = [];
    this.additionalStudyChargesBudgets = [];
  }

  studyProcedureBudgetVersionId: number;
  sponsorStudyArmId: number;

  studyProcedureBudgets: StudyProcedureBudget[];
  additionalStudyChargesBudgets: AdditionalStudyChargesBudget[];

  procedureBudgets: any;
  nonProcedureBudgets: any;
}

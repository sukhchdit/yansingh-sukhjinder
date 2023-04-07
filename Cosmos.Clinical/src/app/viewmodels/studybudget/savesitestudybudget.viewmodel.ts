import { StudyProcedureBudget } from "../../models/studybudget/studyprocedurebudget.model";

export class SaveSiteStudyBudgetViewModel {
  constructor() {
    this.model = new StudyProcedureBudget();
  }
  model: StudyProcedureBudget;
  sponsorStudyVisitTemplateId: string;
  siteStudyBudgetVersionArmId: string;
  columnName: string;
  columnValue: string;
}

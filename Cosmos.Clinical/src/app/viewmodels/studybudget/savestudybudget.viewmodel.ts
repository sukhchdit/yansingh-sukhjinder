import { StudyProcedureBudget } from "../../models/studybudget/studyprocedurebudget.model";

export class SaveStudyBudgetViewModel {
  constructor() {
    this.model = new StudyProcedureBudget();
  }
  model: StudyProcedureBudget;
  sponsorStudyVisitTemplateId: string;
  columnName: string;
  columnValue: string;
}

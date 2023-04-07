import { BaseEntity } from '../baseentity.model';

export class StudyBudgetVersionDiscussion extends BaseEntity {
  constructor() {
    super();    
  }

  studyProcedureBudgetVersionId: number;
  comments: string;
}

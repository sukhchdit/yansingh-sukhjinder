import { BaseEntity } from '../baseentity.model';

export class SiteStudyBudgetVersionDiscussion extends BaseEntity {
  constructor() {
    super();    
  }

  siteStudyProcedureBudgetVersionId: number;
  comments: string;
}

import { BaseEntity } from '../baseentity.model';

export class SiteStudyBudgetVersionComment extends BaseEntity {
  constructor() {
    super();    
  }

  siteStudyProcedureBudgetVersionId: number;
  comments: string;
}

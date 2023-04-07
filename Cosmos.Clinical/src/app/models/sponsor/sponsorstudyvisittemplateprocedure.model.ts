import { BaseEntity } from '../baseentity.model';

export class SponsorStudyVisitTemplateProcedure extends BaseEntity {
  constructor() {
    super();
    this.sponsorStudyVisitTemplateId = 0;
    this.procedureId = 0;
    this.status = true;
  }

  sponsorStudyVisitTemplateId: number;
  procedureId: number;
  studyBudgetVersionArmId: number;
}

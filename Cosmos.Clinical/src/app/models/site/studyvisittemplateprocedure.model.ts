import { BaseEntity } from '../baseentity.model';

export class StudyVisitTemplateProcedure extends BaseEntity {
  constructor() {
    super();
    this.studyVisitTemplateId = 0;
    this.procedureId = 0;
    this.status = true;
  }

  studyVisitTemplateId: number;
  procedureId: number;
}

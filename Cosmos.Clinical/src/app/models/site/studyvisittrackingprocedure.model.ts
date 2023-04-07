import { BaseEntity } from '../baseentity.model';

export class StudyVisitTrackingProcedure extends BaseEntity {
  constructor() {
    super();    
  }
  subjectSignature: string;

  procedureId: number;
  studyVisitTrackingId: number;
}

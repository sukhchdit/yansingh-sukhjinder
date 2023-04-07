import { BaseEntity } from '../baseentity.model';

export class StudyVisitTrackingNote extends BaseEntity {
  constructor() {
    super();
  }
  
  visitNotes: string;
  investigatorNotes: string;

  studyVisitTrackingId: number;
  signImage: string;
  signedBy: number;
  signedOn: any;
}

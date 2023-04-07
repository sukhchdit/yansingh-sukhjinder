import { VisitTemplateStatus } from '../../models/site/studyvisittemplate.model';

export class StudyVisitTrackingLastSavedViewModel {
  studySubjectId: number;
  visitStatus: VisitTemplateStatus;
  screenNumber: string;
  randomizationNumber: string;
  studyVisitTrackingId: number;
}

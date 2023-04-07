import { StudySubject } from '../../models/subject/studysubject.model';

export class BulkSaveStudySubjectResponseViewModel {
  constructor() {
    this.duplicateSubjects = [];
  }
  saved: number;
  duplicateSubjects: StudySubject[] = [];
}

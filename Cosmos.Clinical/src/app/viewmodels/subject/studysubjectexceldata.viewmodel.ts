import { StudySubject } from '../../models/subject/studysubject.model';

export class StudySubjectExcelDataViewModel {
  constructor() {
    this.studySubject = new StudySubject();
  }
  
  studySubject: StudySubject;
  isValid: boolean;
}

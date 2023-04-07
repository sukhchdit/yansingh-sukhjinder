import { Gender } from '../../models/subject/studysubject.model';

export class AuthenticateStudySubjectViewModel {
  
  studySubjectId: number;
  eDiaryKey: string;
  gender: Gender;
  DOB: Date;
}

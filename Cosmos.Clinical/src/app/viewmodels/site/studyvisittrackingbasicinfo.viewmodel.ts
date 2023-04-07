import { SubjectStatus } from "../../models/subject/studysubject.model";

export class StudyVisitTrackingBasicInfoViewModel {
  constructor() {
    this.subjectStatus = SubjectStatus.NotContacted;
  }

  participantNumber: string;
  subjectName: string;
  protocolNumber: string;
  visitName: string;
  subjectStatus: SubjectStatus;
  visitDate: Date;
}

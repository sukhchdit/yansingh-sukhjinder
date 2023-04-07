import { StudySubjectEsourceDocumentType } from "../../document/studysubjectesourcedocument.model";

export enum AdverseEventType { AE = 0, SAE }

export class SelectAdverseEventViewModel {
  constructor() {
    this.adverseEventType = AdverseEventType.AE;
  }
  signOffInvestigator: number;
  studySubjectEsourceDocumentType: StudySubjectEsourceDocumentType;
  subjectId: number;
  sponsorSiteStudyCDAInvitationId: number;
  adverseEventType: AdverseEventType;
  studyVisitTrackingId: number;

  title: string;
  comments: string;
}

import { BaseEntity } from "../baseentity.model";

export class StudySubjectStudyHistory extends BaseEntity {
  constructor() {
    super();
  }

  studySubjectId: number;
  sponsorSiteStudyCDAInvitationId: number;

}

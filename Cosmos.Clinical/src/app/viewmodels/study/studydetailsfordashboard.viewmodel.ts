import { SiteStudyStatus } from "../../models/sponsor/sponsorsitestudycdainvitation.model";

export class StudyDetailsForDashboardViewModel {
    
  sponsorSiteStudyCdaInvitationId: number;
  sponsorName: string;
  studyTitle: string;
  clinicalDescription: string;
  protocolNumber: string;
  siteStudyStatus: SiteStudyStatus;
  recruitmentGoal: string;
  SCHED: string;
  SCRN: string;
  FAIL: string;
  RAND: string;
  COMP: string;
  Goal: string;
}

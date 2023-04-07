import { CalendarEventStatus, CalendarEventType } from './calendarevent.model';
import { EventStatus } from './calendareventparticipent.model';

export class CalendarDetail {
  id: number;
  createdBy: number;
  createdOn: Date;
  status: Boolean;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  subject: string;
  location: string;
  comments: string;
  colorCode: string;
  isPrivate: Boolean;
  assignedToName: string;
  assignedToMobile: string;
  sponsorSiteStudyCDAInvitationId: number;
  studySubjectId: number;
  studyName: string;
  subjectName: string;
  createdByName: string;
  calendarEventStatus: CalendarEventStatus;
  //eventStatus: EventStatus;
  calendarEventType: CalendarEventType;
}

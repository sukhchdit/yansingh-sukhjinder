import { BaseEntity } from '../baseentity.model';
import { CalendarEventParticipent } from './calendareventparticipent.model';

export enum CalendarEventStatus { Scheduled = 1, ReScheduled, NoShow, PastDue, Completed, NotComplete}
export enum CalendarEventType { General = 1, SQV, SubjectVisit, MonitoringVisit, SIV, Training, TeleVisit}

export class CalendarEvent extends BaseEntity {

  constructor() {
    super();
    this.calenderAssignedTo = undefined;
    this.eventReminder = "";
    this.calendarEventStatus = 0;
    this.colorCode = "blue";
    this.sponsorSiteStudyCDAInvitationId = 0;
    this.studySubjectId = 0;
    this.calendarEventType = 0;
  }
  subject: string;
  location: string;
  colorCode: string;    
  comments: string; 
  isPrivate: boolean;      
  displayOnMyCalendar: boolean;      
  sendSMSTextReminder: boolean;      
  startDate: any;
  endDate: any;  
  startTime: string;   
  endTime: string;    
  eventReminder: string;
  calendarEventStatus: CalendarEventStatus;
  calendarEventType: CalendarEventType;
  calenderAssignedTo: number;
  sponsorSiteStudyCDAInvitationId: number;
  studySubjectId: number;
  calendarEventParticipents: CalendarEventParticipent[] = [];
  isVisitTrackingStatus: boolean;
  televisitId: string;
}

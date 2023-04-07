import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/account/services/auth.service';
import { CalendarEvent } from 'src/app/models/calendar/calendarevent.model';
import { CalendarEventParticipent, EventStatus } from 'src/app/models/calendar/calendareventparticipent.model';
import { CalendarDetail } from 'src/app/models/calendar/calendardetail.model';

@Injectable()
export class CalendarEventService {
  port = environment.apiport;
  private readonly _createCalendarEventURL: string = "api/Calendar/Save";
  private readonly _getURL: string = "api/Calendar/GetParticipentsByEvent";
  private readonly _getCalendarEventByCalendarType: string = "api/Calendar/GetCalendarEventByCalendarType";
  private readonly _getCalendarEventsByFiltersURL: string = "api/Calendar/GetCalendarEventsByFilters";
  private readonly _deleteCalendarEventURL: string = "api/Calendar/DeleteEvent";
  private readonly _deleteCalendarEventParticipentURL: string = "api/Calendar/DeleteEventParticipent";
  private readonly _updateCalendarEventParticipentEventStatusURL: string = "api/Calendar/UpdateParticipentEventEventStatus";
  private readonly _checkCalendarEventParticipentEventStatusURL: string = "api/Calendar/CheckParticipentEventEventStatus";
  private readonly _getCalenderEventParticipentURL: string = "api/Calendar/GetCalenderEventParticipent";
  private readonly _getCalendarDetailByEventIdURL: string = "api/Calendar/GetCalendarDetailByEventId";
  private readonly _getByStudyAndSubjectIdURL: string = "api/Calendar/Get";
  private readonly _checkVisitTrackingStatusURL: string = "api/Calendar/CheckVisitTrackingStatus";
  private readonly _sendEmailToEventParticipantsURL: string = "api/Calendar/SendEmailToEventParticipants";
  private readonly _getCalendarEventsByDateURL: string = "api/Calendar/GetCalendarEventsByDate";
  private readonly _getTelevistURL: string = "api/CalendarEventParticipants/GetTelevistUrl";
  

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }


  save(calendarEvent: CalendarEvent) {
    if (calendarEvent.id <= 0 || calendarEvent.id == null || calendarEvent.id == undefined) {
      calendarEvent.createdBy = this.authService.currentUser.id;
      calendarEvent.createdOn = this.momentDatePipe.currentDate;
    } else {
      calendarEvent.updatedBy = this.authService.currentUser.id;
      calendarEvent.updatedOn = this.momentDatePipe.currentDate;
    }

    calendarEvent.startDate = this.momentDatePipe.convertDate(calendarEvent.startDate);
    calendarEvent.endDate = this.momentDatePipe.convertDate(calendarEvent.endDate);

    calendarEvent.calendarEventParticipents.forEach(participent => {
      participent.startDate = this.momentDatePipe.convertDate(participent.startDate);
      participent.endDate = this.momentDatePipe.convertDate(participent.endDate);
    });

    return this.endpoint.addupdate<any>(calendarEvent, this._createCalendarEventURL);
  }

  sendEmailToEventParticipants(obj) {
    return this.endpoint.addupdate<any>(obj, this._sendEmailToEventParticipantsURL);
  }

  get(eventId) {
    const url = this._getURL + "?eventId=" + eventId;
    return this.endpoint.get<CalendarEvent>(url);
  }

  getCalendarEventsByOrganizationContact(organizationContactId, isPrivate: boolean) {
    const url = this._getCalendarEventByCalendarType + "?organizationContactId=" + organizationContactId + "&isPrivate=" + isPrivate;
    return this.endpoint.get<CalendarEvent[]>(url);
  }

  getCalendarEventsByFilters(isPrivate, organizationContactId, calendarEventType, startDate, endDate) {
    const url = this._getCalendarEventsByFiltersURL + "?isPrivate=" + isPrivate + "&organizationContactId=" + organizationContactId + "&calendarEventType=" + calendarEventType + "&startDate=" + startDate + "&endDate=" + endDate;
    return this.endpoint.get<CalendarEvent[]>(url);
  }
  deleteEvent(id: number) {
    const url = this._deleteCalendarEventURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
  deleteEventParticipent(id: number) {
    const url = this._deleteCalendarEventParticipentURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
  updateEventParticipentEventStatus(id: number, eventStatus: EventStatus, eventId: number) {
    const url = this._updateCalendarEventParticipentEventStatusURL + "?id=" + id + "&eventStatus=" + eventStatus + "&eventId=" + eventId;
    return this.endpoint.get<boolean>(url);
  }
  checkEventParticipentEventStatus(id: number) {
    const url = this._checkCalendarEventParticipentEventStatusURL + "?id=" + id;
    return this.endpoint.get<EventStatus>(url);
  }
  getCalenderEventParticipent(id: number) {
    const url = this._getCalenderEventParticipentURL + "?id=" + id;
    return this.endpoint.get<CalendarEventParticipent>(url);
  }
  getCalendarEventByCalendarType(organizationContactId, isPrivate: boolean) {
    const url = this._getCalendarEventByCalendarType + "?organizationContactId=" + organizationContactId + "&isPrivate=" + isPrivate;
    return this.endpoint.get<CalendarEvent[]>(url);
  }
  getCalendarDetailByEventId(eventId) {
    const url = this._getCalendarDetailByEventIdURL + "?eventId=" + eventId;
    return this.endpoint.get<CalendarDetail>(url);
  }

  getByStudyAndSubjectId(sponsorSiteStudyCDAInvitationId, studySubjectId) {
    const url = this._getByStudyAndSubjectIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId + "&studySubjectId=" + studySubjectId;
    return this.endpoint.get<CalendarEvent>(url);
  }

  checkVisitTrackingStatus(sponsorSiteStudyCDAInvitationId, studySubjectId) {
    const url = this._checkVisitTrackingStatusURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId + "&studySubjectId=" + studySubjectId;
    return this.endpoint.get<CalendarEvent>(url);
  }

  GetCalendarEventsByDate(organizationContactId, startDate, endDate, userAssignedOnly) {
    const url = this._getCalendarEventsByDateURL + "?organizationContactId=" + organizationContactId + "&startDate=" + startDate + "&endDate=" + endDate + "&userAssignedOnly=" + userAssignedOnly;
    return this.endpoint.get<CalendarEvent[]>(url);
  }

  getTelevistUrl(eventId) {
    const url = this._getTelevistURL + "?id=" + eventId;
    return this.endpoint.get<any>(url);
  }
}

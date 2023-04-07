import { BaseEntity } from '../baseentity.model';
import { OrganizationContact } from '../organization/organizationcontact.model';

export enum EventStatus { Pending = 1, Accept, Reject }

export class CalendarEventParticipent extends BaseEntity {

  constructor() {
    super();
    //this.organizationContact = new OrganizationContact();
  }
  startDate: any;
  endDate: any;  
  startTime: string;   
  endTime: string;    
  comment: string;
  eventStatus: EventStatus;
  calendarEventId: number;
  organizationContactId: number;
  organizationContact: OrganizationContact;
}

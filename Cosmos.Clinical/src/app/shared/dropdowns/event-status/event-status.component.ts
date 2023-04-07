import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEventStatus } from 'src/app/models/calendar/calendarevent.model';

@Component({
  selector: 'app-event-status',
  templateUrl: './event-status.component.html',
  styleUrls: ['./event-status.component.css']
})
export class EventStatusComponent {
  @Input() fieldValidation: boolean = false;
  @Output() eventStatusValue = new EventEmitter<any>();
  @Input() eventValue: any;
  CalendarEventStatusObject = CalendarEventStatus;
  CalendarEventStatusOptions = Object.keys(CalendarEventStatus).map(key => CalendarEventStatus[key]).filter(value => typeof value === 'string');

  onValueChange(selectValue) {
    if (selectValue) {
      this.eventStatusValue.emit(selectValue);
    }
  }
}

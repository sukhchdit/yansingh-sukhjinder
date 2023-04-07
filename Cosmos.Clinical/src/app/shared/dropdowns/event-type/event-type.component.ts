import { Component,Input, Output, EventEmitter } from '@angular/core';
import { CalendarEventType } from 'src/app/models/calendar/calendarevent.model';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.css']
})
export class EventTypeComponent {
  @Input() fieldValidation: boolean = false;
  @Output() calendarEventValue = new EventEmitter<any>();
  @Input() eventValue: any;
  CalendarEventObject = CalendarEventType;
  CalendarEventOptions = Object.keys(CalendarEventType).map(key => CalendarEventType[key]).filter(value => typeof value === 'string');

  onValueChange(selectValue) {
    if (selectValue) {
      this.calendarEventValue.emit(selectValue);
    }
  }
}

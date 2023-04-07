import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ScheduledEventComponent } from './scheduled-event/scheduled-event.component';
import { CalendarEventService } from 'src/app/core/services/calendar/calendarevent.service';
import { OrganizationService } from 'src/app/core/services/organization/organization.service';
import { MomentDatePipe } from 'src/app/core/pipes/momentdate.pipe';
import { StudySubjectService } from 'src/app/core/services/subject/studysubject.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ScheduledEventComponent,
    MomentDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    ScheduledEventComponent
  ],
  providers: [
    CalendarEventService,
    OrganizationService,
    DatePipe,
    StudySubjectService
  ]
})
export class CalendarFeatureModule { }

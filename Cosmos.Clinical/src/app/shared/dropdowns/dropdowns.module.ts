import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcfTypeComponent } from './icf-type/icf-type.component';
import { IcfSourceComponent } from './icf-source/icf-source.component';
import { LanguagesComponent } from './languages/languages.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { EventTypeComponent } from './event-type/event-type.component';
import { EventStatusComponent } from './event-status/event-status.component';



@NgModule({
  declarations: [
    IcfTypeComponent,
    IcfSourceComponent,
    LanguagesComponent,
    DropdownComponent,
    EventTypeComponent,
    EventStatusComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IcfTypeComponent,
    IcfSourceComponent,
    LanguagesComponent,
    DropdownComponent,
    EventTypeComponent,
    EventStatusComponent
  ]
})
export class DropdownsModule { }

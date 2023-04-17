import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaidService } from './maid/maid.service';
import { ToastNotificationService } from './toastnotification.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MaidService,
    ToastNotificationService
  ],
  providers: []
})
export class ServicesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonActionsComponent } from './common-actions.component';
import { EvaultService } from 'src/app/core/services/evault/evault.service';



@NgModule({
  declarations: [
    CommonActionsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonActionsComponent
  ],
  providers: [
    EvaultService
  ]
})
export class CommonActionsModule { }

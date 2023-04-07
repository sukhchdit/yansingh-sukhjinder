import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorRoutingModule } from './sponsor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SponsorRoutingModule
  ]
})
export class SponsorModule { }

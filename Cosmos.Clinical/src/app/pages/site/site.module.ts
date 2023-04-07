import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }

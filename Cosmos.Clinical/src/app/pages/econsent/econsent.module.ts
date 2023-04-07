import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EconsentRoutingModule } from './econsent-routing.module';
import { AdminComponent } from './admin/admin.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
import { EndPointService } from 'src/app/core/services/endpoint.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EManagerModalComponent } from './e-manager-modal/e-manager-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsComponent } from './reports/reports.component';
import { CalendarFeatureModule } from 'src/app/feature/calendar-feature/calendar-feature.module';
import { PaperSignModalComponent } from './dashboard/paper-sign-modal/paper-sign-modal.component';
import { CommentsModalComponent } from './dashboard/comments-modal/comments-modal.component';
import { DocumentMasterService } from 'src/app/core/services/document/documentmaster.service';


@NgModule({
  declarations: [
    AdminComponent,
    MainLayoutComponent,
    DashboardComponent,
    EManagerModalComponent,
    ReportsComponent,
    PaperSignModalComponent,
    CommentsModalComponent
  ],
  imports: [
    CommonModule,
    EconsentRoutingModule,
    SharedModule,
    CalendarFeatureModule,
  ],
  providers: [
    EndPointService,
    EconsentService,
    DocumentMasterService
  ]
})
export class EconsentModule { }

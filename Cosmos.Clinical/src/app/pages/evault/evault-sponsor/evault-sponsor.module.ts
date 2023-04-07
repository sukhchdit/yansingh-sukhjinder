import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EosDocumentsSponsorComponent } from './eos-documents-sponsor/eos-documents-sponsor.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EvaultSponsorRoutingModule } from './evault-sponsor-routing.module';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { SponsorStudyService } from 'src/app/core/services/sponsor/sponsorstudy.service';
import { RouterModule } from '@angular/router';
import { SafetyDocumentsSponsorComponent } from './safety-documents-sponsor/safety-documents-sponsor.component';
import { EosSponsorGridComponent } from './eos-sponsor-grid/eos-sponsor-grid.component';
import { FormsModule } from '@angular/forms';
import { CommonActionsModule } from 'src/app/feature/common-actions/common-actions/common-actions.module';
import { EvaultCommonModule } from '../evault-common/evault-common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadSafetyDocumentComponent } from './upload-safety-document/upload-safety-document.component';
import { DocumentMasterService } from 'src/app/core/services/document/documentmaster.service';
import { LoginService } from 'src/app/account/services/login.service';



@NgModule({
  declarations: [
       EosDocumentsSponsorComponent,
       ComplianceComponent,
       SafetyDocumentsSponsorComponent,
       EosSponsorGridComponent,
       UploadSafetyDocumentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    EvaultSponsorRoutingModule,
    RouterModule,
    EvaultCommonModule,
    FormsModule,
    CommonActionsModule
  ],
  providers: [
    EvaultService,
    SponsorStudyService,
    DocumentMasterService,
    LoginService
  ]
})
export class EvaultSponsorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SponsorService } from 'src/app/core/services/sponsor/sponsor.service';
import { SponsorStudyService } from 'src/app/core/services/sponsor/sponsorstudy.service';
import { EvaultFilePdfViewerComponent } from './evault-file-pdf-viewer/evault-file-pdf-viewer.component';
import { EvaultCommonActionDialogComponent } from './evault-common-action-dialog/evault-common-action-dialog.component';
import { SiteService } from 'src/app/core/services/site/site.service';
import { PdfViewerModule } from 'src/app/feature/pdf-viewer/pdf-viewer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EndPointService } from 'src/app/core/services/endpoint.service';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ESignModalComponent } from './e-sign-modal/e-sign-modal.component';
import { SignaturePadModule } from 'angular2-signaturepad';



@NgModule({
  declarations: [
    EvaultFilePdfViewerComponent,
    EvaultCommonActionDialogComponent,
    ESignModalComponent
    ],
  imports: [
    CommonModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    SignaturePadModule
  ],
  exports: [
    EvaultFilePdfViewerComponent,
    EvaultCommonActionDialogComponent
  ],
  providers: [
    EvaultService,
    SponsorStudyService,
    SponsorService,
    CommonService,
    SiteService,
    EndPointService,
    EconsentService
  ]
})
export class EvaultCommonModule { }

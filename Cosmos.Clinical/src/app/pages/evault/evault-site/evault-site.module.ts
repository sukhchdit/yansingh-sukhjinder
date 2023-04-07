import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EosDocumentsPrimarySiteComponent } from './eos-documents-primary-site/eos-documents-primary-site.component';
import { SafteyDocumentsSiteComponent } from './saftey-documents-site/saftey-documents-site.component';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { SponsorStudyService } from 'src/app/core/services/sponsor/sponsorstudy.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EvaultSiteRoutingModule } from './evault-site-routing.module';
import { EvaultCommonModule } from '../evault-common/evault-common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PdfViewerModule } from 'src/app/feature/pdf-viewer/pdf-viewer.module';
import { LoginService } from 'src/app/account/services/login.service';
import { DocumentMasterService } from 'src/app/core/services/document/documentmaster.service';



@NgModule({
  declarations: [
    EosDocumentsPrimarySiteComponent,
    SafteyDocumentsSiteComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    EvaultSiteRoutingModule,
    EvaultCommonModule,
    SharedModule,
    PdfViewerModule
  ],
  providers: [
    EvaultService,
    SponsorStudyService,
    DocumentMasterService,
    LoginService
  ]
})
export class EvaultSiteModule { }

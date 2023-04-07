import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndPointService } from 'src/app/core/services/endpoint.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentMasterService } from 'src/app/core/services/document/documentmaster.service';
import { EdocsRoutingModule } from './edocs-routing.module';
import { EdocsComponent } from './edocs.component';


@NgModule({
  declarations: [
    EdocsComponent
  ],
  imports: [
    CommonModule,
    EdocsRoutingModule,
    SharedModule
  ],
  providers: [
    EndPointService,
    DocumentMasterService
  ]
})
export class EdocsModule { }

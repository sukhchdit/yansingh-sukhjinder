import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterLayoutRoutingModule } from './master-layout-routing.module';
import { MasterLayoutComponent } from './master-layout.component';
import { SiteService } from 'src/app/core/services/site/site.service';
import { EndPointService } from 'src/app/core/services/endpoint.service';
import { HttpClientModule } from '@angular/common/http';
import { InvestigatorService } from 'src/app/core/services/site/investigator/investigator.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';


@NgModule({
  declarations: [
    MasterLayoutComponent,
    LeftNavComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    MasterLayoutRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers:[
    SiteService,
    EndPointService,
    InvestigatorService
  ]
})
export class MasterLayoutModule { }

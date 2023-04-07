import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterLayoutRoutingModule } from './master-layout-routing.module';
import { MasterLayoutComponent } from './master-layout.component';
import { EndPointService } from 'src/app/core/services/endpoint.service';
import { HttpClientModule } from '@angular/common/http';
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
    EndPointService
  ]
})
export class MasterLayoutModule { }

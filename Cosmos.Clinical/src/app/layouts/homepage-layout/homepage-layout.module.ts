import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndPointService } from 'src/app/core/services/endpoint.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageLayoutRoutingModule } from './homepage-layout-routing.module';
import { HomePageLayoutComponent } from './homepage-layout.component';
import { RegisterMaidComponent } from './registermaid/registermaid.component';
import { MaidDetailsComponent } from './maiddetails/maiddetails.component';


@NgModule({
  declarations: [
    HomePageLayoutComponent,
    FooterComponent,
    HeaderComponent,
    RegisterMaidComponent,
    MaidDetailsComponent
  ],
  imports: [
    CommonModule,
    HomePageLayoutRoutingModule,
    HttpClientModule,
    FontAwesomeModule
    
  ],
  providers: [
    EndPointService,
  ]
})
export class HomePageLayoutModule { }

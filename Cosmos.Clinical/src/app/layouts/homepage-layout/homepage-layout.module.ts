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
import { MaidService } from '../../core/services/maid/maid.service';
import { FormsModule } from '@angular/forms';
import { ContactUsComponent } from './contactus/contactus.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { ToastNotificationService } from '../../core/services/toastnotification.service';
import { RegisterEmployerComponent } from './registeremployer/registeremployer.component';


@NgModule({
  declarations: [
    HomePageLayoutComponent,
    FooterComponent,
    HeaderComponent,
    RegisterMaidComponent,
    MaidDetailsComponent,
    ContactUsComponent,
    AboutUsComponent,
    RegisterEmployerComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HomePageLayoutRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    EndPointService,
    MaidService,
    ToastNotificationService
  ]
})
export class HomePageLayoutModule { }

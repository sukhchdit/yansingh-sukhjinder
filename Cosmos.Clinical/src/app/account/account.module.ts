import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { EndPointService } from '../core/services/endpoint.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { ForgotPasswordService } from './services/forgotpassword.service';
import { AuthGuard } from './services/auth-guard.service';
import { SetPasswordService } from './services/setpassword.service';
import { OrganizationService } from '../core/services/organization/organization.service';
import { SiteService } from '../core/services/site/site.service';
import { MonitorService } from '../core/services/monitor/monitor.service';
import { CommonService } from '../core/services/common/common.service';
import { InvestigatorService } from '../core/services/site/investigator/investigator.service';
import { MomentDatePipe } from '../core/pipes/momentdate.pipe';
import { SponsorService } from '../core/services/sponsor/sponsor.service';
import { CroService } from '../core/services/cro/cro.service';
import { CalendarEventService } from '../core/services/calendar/calendarevent.service';


@NgModule({
  declarations: [
    LoginComponent,
    SetpasswordComponent,
    RegisterComponent,
    ForgotpasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    EndPointService,
    UserService,
    LoginService,
    RegisterService,
    LocalStoreManager,
    ForgotPasswordService,
    AuthGuard,
    SetPasswordService,
    AuthService,
    OrganizationService,
    SiteService,
    MonitorService,
    CommonService,
    InvestigatorService,
    MomentDatePipe,
    SponsorService,
    CroService,
    CalendarEventService,
  ]
})
export class AccountModule { }

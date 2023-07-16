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
import { MomentDatePipe } from '../core/pipes/momentdate.pipe';


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
    MomentDatePipe,
  ]
})
export class AccountModule { }

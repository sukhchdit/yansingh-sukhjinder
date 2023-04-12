import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardsModule } from './guards/guards.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { MomentDatePipe } from './pipes/momentdate.pipe';
import { AuthService } from '../account/services/auth.service';
import { LocalStoreManager } from '../account/services/local-store-manager.service';
import { AuthGuard } from '../account/services/auth-guard.service';
import { EndPointService } from './services/endpoint.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaidService } from './services/maid/maid.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GuardsModule,
    InterceptorsModule,
    FontAwesomeModule
  ],
  providers: [
    MomentDatePipe,
    AuthService,
    LocalStoreManager,
    AuthGuard,
    EndPointService,
    MaidService
  ]
})
export class CoreModule { }

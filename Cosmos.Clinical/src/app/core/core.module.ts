import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GuardsModule } from './guards/guards.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { MomentDatePipe } from './pipes/momentdate.pipe';
import { AuthService } from '../account/services/auth.service';
import { LocalStoreManager } from '../account/services/local-store-manager.service';
import { AuthGuard } from '../account/services/auth-guard.service';
import { EndPointService } from './services/endpoint.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    EndPointService
  ]
})
export class CoreModule { }

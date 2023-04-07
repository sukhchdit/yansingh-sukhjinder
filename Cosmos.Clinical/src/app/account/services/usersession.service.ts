import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserSession } from '../../models/account/usersession.model';
import { EndPointService } from 'src/app/core/services/endpoint.service';


@Injectable()
export class UserSessionService {

  private readonly _setsessionUrl: string = "api/account/SetUserSession";
  private readonly _updatesessionUrl: string = "api/account/UpdateUserSession";

  constructor(private endPoint: EndPointService, private authService: AuthService) {

  }

  setSession(obj: UserSession) {
    obj.createdById = this.authService.currentUser.id;
    obj.updatedById = this.authService.currentUser.id;
    return this.endPoint.addupdate<UserSession>(obj, this._setsessionUrl);
  }

  updateSession(obj: UserSession) {    
    obj.updatedById = this.authService.currentUser.id;
    return this.endPoint.addupdate<UserSession>(obj, this._updatesessionUrl);
  }
}

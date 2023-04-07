import { Injectable } from '@angular/core';
import { EndPointService } from 'src/app/core/services/endpoint.service';
import { LoginResponse } from '../../models/account/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _signInUrl: string = "api/account/Authenticate";
  private readonly _activateInUrl: string = "api/account/ActivateUser";

  constructor(private endPoint: EndPointService) { }

  signIn(obj) {
    return this.endPoint.addupdate<LoginResponse>(obj, this._signInUrl);
  }

  activateUser(obj) {
    return this.endPoint.addupdate<any>(obj, this._activateInUrl);
  }

}

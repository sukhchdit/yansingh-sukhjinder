import { Injectable } from '@angular/core';
import { EndPointService } from 'src/app/core/services/endpoint.service';
import { AuthService } from './auth.service';

@Injectable()
export class RegisterService {

  private readonly _addeditUrl: string = "api/Account/Register";
  private readonly _createSponsorUrl: string = "api/Account/CreateSponsor";
  
  constructor(private endPoint: EndPointService, private authService: AuthService) {
  }

  addEditObj(obj) {    
    return this.endPoint.addupdate<any>(obj, this._addeditUrl);
  }

  createSponsor(obj) {
    return this.endPoint.addupdate<any>(obj, this._createSponsorUrl);
  }
}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { IRB } from '../../models/common/irb.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class IRBService {
  private readonly _getURL: string = "api/IRB/Get";
  private readonly _getAllURL: string = "api/IRB/GetAll";
  private readonly _saveURL: string = "api/IRB/Save";
  private readonly _deleteURL: string = "api/IRB/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<IRB>(url);
  }

  getAll() {
    return this.endpoint.get<IRB[]>(this._getAllURL);
  }

  save(irb: IRB) {
    if (irb.id <= 0)
      irb.createdBy = this.authService.currentUser.id;
    irb.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<IRB>(irb, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

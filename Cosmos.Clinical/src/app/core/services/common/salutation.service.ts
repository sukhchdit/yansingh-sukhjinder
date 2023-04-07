import { Injectable } from '@angular/core';
import { AuthService } from '../../../account/services/auth.service';
import { Salutation } from '../../../models/common/salutation.model';
import { EndPointService } from '../endpoint.service';


@Injectable()
export class SalutationService {
  private readonly _getURL: string = "api/Salutation/Get";
  private readonly _getAllURL: string = "api/Salutation/GetAll";
  private readonly _saveURL: string = "api/Salutation/Save";
  private readonly _deleteURL: string = "api/Salutation/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<Salutation>(url);
  }

  getAll() {
    return this.endpoint.get<Salutation[]>(this._getAllURL);
  }

  save(salutation: Salutation) {
    if (salutation.id <= 0)
      salutation.createdBy = this.authService.currentUser.id;
    salutation.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<Salutation>(salutation, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

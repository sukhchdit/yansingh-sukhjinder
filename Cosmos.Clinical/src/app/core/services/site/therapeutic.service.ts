import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { Therapeutic } from '../../models/site/therapeutic.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class TherapeuticService {
  private readonly _getURL: string = "api/Therapeutic/Get";
  private readonly _getAllURL: string = "api/Therapeutic/GetAll";
  private readonly _getParentURL: string = "api/Therapeutic/GetParent";
  private readonly _getChildURL: string = "api/Therapeutic/GetChild";
  private readonly _saveURL: string = "api/Therapeutic/Save";
  private readonly _deleteURL: string = "api/Therapeutic/Delete";
  private readonly _checkTherapeuticExistsURL: string = "api/Therapeutic/CheckTherapeuticExists";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<Therapeutic>(url);
  }

  getAll() {
    return this.endpoint.get<Therapeutic[]>(this._getAllURL);
  }

  save(therapeutic: Therapeutic) {
    if (therapeutic.id <= 0 || therapeutic.id == null || therapeutic.id == undefined)
      therapeutic.createdBy = this.authService.currentUser.id;
    therapeutic.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<Therapeutic>(therapeutic, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  checkTherapeuticExists(name: string) {
    const url = this._checkTherapeuticExistsURL + "?name=" + name;
    return this.endpoint.get<boolean>(url);
  }
}

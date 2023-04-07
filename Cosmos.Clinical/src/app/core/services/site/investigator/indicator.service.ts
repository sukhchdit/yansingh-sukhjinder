import { Injectable } from '@angular/core';
import { EndPointService } from '../../endpoint.service';
import { Indicator } from '../../../models/site/investigator/indicator.model';
import { AuthService } from '../../account/auth.service';


@Injectable()
export class IndicatorService {
  private readonly _getURL: string = "api/Indicator/Get";
  private readonly _getAllURL: string = "api/Indicator/GetAll";
  private readonly _getByTherapeuticURL: string = "api/Indicator/GetByTherapeutic";
  private readonly _saveURL: string = "api/Indicator/Save";
  private readonly _deleteURL: string = "api/Indicator/Delete";
  private readonly _checkIndicatorExistsURL: string = "api/Indicator/CheckIndicatorExists";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<Indicator>(url);
  }

  checkIndicatorExists(id, name) {
    const url = this._checkIndicatorExistsURL + "?id=" + id + "&name=" + name;
    return this.endpoint.get<boolean>(url);
  }

  getAll() {
    return this.endpoint.get<Indicator[]>(this._getAllURL);
  }

  getByTherapeutic(therapeuticId) {
    const url = this._getByTherapeuticURL + "?therapeuticId=" + therapeuticId;
    return this.endpoint.get<Indicator[]>(url);
  }

  save(indicator: Indicator) {
    if (indicator.id <= 0 || indicator.id == null || indicator.id==undefined)
      indicator.createdBy = this.authService.currentUser.id;
    indicator.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<Indicator>(indicator, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

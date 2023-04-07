import { Injectable } from '@angular/core';
import { State } from '@popperjs/core';
import { Subject } from 'rxjs';
import { Country } from 'src/app/models/common/country.model';
import { ViewAuditLogsViewModel } from 'src/app/viewmodels/common/viewauditlogs.viewmodel';
import { EndPointService } from '../endpoint.service';

@Injectable()
export class CommonService {
  private readonly _getCountriesURL: string = "api/Common/GetCountries";
  private readonly _getStatesURL: string = "api/Common/GetStates";
  private readonly _setMissingGuidDataURL: string = "api/Common/SetMissingGuidValues";
  private readonly _getAuditLogsURL: string = "api/Common/GetAuditLogs";

  private selectedDropDownValue = new Subject();
  constructor(private endpoint: EndPointService) {

  }

  getCountries() {
    return this.endpoint.get<Country[]>(this._getCountriesURL);
  }

  setMissingGuidData() {
    return this.endpoint.get(this._setMissingGuidDataURL);
  }

  getStates(countryId) {
    const url = this._getStatesURL + "?countryId=" + countryId;
    return this.endpoint.get<State[]>(url);
  }

  getAuditLogs(entityId) {
    const url = this._getAuditLogsURL + "?entityId=" + entityId;
    return this.endpoint.get<ViewAuditLogsViewModel[]>(url);
  }


}

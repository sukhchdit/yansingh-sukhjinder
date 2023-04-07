import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { LicenseType } from '../../models/common/licensetype.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class LicenseTypeService {
  private readonly _getURL: string = "api/LicenseType/Get";
  private readonly _getAllURL: string = "api/LicenseType/GetAll";
  private readonly _saveURL: string = "api/LicenseType/Save";
  private readonly _deleteURL: string = "api/LicenseType/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<LicenseType>(url);
  }

  getAll() {
    return this.endpoint.get<LicenseType[]>(this._getAllURL);
  }

  save(licenseType: LicenseType) {
    if (licenseType.id <= 0)
      licenseType.createdBy = this.authService.currentUser.id;
    licenseType.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<LicenseType>(licenseType, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{additionalChargeType} from '../../models/billing/additionalchargetype.model'

@Injectable()
export class additionalChargeTypeService {
  private readonly _getURL: string = "api/SiteStudyBilling/GetStudyAdditionalChargeType";
  private readonly _getAllURL: string = "api/SiteStudyBilling/GetAllStudyAdditionalChargeType";
  private readonly _saveURL: string = "api/SiteStudyBilling/SaveStudyAdditionalChargeType";
  private readonly _deleteURL: string = "api/SiteStudyBilling/DeleteStudyAdditionalChargeType";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<additionalChargeType>(url);
  }

  getAll() {
    return this.endpoint.get<additionalChargeType[]>(this._getAllURL);
  }

  save(additionalChargeType: additionalChargeType) {
    if (additionalChargeType.id <= 0)
    additionalChargeType.createdBy = this.authService.currentUser.id;
    additionalChargeType.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<additionalChargeType>(additionalChargeType, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

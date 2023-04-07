import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{VendorPaymentInfo} from '../../models/vendorManagement/vendorInfo.model'

@Injectable()
export class vendorPaymentInfoService {
  private readonly _getURL: string = "api/vendorManagement/GetvendorPaymentInfoById";
  private readonly _getAllURL: string = "api/vendorManagement/GetAllvendorPaymentInfo";
  private readonly _saveURL: string = "api/vendorManagement/SavevendorPaymentInfo";
  private readonly _deleteURL: string = "api/vendorManagement/DeletevendorPaymentInfo";
  private readonly _getbyVendorIdURL: string = "api/vendorManagement/GetVendorPaymentInfoByVendorId";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<VendorPaymentInfo>(url);
  }

  getAll() {
    return this.endpoint.get<VendorPaymentInfo[]>(this._getAllURL);
  }
 getByVendorId(id) {
    return this.endpoint.get<VendorPaymentInfo[]>(this._getbyVendorIdURL+'?vendorId='+id);
  }
  save(vendorPaymentInfo: VendorPaymentInfo) {
    if (vendorPaymentInfo.id <= 0)
    vendorPaymentInfo.createdBy = this.authService.currentUser.id;
    vendorPaymentInfo.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<VendorPaymentInfo>(vendorPaymentInfo, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

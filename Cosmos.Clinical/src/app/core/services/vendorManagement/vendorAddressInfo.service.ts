import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{VendorAddressInfo} from '../../models/vendorManagement/vendorInfo.model'

@Injectable()
export class vendorAddressInfoService {
  private readonly _getURL: string = "api/vendorManagement/GetvendorAddressInfoById";
  private readonly _getAllURL: string = "api/vendorManagement/GetAllvendorAddressInfo";
  private readonly _saveURL: string = "api/vendorManagement/SavevendorAddressInfo";
  private readonly _deleteURL: string = "api/vendorManagement/DeletevendorAddressInfo";
  private readonly _getbyVendorIdURL: string = "api/vendorManagement/GetVendorAddressInfoByVendorId";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<VendorAddressInfo>(url);
  }

  getAll() {
    return this.endpoint.get<VendorAddressInfo[]>(this._getAllURL);
  }
 getByVendorId(id ) {
    return this.endpoint.get<VendorAddressInfo>(this._getbyVendorIdURL+'?vendorId='+id);
  }
  save(vendorAddressInfo: VendorAddressInfo) {
    if (vendorAddressInfo.id <= 0)
    vendorAddressInfo.createdBy = this.authService.currentUser.id;
    vendorAddressInfo.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<VendorAddressInfo>(vendorAddressInfo, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

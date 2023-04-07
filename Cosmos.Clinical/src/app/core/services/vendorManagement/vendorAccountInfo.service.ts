import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{VendorAccountInfo} from '../../models/vendorManagement/vendorInfo.model'

@Injectable()
export class vendorAccountInfoService {
  private readonly _getURL: string = "api/vendorManagement/GetVendorAccountInfoById";
  private readonly _getAllURL: string = "api/vendorManagement/GetAllVendorAccountInfo";
  private readonly _saveURL: string = "api/vendorManagement/SaveVendorAccountInfo";
  private readonly _deleteURL: string = "api/vendorManagement/DeleteVendorAccountInfo";
  private readonly _getbyVendorIdURL: string = "api/vendorManagement/GetVendorAccountInfoByVendorId";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<VendorAccountInfo>(url);
  }

  getAll() {
    return this.endpoint.get<VendorAccountInfo[]>(this._getAllURL);
  }
  
  getByVendorId(id) {
    return this.endpoint.get<VendorAccountInfo>(this._getbyVendorIdURL+'?vendorId='+id);
  }
  
  save(VendorAccountInfo: VendorAccountInfo) {
    if (VendorAccountInfo.id <= 0)
    VendorAccountInfo.createdBy = this.authService.currentUser.id;
    VendorAccountInfo.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<VendorAccountInfo>(VendorAccountInfo, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

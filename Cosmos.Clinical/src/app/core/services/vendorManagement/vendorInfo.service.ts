import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{VendorInfo} from '../../models/vendorManagement/vendorInfo.model'

@Injectable()
export class vendorInfoService {
  private readonly _getURL: string = "api/vendorManagement/GetVendorInfoById";
  private readonly _searchByNameURL: string = "api/vendorManagement/GetAllVendorSearchByName";
  private readonly _getAllURL: string = "api/vendorManagement/GetAllVendorInfo";
  private readonly _saveURL: string = "api/vendorManagement/SaveVendorInfo";
  private readonly _deleteURL: string = "api/vendorManagement/DeleteVendorInfo";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<VendorInfo>(url);
  }

  searchByName(key) {
    const url = this._searchByNameURL + "?key=" + key;
    return this.endpoint.get<VendorInfo[]>(url);
  }

  getAll(status :boolean) {
    return this.endpoint.get<VendorInfo[]>(this._getAllURL+"?status="+status);
  }

  save(vendorInfo: VendorInfo) {
    if (vendorInfo.id <= 0)
    vendorInfo.createdBy = this.authService.currentUser.id;
    vendorInfo.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<VendorInfo>(vendorInfo, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

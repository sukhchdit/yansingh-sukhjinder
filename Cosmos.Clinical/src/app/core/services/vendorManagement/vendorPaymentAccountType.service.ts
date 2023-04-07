import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{VendorPaymentAccountType} from '../../models/vendorManagement/vendorInfo.model'

@Injectable()
export class vendorPaymentAccountTypeService {
  private readonly _getURL: string = "api/vendorManagement/GetvendorPaymentAccountTypeById";
  private readonly _getAllURL: string = "api/vendorManagement/GetAllvendorPaymentAccountType";
  private readonly _saveURL: string = "api/vendorManagement/SavevendorPaymentAccountType";
  private readonly _deleteURL: string = "api/vendorManagement/DeletevendorPaymentAccountType";
  private readonly _getbyVendorIdURL: string = "api/vendorManagement/GetvendorPaymentAccountTypeByVendorId";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<VendorPaymentAccountType>(url);
  }

  getAll() {
    return this.endpoint.get<VendorPaymentAccountType[]>(this._getAllURL);
  }
  save(vendorPaymentAccountType: VendorPaymentAccountType) {
    if (vendorPaymentAccountType.id <= 0)
    vendorPaymentAccountType.createdBy = this.authService.currentUser.id;
    vendorPaymentAccountType.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<VendorPaymentAccountType>(vendorPaymentAccountType, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

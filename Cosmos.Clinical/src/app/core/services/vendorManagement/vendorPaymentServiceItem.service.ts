import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import{VendorPaymentServiceItem} from '../../models/vendorManagement/vendorInfo.model'

@Injectable()
export class vendorPaymentServiceItemService {
  private readonly _getURL: string = "api/vendorManagement/GetvendorPaymentServiceItemById";
  private readonly _getAllURL: string = "api/vendorManagement/GetAllvendorPaymentServiceItem";
  private readonly _saveURL: string = "api/vendorManagement/SavevendorPaymentServiceItem";
  private readonly _deleteURL: string = "api/vendorManagement/DeletevendorPaymentServiceItem";
  private readonly _getbyVendorIdURL: string = "api/vendorManagement/GetvendorPaymentServiceItemByVendorId";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<VendorPaymentServiceItem>(url);
  }

  getAll() {
    return this.endpoint.get<VendorPaymentServiceItem[]>(this._getAllURL);
  }
  save(vendorPaymentServiceItem: VendorPaymentServiceItem) {
    if (vendorPaymentServiceItem.id <= 0)
    vendorPaymentServiceItem.createdBy = this.authService.currentUser.id;
    vendorPaymentServiceItem.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<VendorPaymentServiceItem>(vendorPaymentServiceItem, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

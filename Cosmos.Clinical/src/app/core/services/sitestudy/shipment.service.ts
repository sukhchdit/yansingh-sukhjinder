import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { Shipment } from '../../models/sitestudy/shipment.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';


@Injectable()
export class ShipmentService {

  private readonly _baseApiURL: string = "api/Shipment/";
  private readonly _getURL: string = this._baseApiURL + "Get";
  private readonly _getAllURL: string = this._baseApiURL + "GetAll";
  private readonly _saveURL: string = this._baseApiURL + "Save";
  private readonly _deleteURL: string = this._baseApiURL + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<Shipment>(url);
  }

  getAll(sponsorSiteStudyCdaInvitationId) {
    const url = this._getAllURL + "?sponsorSiteStudyCdaInvitationId=" + sponsorSiteStudyCdaInvitationId;
    return this.endpoint.get<any[]>(url);
  }

  save(shipment: Shipment) {
    if (shipment.id <= 0 || shipment.id == null || shipment.id == undefined) {
      shipment.createdBy = this.authService.currentUser.id;
      shipment.createdOn = this.momentDatePipe.currentDate;
    }
    shipment.updatedBy = this.authService.currentUser.id;
    shipment.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<Shipment>(shipment, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

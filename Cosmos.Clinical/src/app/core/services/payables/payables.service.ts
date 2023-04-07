import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { Payables, PayablesSearchModel } from '../../models/payables/payables.model'

@Injectable()
export class PayablesService {
    private readonly _getURL: string = "api/Payables/GetPayableInfoById";
    private readonly _updatePayableStatusURL: string = "api/Payables/updatePayableStatus";
    private readonly _getAllURL: string = "api/Payables/GetAllPayableInfo";
    private readonly _saveURL: string = "api/Payables/SavePayableInfo";
    private readonly _deleteURL: string = "api/Payables/DeletePayableInfo";
    private readonly _searchPayablesByFilterURL: string = "api/Payables/searchPayablesByFilter";

    constructor(private endpoint: EndPointService, private authService: AuthService) {

    }

    get(id) {
        const url = this._getURL + "?id=" + id;
        return this.endpoint.get<Payables>(url);
    } 
    
    updatePayableStatus(id,status) {
        const url = this._updatePayableStatusURL + "?id=" + id+"&status="+status;
        return this.endpoint.get<boolean>(url);
    }

    getAll(status: boolean) {
        return this.endpoint.get<Payables[]>(this._getAllURL + status);
    }

    searchPayablesByFilter(model: PayablesSearchModel) {
        var vendorId = model.vendorId,
            referenceNumber = model.referenceNumber,
            paymentStatus = model.paymentStatus,
            serviceFromDate = model.serviceFromDate,
            serviceToDate = model.serviceToDate,
            sponsorSiteStudyCDAInvitationId = model.sponsorSiteStudyCDAInvitationId;

        return this.endpoint.get<Payables[]>(this._searchPayablesByFilterURL
            + '?vendorId=' + vendorId +
            '&sponsorSiteStudyCDAInvitationId=' + sponsorSiteStudyCDAInvitationId +
            '&paymentStatus=' + paymentStatus +
            '&serviceFromDate=' + serviceFromDate +
            '&serviceToDate=' + serviceToDate +
            '&referenceNumber=' + referenceNumber
        );
    }

    save(Payables: Payables) {
        if (Payables.id <= 0)
            Payables.createdBy = this.authService.currentUser.id;
        Payables.updatedBy = this.authService.currentUser.id;
        return this.endpoint.addupdate<Payables>(Payables, this._saveURL);
    }

    delete(id: number) {
        const url = this._deleteURL + "?id=" + id;
        return this.endpoint.get<boolean>(url);
    }

}

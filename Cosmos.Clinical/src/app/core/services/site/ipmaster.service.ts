import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { IPMaster } from '../../models/site/ipmaster.model';
import { IPMasterViewModel } from '../../models/viewmodels/IP/ipmaster.viewmodel';

@Injectable()
export class IPMasterService {
  private readonly _getURL: string = "api/IP/Get";
  private readonly _getAllURL: string = "api/IP/GetAll";
  private readonly _getIPMasterListURL: string = "api/IP/GetIPMasterList";
  private readonly _saveURL: string = "api/IP/Save";
  private readonly _updateIPMasterListURL: string = "api/IP/UpdateIPMasterList";
  private readonly _deleteURL: string = "api/IP/Delete";
  private readonly _getIPMasterHistoryURL: string = "api/IP/GetIPMasterHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<IPMaster>(url);
  }

  getAll() {
    return this.endpoint.get<IPMaster[]>(this._getAllURL);
  }

  getIPMasterList(sponsorSiteStudyCDAInvitationId: number) {
    return this.endpoint.get<IPMasterViewModel[]>(this._getIPMasterListURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  save(ipMaster: IPMaster) {
    if (ipMaster.id <= 0 || ipMaster.id == null || ipMaster.id == undefined)
      ipMaster.createdBy = this.authService.currentUser.id;
    ipMaster.updatedBy = this.authService.currentUser.id;
    ipMaster.recievedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<IPMaster>(ipMaster, this._saveURL);
  }

  saveIPMasters(ipMasters: IPMaster[]) {
    ipMasters.forEach(ipMaster => {
      if (ipMaster.id <= 0 || ipMaster.id == null || ipMaster.id == undefined)
        ipMaster.createdBy = this.authService.currentUser.id;
      ipMaster.updatedBy = this.authService.currentUser.id;
      ipMaster.recievedBy = this.authService.currentUser.id;
    })
    return this.endpoint.addupdate<IPMaster[]>(ipMasters, this._updateIPMasterListURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getIPMasterHistory(ipMasterId, componentId) {
    return this.endpoint.get<IPMasterViewModel[]>(this._getIPMasterHistoryURL + "?ipMasterId=" + ipMasterId + "&componentId=" + componentId);
  }
}

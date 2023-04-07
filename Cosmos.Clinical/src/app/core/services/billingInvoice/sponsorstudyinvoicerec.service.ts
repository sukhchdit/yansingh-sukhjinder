import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { SponsorStudyInvoiceRecipient } from '../../models/billinginvoice/sponsorStudyInvoiceRecipient.modal'

@Injectable()
export class sponsorStudyInvoiceRecService {
    private readonly _getURL: string = "api/SponsorStudyInvoiceRecipient/GetSponsorStudyInvoiceRecipient";
    private readonly _getAllURL: string = "api/SponsorStudyInvoiceRecipient/GetAllSponsorStudyInvoiceRecipient";
    private readonly _saveURL: string = "api/SponsorStudyInvoiceRecipient/CreateSponsorStudyInvoiceRecipient";
    private readonly _deleteURL: string = "api/SponsorStudyInvoiceRecipient/DeleteSponsorStudyInvoiceRecipient";
  
  constructor(private endpoint: EndPointService, private authService: AuthService) {
  }
  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyInvoiceRecipient>(url);
  }

  getAll(sponsorStudyInfoId) {
    return this.endpoint.get<SponsorStudyInvoiceRecipient[]>(this._getAllURL+"?sponsorStudyInfoId="+sponsorStudyInfoId);
  }

  save(SponsorStudyInvoiceRecipient: SponsorStudyInvoiceRecipient) {
    if (SponsorStudyInvoiceRecipient.id <= 0)
    SponsorStudyInvoiceRecipient.createdBy = this.authService.currentUser.id;
    SponsorStudyInvoiceRecipient.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<SponsorStudyInvoiceRecipient>(SponsorStudyInvoiceRecipient, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}
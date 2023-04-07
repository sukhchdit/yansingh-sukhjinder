import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { SponsorStudyInvoiceRecipient } from '../../models/billinginvoice/sponsorStudyInvoiceRecipient.modal'
import { invoiceGridSearchViewModel, invoiceMaster } from 'src/app/models/billinginvoice/invoiceMaster.model';

@Injectable()
export class InvoiceGridService {
    private readonly _getURL: string = "api/SiteStudyInvoiceGrid/GetAllInvoicesByFilters";
    private readonly _getAllURL: string = "api/SponsorStudyInvoiceRecipient/GetAllSponsorStudyInvoiceRecipient";
  
  constructor(private endpoint: EndPointService, private authService: AuthService) {
  }
  getAllInvoicesByFilters(InvoiceGridSearchViewModel:invoiceGridSearchViewModel) {
    var SponsorSiteStudyCDAInvitationId= InvoiceGridSearchViewModel.SponsorSiteStudyCDAInvitationId;
    var InvoiceStatus=InvoiceGridSearchViewModel.InvoiceStatus;
    var EmailStatus=InvoiceGridSearchViewModel.EmailStatus;
    var InvoiceNumber= InvoiceGridSearchViewModel.InvoiceNumber;
    var ReferenceNumber=InvoiceGridSearchViewModel.ReferenceNumber;
    var toDate=InvoiceGridSearchViewModel.toDate;
    var fromDate=InvoiceGridSearchViewModel.toDate;
    const url = this._getURL +
    "?SponsorSiteStudyCDAInvitationId=" + SponsorSiteStudyCDAInvitationId+
    "&InvoiceStatus="+InvoiceStatus+
    "&EmailStatus="+EmailStatus+
    "&InvoiceNumber="+InvoiceNumber+
    "&ReferenceNumber="+ReferenceNumber+
    "&toDate="+toDate+
    "&fromDate="+fromDate;
    return this.endpoint.get<invoiceMaster[]>(url);
  }
}
import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { invoiceMaster } from '../../models/billinginvoice/invoiceMaster.model'
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { invoicePostPayment } from 'src/app/models/billinginvoice/invoicePostPayment.model';
import { managePostPaymentSearchViewmodel } from 'src/app/models/billinginvoice/ManagePostPaymentSearchViewModel.model';
import { invoiceDetail } from 'src/app/models/billinginvoice/invoiceDetail.model';

@Injectable()
export class invoicePostPaymentService {
  port = environment.apiport;
  private readonly _getAllInvoicesBySponsorSiteCDAInvitationIdURL: string = "api/InvoicePostPayment/getAllInvoicesBySponsorSiteCDAInvitationId";
  private readonly _getAllPaymentsBySponsorSiteCDAInvitationIdURL: string = "api/InvoicePostPayment/getAllPaymentsBySponsorSiteCDAInvitationIdURL";
  private readonly _getAllInvoicesByFiltersURL: string = "api/InvoicePostPayment/getAllInvoicesByFilters";
  private readonly _getAllInvoicesItemsByInvoiceIdURL: string = "api/InvoicePostPayment/getAllInvoicesItemsByInvoiceId";
  private readonly _saveURL: string = "api/InvoicePostPayment/SavePostPayment";
  // private readonly _getUpcomingInvoiceNumberURL: string = "api/InvoicePostPayment/GetUpcomingInvoiceNumber";


  constructor(private endpoint: EndPointService, private authService: AuthService, public httpClient: HttpClient) {
  }

  getAllInvoicesBySponsorSiteCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<any>(this._getAllInvoicesBySponsorSiteCDAInvitationIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  getAllPaymentsBySponsorSiteCDAInvitationId(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<invoicePostPayment[]>(this._getAllPaymentsBySponsorSiteCDAInvitationIdURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }

  getAllInvoicesByFilters(model: managePostPaymentSearchViewmodel) {
    return this.endpoint.get<invoiceMaster[]>(this._getAllInvoicesByFiltersURL + "?sponsorSiteStudyCDAInvitationId=" + model.SponsorSiteCDAInvitationId + "&toDate=" + model.toDate + "&fromDate=" + model.fromDate + "&invoiceStatus=" + model.invoiceStatus);
  } 

  getAllInvoicesItemsByInvoiceId(invoiceID) {
    return this.endpoint.get<invoiceDetail[]>(this._getAllInvoicesItemsByInvoiceIdURL + "?invoiceId=" + invoiceID );
  }
  // getUpcomingInvoiceNumber(sponsorSiteStudyCDAInvitationId) {
  //     return this.endpoint.get<any>(this._getUpcomingInvoiceNumberURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  //   }
  // savePayment(formData: object) {
  //   // if (invoiceMaster.id <= 0)
  //   const url = this.port + this._saveURL;
  //   // invoiceMaster.createdBy = this.authService.currentUser.id;
  //   // invoiceMaster.updatedBy = this.authService.currentUser.id;
  //   // return this.endpoint.addupdate<invoiceMaster>(invoiceMaster, this._saveURL);
  //   return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  // }
  savePayment(postPayment: invoicePostPayment) {
    if (postPayment.id <= 0)
      postPayment.createdBy = this.authService.currentUser.id;
    postPayment.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<invoicePostPayment>(postPayment, this._saveURL);
  }
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken
    });
  }
}

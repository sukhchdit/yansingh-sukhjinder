import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { invoiceMaster } from '../../models/billinginvoice/invoiceMaster.model'
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BillingInvoiceService {
  port = environment.apiport;
    private readonly _getVisitTrackingInJsonURL: string = "api/SiteStudyBillingInvoice/GetVisitTrackingInJson";
    private readonly _saveURL: string = "api/SiteStudyBillingInvoice/SaveInvoice";
    private readonly _getUpcomingInvoiceNumberURL: string = "api/SiteStudyBillingInvoice/GetUpcomingInvoiceNumber";


  constructor(private endpoint: EndPointService, private authService: AuthService, public httpClient: HttpClient) {
  }

  getVisitTrackingInJson(sponsorSiteStudyCDAInvitationId,toDate, fromDate) {
    return this.endpoint.get<any>(this._getVisitTrackingInJsonURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId+"&toDate="+toDate+"&fromDate="+fromDate);
  }

getUpcomingInvoiceNumber(sponsorSiteStudyCDAInvitationId) {
    return this.endpoint.get<any>(this._getUpcomingInvoiceNumberURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId);
  }
  saveInvoice(formData: object) {
    // if (invoiceMaster.id <= 0)
    const url = this.port + this._saveURL;
    // invoiceMaster.createdBy = this.authService.currentUser.id;
    // invoiceMaster.updatedBy = this.authService.currentUser.id;
    // return this.endpoint.addupdate<invoiceMaster>(invoiceMaster, this._saveURL);
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  }
  
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken
    });
  }
}

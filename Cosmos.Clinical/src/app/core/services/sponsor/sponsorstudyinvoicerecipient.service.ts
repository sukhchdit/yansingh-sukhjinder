import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../account/auth.service';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { SponsorStudyInvoiceRecipient } from '../../models/sponsor/sponsorstudyinvoicerecipient.model';

@Injectable()
export class SponsorStudyInvoiceRecipientService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/SponsorStudyInvoiceRecipient";
  private readonly _getURL: string = this._baseApiUrl + "/Get";
  private readonly _getAllURL: string = this._baseApiUrl + "/GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "/Save";


  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) { }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyInvoiceRecipient>(url);
  }

  getAll(sponsorStudyInfoId) {
    return this.endpoint.get<SponsorStudyInvoiceRecipient[]>(this._getAllURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  save(sponsor: SponsorStudyInvoiceRecipient) {
    if (sponsor.id <= 0 || sponsor.id == undefined) {
      sponsor.createdBy = this.authService.currentUser.id;
      sponsor.createdOn = this.momentDatePipe.currentDate;
    }
    sponsor.updatedBy = this.authService.currentUser.id;
    sponsor.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<SponsorStudyInvoiceRecipient>(sponsor, this._saveURL);
  }
}

import { Injectable } from '@angular/core';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { AuthService } from '../account/auth.service';
import { EndPointService } from '../endpoint.service';


@Injectable()
export class SignRequestService {
  private readonly _baseApiUrl: string = "api/SignRequest/";

  private readonly _documentSendSuccessURL: string = this._baseApiUrl + "DocumentSendSuccess";
  private readonly _documentSignSuccessURL: string = this._baseApiUrl + "DocumentSignSuccess";
  private readonly _documentSignDeclineURL: string = this._baseApiUrl + "DocumentSignDecline";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  documentSendSuccess(folderId, event_status) {
    var dateNow = this.momentDatePipe.currentDate;
    var updatedBy = this.authService.currentUser.organizationContactId;
    var model = { folderId: folderId, event_status: event_status, updatedBy: updatedBy, updatedOn: dateNow };
    //var url = this._documentSendSuccessURL + "?folderId=" + folderId + "&event_status=" + event_status + "&updatedBy=" + updatedBy + "&updatedOn=" + dateNow;
    return this.endpoint.addupdate<boolean>(model, this._documentSendSuccessURL);
  }

  documentSignSuccess(folderId, event_status) {
    var dateNow = this.momentDatePipe.currentDate;
    var updatedBy = this.authService.currentUser.organizationContactId;
    var model = { folderId: folderId, event_status: event_status, updatedBy: updatedBy, updatedOn: dateNow };
    //var url = this._documentSignSuccessURL + "?folderId=" + folderId + "&event_status=" + event_status + "&updatedBy=" + updatedBy + "&updatedOn=" + dateNow;
    return this.endpoint.addupdate<boolean>(model, this._documentSignSuccessURL);
  }

  documentSignDecline(folderId, event_status) {
    var url = this._documentSignDeclineURL + "?folderId=" + folderId + "&event_status=" + event_status;
    return this.endpoint.get<boolean>(url);
  }

}

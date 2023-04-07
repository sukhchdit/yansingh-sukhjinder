import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { smsprogressnotesviewmodel } from '../../models/viewmodels/notificationservices/smsprogressnotesviewmodel.model';
import { SmsNotification } from '../../models/notificationservices/smsnotification.model';

@Injectable()
export class NotificationService {
  port = environment.apiport;
  private readonly _gettSmsProgressNotesURL: string = "api/Notification/GetSmsProgressNotes";
  private readonly _sendSMSURL: string = "api/Notification/SendSMS";
  private readonly _updateSmsInboundStatusURL: string = "api/Notification/UpdateSmsInboundStatus";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  getSmsProgressNotes(studySubjectId, sponsorsitestudycdainvitationid) {
    const url = this._gettSmsProgressNotesURL + "?subjectId=" + studySubjectId + "&sponsorsitestudycdainvitationid=" + sponsorsitestudycdainvitationid;
    return this.endpoint.get<smsprogressnotesviewmodel[]>(url);
  }

  sendSMS(smsNotification: SmsNotification) {
    if (smsNotification.id <= 0 || smsNotification.id == null || smsNotification.id == undefined) {
      smsNotification.createdBy = this.authService.currentUser.id;
    }
    smsNotification.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(smsNotification, this._sendSMSURL);
  }
  updateSMSInboundStatus(id: number) {
    const url = this._updateSmsInboundStatusURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

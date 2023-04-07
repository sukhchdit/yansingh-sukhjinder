import { Component } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
export interface eConsentResportResponse {
  resignstatusBySubject?: Array<object>,
  signedByLanguage?: Array<object>,
  signedBySubjectNumber?: Array<object>,
  signedBySubjectStatus?: Array<object>,
  signedCountByVersion?: Array<object>,
}
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  cdaInvitationID: number;
  resignstatusBySubject: any;
  signedByLanguage: any;
  signedBySubjectNumber: any;
  signedBySubjectStatus: any;
  signedCountByVersion: any;
  constructor(public eConsentService: EconsentService, public authService: AuthService) { }

  ngOnInit(): void {
    this.cdaInvitationID = this.authService.sponsorSiteStudyCdaInvitationId;
    this.getEConsentReports();
  }

  getEConsentReports() {
    this.eConsentService.getEConsentReport(this.cdaInvitationID).subscribe((res: eConsentResportResponse)=>{
      console.log(res);
      this.resignstatusBySubject =  res.resignstatusBySubject;
      this.signedByLanguage = res.signedByLanguage;
      this.signedBySubjectNumber = res.signedBySubjectNumber;
      this.signedBySubjectStatus =  res.signedBySubjectStatus;
      this.signedCountByVersion = res.signedCountByVersion;
    })
  }
}

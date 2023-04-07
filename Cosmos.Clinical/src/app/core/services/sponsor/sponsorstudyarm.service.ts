import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../account/auth.service';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { SponsorStudyArm } from '../../models/sponsor/sponsorstudyarm.model';

@Injectable()
export class SponsorStudyArmService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/SponsorStudyArm";
  private readonly _getURL: string = this._baseApiUrl + "/Get";
  private readonly _getAllURL: string = this._baseApiUrl + "/GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "/Save";
  private readonly _deleteURL: string = this._baseApiUrl + "/Delete";
  private readonly _checkIfExistsURL: string = this._baseApiUrl + "/CheckIfExists";


  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) { }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SponsorStudyArm>(url);
  }

  getAll(sponsorStudyInfoId) {
    return this.endpoint.get<SponsorStudyArm[]>(this._getAllURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  save(sponsor: SponsorStudyArm) {
    if (sponsor.id <= 0 || sponsor.id == undefined) {
      sponsor.createdBy = this.authService.currentUser.id;
      sponsor.createdOn = this.momentDatePipe.currentDate;
    }
    sponsor.updatedBy = this.authService.currentUser.id;
    sponsor.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<SponsorStudyArm>(sponsor, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  checkIfExists(title, sponsorStudyInfoId) {
    const url = this._checkIfExistsURL + "?title=" + title + "&sponsorStudyInfoId=" + sponsorStudyInfoId;
    return this.endpoint.get<boolean>(url);
  }
}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { SiteStudyBudgetPaymentDetail } from '../../models/studybudget/sitestudybudgetpaymentdetail.model';

@Injectable()
export class SiteStudyBudgetPaymentDetailService {
  private readonly _baseApiUrl: string = "api/SiteStudyBudgetPaymentDetail";
  private readonly _getURL: string = this._baseApiUrl + "/Get";
  private readonly _getBySiteStudyProcedureBudgetVersionIdURL: string = this._baseApiUrl + "/GetBySiteStudyProcedureBudgetVersionId";
  private readonly _saveURL: string = this._baseApiUrl + "/Save";
  private readonly _deleteURL: string = this._baseApiUrl + "/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<SiteStudyBudgetPaymentDetail>(url);
  }

  getBySiteStudyProcedureBudgetVersionId(siteStudyProcedureBudgetVersionId) {
    const url = this._getBySiteStudyProcedureBudgetVersionIdURL + "?siteStudyProcedureBudgetVersionId=" + siteStudyProcedureBudgetVersionId;
    return this.endpoint.get<SiteStudyBudgetPaymentDetail>(url);
  }

  save(siteStudyBudgetPaymentDetail: SiteStudyBudgetPaymentDetail) {    
    if (siteStudyBudgetPaymentDetail.id <= 0 || siteStudyBudgetPaymentDetail.id == null || siteStudyBudgetPaymentDetail.id == undefined) {
      siteStudyBudgetPaymentDetail.createdBy = this.authService.currentUser.id;
      siteStudyBudgetPaymentDetail.createdOn = this.momentDatePipe.currentDate;
      }
    siteStudyBudgetPaymentDetail.updatedBy = this.authService.currentUser.id;
    siteStudyBudgetPaymentDetail.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<SiteStudyBudgetPaymentDetail>(siteStudyBudgetPaymentDetail, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SiteAdditionalStudyChargesBudget } from '../../models/studybudget/siteadditionalstudychargesbudget.model';
import { SelectAdverseEventViewModel } from '../../models/viewmodels/esource/selectadverseevent.viewmodel';
import { LocalStoreManager } from '../account/local-store-manager.service';

@Injectable()
export class StateService {

  private readonly _selectAdverseEventKey: string = 'selectAdverseEvent';
  private readonly _siteAdditionChargesKey: string = 'siteAdditionCharges';

  constructor(private localStorage: LocalStoreManager, private router: Router) { }

  set selectAdverseEventViewModel(val: SelectAdverseEventViewModel) {
    this.localStorage.saveSessionData(val, this._selectAdverseEventKey);
  }

  get selectAdverseEventViewModel(): SelectAdverseEventViewModel {
    let data = this.localStorage.getData(this._selectAdverseEventKey);
    return data;
  }

  set siteAddtionalCharges(val: SiteAdditionalStudyChargesBudget[]) {
    this.localStorage.saveSessionData(val, this._siteAdditionChargesKey);
  }

  get siteAddtionalCharges(): SiteAdditionalStudyChargesBudget[] {
    let data = this.localStorage.getData(this._siteAdditionChargesKey);
    return data;
  }

  public RemoveSiteAddtionalCharges() {
    this.localStorage.deleteData(this._siteAdditionChargesKey);
  }

  public setLocalKey(key: string, val: any) {
    this.localStorage.saveSessionData(val, key);
  }

  public getLocalKey(key: string) {
    let data = this.localStorage.getData(key);
    return data;
  }

  public removeLocalKey(key: string) {
    this.localStorage.deleteData(key);
  }

  public setPreviousUrl() {
    this.localStorage.saveSessionData(this.router.url, 'previousUrl');
  }

  public getPreviousUrl() {
    let data = this.localStorage.getData('previousUrl');
    return data;
  }
}

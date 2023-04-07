import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EndPointService } from '../endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormsService {

  public readonly _saveAllSectionsDynamicFormsURL: string = "api/StudyQuesTemplate/AddQuesTemplate/";
  public readonly _getAllSectionsDynamicFormsListURL: string = "api/StudyQuesTemplate/";
  public readonly _getsitesfqURL: string = "api/SSUSiteWorkflow/GetSiteSFQ/";
  public readonly _saveSiteSfqURL: string = "api/SSUSFQSiteResponse/SaveSiteResponse/";
  selectedSectionField: Subject<any> = new Subject<any>();
  constructor(public endpoint: EndPointService) { }

  saveAllSectionsDynamicForms(studyId, allSectionPayload) {
    const url = this._saveAllSectionsDynamicFormsURL + studyId;
    return this.endpoint.addupdate(allSectionPayload, url);
  }

  getAllSectionDynamicFormsList(studyId) {
    const url = this._getAllSectionsDynamicFormsListURL + studyId;
    return this.endpoint.get(url);
  }

  saveSiteSFQ(sfq_id, formData) {
    const url = this._saveSiteSfqURL + sfq_id;
    return this.endpoint.addupdate(formData, url);
  }
}

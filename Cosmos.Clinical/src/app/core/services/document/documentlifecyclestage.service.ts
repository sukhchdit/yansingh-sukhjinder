import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { DocumentLifeCycleStage } from '../../models/document/documentlifecyclestage.model';

@Injectable()
export class DocumentLifeCycleStageService {
  port = environment.apiport;
  private readonly _getDocumentLifeCycleStageURL: string = "api/DocumentLifeCycleStage/Get";
  private readonly _deleteDocumentLifeCycleStageURL: string = "api/DocumentLifeCycleStage/Delete";
  private readonly _getAllDocumentLifeCycleStageURL: string = "api/DocumentLifeCycleStage/GetAll";
  private readonly _saveDocumentLifeCycleStageURL: string = "api/DocumentLifeCycleStage/Save";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  getDocumentLifeCycleStageById(id) {
    const url = this._getDocumentLifeCycleStageURL + "?id=" + id;
    return this.endpoint.get<DocumentLifeCycleStage>(url);
  }

  getAllDocumentLifeCycleStages() {
    const url = this._getAllDocumentLifeCycleStageURL;// + "?id=" + id;
    return this.endpoint.get<DocumentLifeCycleStage[]>(url);
  }

  save(document: DocumentLifeCycleStage) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
    }
    document.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<DocumentLifeCycleStage>(document, this._saveDocumentLifeCycleStageURL);
  }

  delete(id) {
    const url = this._deleteDocumentLifeCycleStageURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }
}

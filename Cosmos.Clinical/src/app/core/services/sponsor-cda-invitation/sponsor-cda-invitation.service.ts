import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorCdaInvitationService {

  private readonly _saveCDADocumentURL: string = "api/SSUWorkflow/SaveCDADocument/";
  private readonly _getCDADocumentURL: string = "api/SSUWorkflow/GetCDADocument/";
  constructor(private endpoint: EndPointService) { }

  saveCDADocument(id, formData) {
    const url = this._saveCDADocumentURL + id;
    return this.endpoint.addupdate(formData, url);
  }

  loadCDADocument(id) {
    const url = this._getCDADocumentURL + id;
    return this.endpoint.get(url);
  }
}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { DocumentOrganization } from '../../models/document/documentorganization.model';


@Injectable()
export class DocumentOrganizationService {
  port = environment.apiport;
  private readonly _getDocumentOrganizationURL: string = "api/DocumentOrganization/Get";
  private readonly _deleteDocumentOrganizationURL: string = "api/DocumentOrganization/Delete";
  private readonly _getAllDocumentOrganizationURL: string = "api/DocumentOrganization/GetAll";
  private readonly _saveDocumentOrganizationURL: string = "api/DocumentOrganization/Save";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  getDocumentOrganizationById(id) {
    const url = this._getDocumentOrganizationURL + "?id=" + id;
    return this.endpoint.get<DocumentOrganization>(url);
  }

  getAllDocumentOrganization() {
    const url = this._getAllDocumentOrganizationURL;// + "?id=" + id;
    return this.endpoint.get<DocumentOrganization[]>(url);
  }

  save(document: DocumentOrganization) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
    }
    document.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<DocumentOrganization>(document, this._saveDocumentOrganizationURL);
  }

  delete(id) {
    const url = this._deleteDocumentOrganizationURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }
}

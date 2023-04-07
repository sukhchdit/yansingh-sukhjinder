import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { DocumentCategory } from '../../models/document/documentcategory.model';

@Injectable()
export class DocumentCategoryService {
  port = environment.apiport;
  private readonly _getDocumentCategoryURL: string = "api/DocumentCategory/Get";
  private readonly _deleteDocumentCategoryURL: string = "api/DocumentCategory/Delete";
  private readonly _getDocumentTypePermissionsURL: string = "api/DocumentCategory/GetDocumentTypePermissions";
  private readonly _getAllDocumentCategoryURL: string = "api/DocumentCategory/GetAll";
  private readonly _getAllByOrganizationTypeURL: string = "api/DocumentCategory/GetAllByOrganizationType";
  private readonly _getAllDocumentCategoryWithTypeURL: string = "api/DocumentCategory/GetAllCategoryWithDocumentType";
  private readonly _createDocumentCategoryURL: string = "api/DocumentCategory/Save";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  getDocumentCategoryById(id) {
    const url = this._getDocumentCategoryURL + "?id=" + id;
    return this.endpoint.get<DocumentCategory>(url);
  }

  getAllDocumentCategories() {
    const url = this._getAllDocumentCategoryURL;// + "?id=" + id;
    return this.endpoint.get<DocumentCategory[]>(url);
  }

  getAllDocumentCategoriesByOrganizationType(organizationType) {
    const url = this._getAllByOrganizationTypeURL + "?organizationType=" + organizationType;
    return this.endpoint.get<DocumentCategory[]>(url);
  }

  getAllDocumentCategoriesWithDocumentType(organizationContactId, subcategory) {
    const url = this._getAllDocumentCategoryWithTypeURL + "?organizationContactId=" + organizationContactId + "&subcategory=" + subcategory;
    return this.endpoint.get<any[]>(url);
  }

  GetDocumentTypePermissions(organizationContactId, documentTypeId) {
    const url = this._getDocumentTypePermissionsURL + "?organizationContactId=" + organizationContactId + "&documentTypeId=" + documentTypeId;
    return this.endpoint.get<any>(url);
  }

  save(document: DocumentCategory) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
    }
    document.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<DocumentCategory>(document, this._createDocumentCategoryURL);
  }

  delete(id) {
    const url = this._deleteDocumentCategoryURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }
}

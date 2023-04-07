import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { DocumentType } from '../../models/document/documenttype.model';
import { DocumentCategoryAndTypeViewModel } from '../../models/viewmodels/document/documentcategoryandtype.model';

@Injectable()
export class DocumentTypeService {
  port = environment.apiport;
  private readonly _getDocumentTypeURL: string = "api/DocumentType/Get";
  private readonly _deleteDocumentTypeURL: string = "api/DocumentType/Delete";
  private readonly _getAllDocumentTypeURL: string = "api/DocumentType/GetAll";
  private readonly _getAllByCategoryIdURL: string = "api/DocumentType/GetAllByCategoryId";
  private readonly _getDocumentTypeByNameURL: string = "api/DocumentType/GetDocumentTypeByName";
  private readonly _getAllDocumentTypeByCategoryIdURL: string = "api/DocumentType/DocumentTypeByCategoryId";
  private readonly _getDocumentTypesByOrganizationTypeURL: string = "api/DocumentType/GetDocumentTypesByOrganizationType";
  private readonly _saveDocumentTypeURL: string = "api/DocumentType/Save";
  private readonly _getDocumentCategoryAndTypeURL: string = "api/DocumentType/GetDocumentCategoryAndType";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  getDocumentTypeById(id) {
    const url = this._getDocumentTypeURL + "?id=" + id;
    return this.endpoint.get<DocumentType>(url);
  }

  getAllDocumentTypes() {
    const url = this._getAllDocumentTypeURL;
    return this.endpoint.get<DocumentType[]>(url);
  }

  getAllByCategoryId(documentCategoryId) {
    const url = this._getAllByCategoryIdURL + "?documentCategoryId=" + documentCategoryId;
    return this.endpoint.get<DocumentType[]>(url);
  }

  getDocumentTypeByName(documentTypeName:string) {
    const url = this._getDocumentTypeByNameURL + '?documentTypeName=' + documentTypeName;
    return this.endpoint.get<DocumentType>(url);
  }

  getAllDocumentTypesByCategory(documentCategoryId) {
    const url = this._getAllDocumentTypeByCategoryIdURL + "?documentCategoryId=" + documentCategoryId;
    return this.endpoint.get<DocumentType[]>(url);
  }

  getDocumentTypesByOrganizationType(organizationType) {
    const url = this._getDocumentTypesByOrganizationTypeURL + "?organizationType=" + organizationType;
    return this.endpoint.get<DocumentType[]>(url);
  }

  save(document: DocumentType) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
    }
    document.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<DocumentType>(document, this._saveDocumentTypeURL);
  }

  delete(id) {
    const url = this._deleteDocumentTypeURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

  getDocumentCategoryAndType() {
    const url = this._getDocumentCategoryAndTypeURL;
    return this.endpoint.get<DocumentCategoryAndTypeViewModel>(url);
  }
}

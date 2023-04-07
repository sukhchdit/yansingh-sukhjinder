import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { DocumentTypeRoleModel } from '../../models/common/documenttyperole.model';
import { DocumentTypeRoleViewModel } from '../../models/viewmodels/document/documenttyperoleviewmodel.model';

@Injectable()
export class DocumentTypeRoleService {
  private readonly _getURL: string = "api/DocumentTypeRole/Get";
  private readonly _getAllURL: string = "api/DocumentTypeRole/GetAll";
  private readonly _getAllByDocumentTypeIdURL: string = "api/DocumentTypeRole/GetAllByDocumentTypeId";
  private readonly _saveURL: string = "api/DocumentTypeRole/Save";
  private readonly _deleteURL: string = "api/DocumentTypeRole/Delete";
  private readonly _getByDocumentTypeAndRoleIdURL: string = "api/DocumentTypeRole/GetByDocumentTypeAndRoleId";
  private readonly _getByDocumentCategoryIdURL: string = "api/DocumentTypeRole/GetByDocumentCategoryId";
  private readonly _getListOfDocumentTypeRolesURL: string = "api/DocumentTypeRole/GetListOfDocumentTypeRoles";
  private readonly _getDocumentTypeRolesByRoleIdURL: string = "api/DocumentTypeRole/GetDocumentTypeRolesByRoleId";
  private readonly _saveInEditModeURL: string = "api/DocumentTypeRole/SaveInEditMode";
 //SaveInEditMode

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<DocumentTypeRoleModel>(url);
  }

  getListOfDocumentTypeRoles(documentTypeId, categoryId, organizationType) {
    const url = this._getListOfDocumentTypeRolesURL + "?documentTypeId=" + documentTypeId + "&categoryId=" + categoryId + "&organizationType=" + organizationType;
    return this.endpoint.get<any[]>(url);
  }

  getAll(organizationType) {
    const url = this._getAllURL + "?organizationType=" + organizationType;
    return this.endpoint.get<any[]>(url);
  }

  getAllTypeRoleByCategoryId(categoryId, organizationType) {
    const url = this._getByDocumentCategoryIdURL + "?categoryId=" + categoryId + "&organizationType=" + organizationType;
    return this.endpoint.get<DocumentTypeRoleModel[]>(url);
  }

  getAllDocumentTypeRoleByRoleId(roleId, documentCategoryId, documentTypeId) {
    const url = this._getDocumentTypeRolesByRoleIdURL + "?roleId=" + roleId + "&documentCategoryId=" + documentCategoryId + "&documentTypeId=" + documentTypeId;
    return this.endpoint.get<DocumentTypeRoleViewModel[]>(url);
  }

  getAllByDocumentTypeId(documentTypeId, organizationType) {
    const url = this._getAllByDocumentTypeIdURL + "?documentTypeId=" + documentTypeId + "&organizationType=" + organizationType;
    return this.endpoint.get<DocumentTypeRoleModel[]>(url);
  }

  getByDocumentTypeAndRole(documentTypeId, roleId) {
    const url = this._getByDocumentTypeAndRoleIdURL + "?documentTypeId=" + documentTypeId + "&roleId=" + roleId;
    return this.endpoint.get<DocumentTypeRoleModel>(url);
  }

  save(role: any) {
    return this.endpoint.addupdate<any>(role, this._saveURL);
  }

  saveInEditMode(role: any) {
    return this.endpoint.addupdate<any>(role, this._saveInEditModeURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

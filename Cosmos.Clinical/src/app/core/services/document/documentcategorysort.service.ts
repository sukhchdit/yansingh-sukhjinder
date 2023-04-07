import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { DocumentCategorySort } from '../../models/document/documentcategorysort.model';

@Injectable()
export class DocumentCategorySortService {
  port = environment.apiport;
  private readonly _baseApiURL: string = "api/DocumentCategorySort/";
  private readonly _getURL: string = this._baseApiURL + "Get";
  private readonly _deleteURL: string = this._baseApiURL + "Delete";  
  private readonly _getAllURL: string = this._baseApiURL + "GetAll";
  private readonly _getAllBySiteInfoIdURL: string = this._baseApiURL + "GetAllBySiteInfoId";
  private readonly _getAllWithCategoryDataURL: string = this._baseApiURL + "GetAllWithCategoryData";  
  private readonly _saveURL: string = this._baseApiURL + "Save";
  private readonly _updateSortOrderURL: string = this._baseApiURL + "UpdateSortOrder";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<DocumentCategorySort>(url);
  }

  getAll() {
    const url = this._getAllURL;// + "?id=" + id;
    return this.endpoint.get<DocumentCategorySort[]>(url);
  }

  getAllBySiteInfoId(siteInfoId) {
    const url = this._getAllBySiteInfoIdURL + "?siteInfoId=" + siteInfoId;
    return this.endpoint.get<DocumentCategorySort[]>(url);
  }

  getAllWithCategoryData(siteInfoId, userId) {
    const url = this._getAllWithCategoryDataURL + "?siteInfoId=" + siteInfoId + "&userId=" + userId;
    return this.endpoint.get<DocumentCategorySort[]>(url);
  }

  save(document: DocumentCategorySort) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
    }
    document.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<DocumentCategorySort>(document, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  updateSortOrder(id, oldSortOrder, newSortOrder, siteInfoId) {
    const url = this._updateSortOrderURL + "?id=" + id + "&oldSortOrder=" + oldSortOrder + "&newSortOrder=" + newSortOrder + "&siteInfoId=" + siteInfoId;
    return this.endpoint.get<boolean>(url);
  }
}

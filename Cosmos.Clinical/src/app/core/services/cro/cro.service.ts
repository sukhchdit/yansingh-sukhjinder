import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { CroInfo } from 'src/app/models/cro/croinfo.model';
import { EndPointService } from '../endpoint.service';

@Injectable()
export class CroService {
  private readonly _getCroURL: string = "api/CRO/GetCRO";
  private readonly _getCroByOrganizationId: string = "api/CRO/GetCroInfoByOrganizationId";
  private readonly _getAllCroURL: string = "api/CRO/GetAllCro";
  private readonly _saveCroURL: string = "api/CRO/SaveCro";
  private readonly _deleteCroURL: string = "api/CRO/DeleteCro";

  

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getCroURL + "?id=" + id;
    return this.endpoint.get<CroInfo>(url);
  }

  getCroInfoByOrganizationId(organizationId) {
    const url = this._getCroByOrganizationId + "?organizationId=" + organizationId;
    return this.endpoint.get<CroInfo>(url);
  }

  getAll() {
    return this.endpoint.get<CroInfo[]>(this._getAllCroURL);
  }

  save(cro: CroInfo) {
    if (cro.id <= 0 || cro.id == null || cro.id == undefined) {
      cro.organizationInfoId = this.authService.organization.id;
      cro.createdBy = this.authService.organization.id;
    }
    cro.updatedBy = this.authService.organization.id;
    return this.endpoint.addupdate<CroInfo>(cro, this._saveCroURL);
  }

  delete(id) {
    const url = this._deleteCroURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

 
}

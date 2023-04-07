import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { ProcedureCategory } from '../../models/common/procedureCategory.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class ProcedureCategoryService {
  private readonly _getURL: string = "api/ProcedureCategory/Get";
  private readonly _getAllURL: string = "api/ProcedureCategory/GetAll";
  private readonly _getAllByIsNonProcedureURL: string = "api/ProcedureCategory/GetAllByIsNonProcedure";
  private readonly _getAllByIsConditionalURL: string = "api/ProcedureCategory/GetAllByIsConditional";
  private readonly _saveURL: string = "api/ProcedureCategory/Save";
  private readonly _deleteURL: string = "api/ProcedureCategory/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<ProcedureCategory>(url);
  }

  getAll() {
    return this.endpoint.get<ProcedureCategory[]>(this._getAllURL);
  }

  getAllByIsNonProcedure(isNonProcedure) {
    return this.endpoint.get<ProcedureCategory[]>(this._getAllByIsNonProcedureURL + "?isNonProcedure=" + isNonProcedure);
  }

  getAllByIsConditional() {
    return this.endpoint.get<ProcedureCategory[]>(this._getAllByIsConditionalURL);
  }

  save(procedureCategory: ProcedureCategory) {
    if (procedureCategory.id <= 0)
      procedureCategory.createdBy = this.authService.currentUser.id;
    procedureCategory.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<ProcedureCategory>(procedureCategory, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

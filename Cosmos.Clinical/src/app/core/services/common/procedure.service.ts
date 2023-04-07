import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { Procedure } from '../../models/common/procedure.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class ProcedureService {
  private readonly _getURL: string = "api/Procedure/Get";
  private readonly _getAllURL: string = "api/Procedure/GetAll";
  private readonly _getAllProcedureURL: string = "api/Procedure/GetAllProcedure";
  private readonly _getAllNonProcedureURL: string = "api/Procedure/GetAllNonProcedure";
  private readonly _getAllByIsNonProcedureisConditionalURL: string = "api/Procedure/GetAllByIsNonProcedureisConditional";
  private readonly _getAllByCategoryURL: string = "api/Procedure/GetAllByCategory";
  private readonly _saveURL: string = "api/Procedure/Save";
  private readonly _deleteURL: string = "api/Procedure/Delete";
  private readonly _getAllByStudyTemplateIdURL: string = "api/Procedure/GetAllByStudyTemplateId";
  private readonly _getProceduresAndConditionalProceduresByStudyTemplateIdURL: string = "api/Procedure/GetProceduresAndConditionalProceduresByStudyTemplateId";
  private readonly _getAllBySponsorStudyInfoIdURL: string = "api/Procedure/GetAllBySponsorStudyInfoId";
  private readonly _getAllProceduresByVisitTrackingIdURL: string = "api/Procedure/GetAllProceduresByVisitTrackingId";
  private readonly _getStudyVisitTrackingProceduresByVisitTrackingIdURL: string = "api/Procedure/GetStudyVisitTrackingProceduresByVisitTrackingId";
  private readonly _getStudyVisitTemplateProceduresByVisitTrackingIdURL: string = "api/Procedure/GetStudyVisitTemplateProceduresByVisitTrackingId";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<Procedure>(url);
  }

  getAll() {
    return this.endpoint.get<Procedure[]>(this._getAllURL);
  }

  getAllByCategory(procedureCategoryId) {
    return this.endpoint.get<Procedure[]>(this._getAllByCategoryURL + "?procedureCategoryId=" + procedureCategoryId);
  }

  getAllProcedure(procedureCategoryId) {
    return this.endpoint.get<Procedure[]>(this._getAllProcedureURL + "?procedureCategoryId=" + procedureCategoryId);
  }

  getAllNonProcedure(procedureCategoryId) {
    return this.endpoint.get<Procedure[]>(this._getAllNonProcedureURL + "?procedureCategoryId=" + procedureCategoryId);
  }

  getAllByIsNonProcedureisConditional(procedureCategoryId, isNonProcedure, isConditional) {
    return this.endpoint.get<Procedure[]>(this._getAllByIsNonProcedureisConditionalURL + "?procedureCategoryId=" + procedureCategoryId + "&isNonProcedure=" + isNonProcedure + "&isConditional=" + isConditional);
  }

  save(procedure: Procedure) {
    if (procedure.id <= 0)
      procedure.createdBy = this.authService.currentUser.id;
    procedure.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<Procedure>(procedure, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getAllByStudyTemplateId(studyVisitTemplateId, isChild) {
    return this.endpoint.get<Procedure[]>(this._getAllByStudyTemplateIdURL + "?studyVisitTemplateId=" + studyVisitTemplateId + "&isChild=" + isChild);
  }

  getProceduresAndConditionalProceduresByStudyTemplateId(studyVisitTemplateId, isChild) {
    return this.endpoint.get<Procedure[]>(this._getProceduresAndConditionalProceduresByStudyTemplateIdURL + "?studyVisitTemplateId=" + studyVisitTemplateId + "&isChild=" + isChild);
  }

  getAllBySponsorStudyInfoId(sponsorStudyInfoId) {
    return this.endpoint.get<Procedure[]>(this._getAllBySponsorStudyInfoIdURL + "?sponsorStudyInfoId=" + sponsorStudyInfoId);
  }

  getAllProceduresByVisitTrackingId(subjectVisitTrackingId) {
    return this.endpoint.get<Procedure[]>(this._getAllProceduresByVisitTrackingIdURL + "?subjectVisitTrackingId=" + subjectVisitTrackingId);
  }

  getStudyVisitTrackingProceduresByVisitTrackingId(subjectVisitTrackingId) {
    return this.endpoint.get<any[]>(this._getStudyVisitTrackingProceduresByVisitTrackingIdURL + "?subjectVisitTrackingId=" + subjectVisitTrackingId);
  }

  getStudyVisitTemplateProceduresByVisitTrackingId(studyVisitTrackingId) {
    return this.endpoint.get<any[]>(this._getStudyVisitTemplateProceduresByVisitTrackingIdURL + "?studyVisitTrackingId=" + studyVisitTrackingId);
  }
}

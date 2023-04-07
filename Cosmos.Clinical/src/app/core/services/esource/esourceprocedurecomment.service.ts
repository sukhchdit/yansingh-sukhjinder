import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { environment } from '../../../environments/environment';
import { eSourceProcedureComment } from '../../models/esource/esourceprocedurecomment.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';

@Injectable()
export class eSourceProcedureCommentService {
  port = environment.apiport;
  private readonly _baseURL: string = "api/eSourceProcedureComment/";
  private readonly _getURL: string = this._baseURL + "Get";
  private readonly _getAllByStudyVisitTrackingProcedureIdURL: string = this._baseURL + "GetAllByStudyVisitTrackingProcedureId";
  private readonly _getAllByCommentIdURL: string = this._baseURL + "GetAllByCommentId";
  private readonly _saveURL: string = this._baseURL + "Save";
  private readonly _deleteURL: string = this._baseURL + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<eSourceProcedureComment>(url);
  }

  getAllByStudyVisitTrackingProcedureId(studyVisitTrackingProcedureId, userId) {
    const url = this._getAllByStudyVisitTrackingProcedureIdURL + "?studyVisitTrackingProcedureId=" + studyVisitTrackingProcedureId + "&userId=" + userId;
    return this.endpoint.get<eSourceProcedureComment[]>(url);
  }

  getAllByCommentId(commentId) {
    const url = this._getAllByCommentIdURL + "?commentId=" + commentId;
    return this.endpoint.get<eSourceProcedureComment[]>(url);
  }

  save(esourceProcedureComment: eSourceProcedureComment) {
    if (esourceProcedureComment.id <= 0 || esourceProcedureComment.id == null || esourceProcedureComment.id == undefined) {
      esourceProcedureComment.createdBy = this.authService.currentUser.id;
      esourceProcedureComment.createdOn = this.momentDatePipe.currentDate;
    }
    esourceProcedureComment.updatedBy = this.authService.currentUser.id;
    esourceProcedureComment.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<eSourceProcedureComment>(esourceProcedureComment, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

import { Injectable } from '@angular/core';
import { EndPointService } from '../../endpoint.service';
import { AuthService } from '../../account/auth.service';
import { MonitorQuery } from '../../../models/esource/questionnaire/MonitorQuery.model';
import { MomentDatePipe } from '../../../pipes/momentdate.pipe';


@Injectable()
export class MonitorQueryService {
  private readonly _baseApiUrl: string = "api/MonitorQuery/";

  private readonly _getURL: string = this._baseApiUrl + "Gete";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<MonitorQuery>(url);
  }

  getAll(esourceSubjectQuestionnaireId) {
    const url = this._getAllURL + "?esourceSubjectQuestionnaireId=" + esourceSubjectQuestionnaireId;
    return this.endpoint.get<MonitorQuery[]>(url);
  }

  save(query: MonitorQuery) {
    if (query.id <= 0 || query.id == null || query.id == undefined) {
      query.createdBy = this.authService.currentUser.id;
      query.createdOn = this.momentDatePipe.currentDate;
    }
    query.updatedBy = this.authService.currentUser.id;
    query.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<MonitorQuery>(query, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}

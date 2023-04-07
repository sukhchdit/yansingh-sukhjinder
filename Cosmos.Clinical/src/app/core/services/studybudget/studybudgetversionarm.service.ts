import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { StudyBudgetVersionArm } from '../../models/studybudget/studybudgetversionarm.model';

@Injectable()
export class StudyBudgetVersionArmService {
  private readonly _baseApiUrl: string = "api/StudyBudgetVersionArm";
  private readonly _getURL: string = this._baseApiUrl + "/Get";
  private readonly _getAllURL: string = this._baseApiUrl + "/GetAll";
  private readonly _getAllWithBudgetsURL: string = this._baseApiUrl + "/GetAllWithBudgets";
  private readonly _saveURL: string = this._baseApiUrl + "/Save";
  private readonly _deleteURL: string = this._baseApiUrl + "/Delete";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {
  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudyBudgetVersionArm>(url);
  }

  getAll(studyProcedureBudgetVersionId, withArmInfo) {
    const url = this._getAllURL + "?studyProcedureBudgetVersionId=" + studyProcedureBudgetVersionId + "&withArmInfo=" + withArmInfo;
    return this.endpoint.get<StudyBudgetVersionArm[]>(url);
  }

  getAllWithBudgets(studyProcedureBudgetVersionId, withArmInfo) {
    const url = this._getAllWithBudgetsURL + "?studyProcedureBudgetVersionId=" + studyProcedureBudgetVersionId + "&withArmInfo=" + withArmInfo;
    return this.endpoint.get<StudyBudgetVersionArm[]>(url);
  }

  save(studyBudgetVersionArm: StudyBudgetVersionArm) {
    if (studyBudgetVersionArm.id <= 0 || studyBudgetVersionArm.id == null || studyBudgetVersionArm.id == undefined) {
      studyBudgetVersionArm.createdBy = this.authService.currentUser.id;
      studyBudgetVersionArm.createdOn = this.momentDatePipe.currentDate;
      }
    studyBudgetVersionArm.updatedBy = this.authService.currentUser.id;
    studyBudgetVersionArm.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<StudyBudgetVersionArm>(studyBudgetVersionArm, this._saveURL);
  }

  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }
}

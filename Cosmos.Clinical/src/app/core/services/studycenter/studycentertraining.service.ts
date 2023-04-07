//===================================================================================== Imports ===============================================================//
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleMaster } from 'src/app/models/common/titlemaster.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../account/services/auth.service';
import { StudyCenterTraining, TrainingRoleMapping, TrainingUserMapping } from '../../../models/studycenter/studycentertraining.model';
import { ComplianceTrainingViewModel, TrainingRoles } from '../../../viewmodels/studycenter/compliancetrainingviewmodel.model';
import { StudyCenterTrainingViewModel } from '../../../viewmodels/studycenter/studycentertrainingviewmodel.model';
import { TrainingRoleMappingViewModel } from '../../../viewmodels/studycenter/trainingrolemappingviewmodel.model';

import { EndPointService } from '../endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class StudyCenterTrainingService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/StudyCenterTraining/";
  
  private readonly _saveStudyCenterTrainingURL: string = this._baseApiUrl + "SaveStudyCenterTraining";
  private readonly _getStudyCenterTrainingURL: string = this._baseApiUrl + "GetStudyCenterTraining";
  private readonly _getAllStudyCenterTrainingsURL: string = this._baseApiUrl + "GetAllAvailableTraining";
  private readonly _deleteStudyCenterTrainingURL: string = this._baseApiUrl + "DeleteStudyCenterTraining";
  private readonly _updateStudyCenterTrainingStatusURL: string = this._baseApiUrl + "UpdateTraningStatus";
  private readonly _uploadStudyCenterTrainingMaterialURL: string = this._baseApiUrl + "UploadStudyCenterTrainingMaterial";
  private readonly _fillSiteNumbersURL: string = this._baseApiUrl + "FillSiteNumbers";
  private readonly _getAllComplianceTrainingURL: string = this._baseApiUrl + "GetAllComplianceTrainings";
  private readonly _createTrainingRoleMappingURL: string = this._baseApiUrl + "CreateTrainingRoleMapping";
  private readonly _geTrainingRoleMappingsURL: string = this._baseApiUrl + "GeTrainingRoleMappings";
  private readonly _deleteTrainingRoleMappingURL: string = this._baseApiUrl + "DeleteTrainingRoleMapping";
  private readonly _updateTraningCompletionStatusURL: string = this._baseApiUrl + "UpdateTraningCompletionStatus";
  private readonly _getTrainingRolesURL: string = this._baseApiUrl + "GetTrainingRoles";
  private readonly _getMappingTrainingsURL: string = this._baseApiUrl + "GetMappingTrainings";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private endpoint: EndPointService
  ) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  saveTraining(studyCenterTraining: StudyCenterTraining) {
    if (studyCenterTraining.id <= 0 || studyCenterTraining.id == undefined || studyCenterTraining.id == null || studyCenterTraining.createdBy <= 0 || studyCenterTraining.createdBy == null || studyCenterTraining.createdBy == undefined)
      studyCenterTraining.createdBy = this.authService.currentUser.id;
    studyCenterTraining.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(studyCenterTraining, this._saveStudyCenterTrainingURL);
  }

  getAllAvailableTraining(studyId: number, countryId: number, languageId: number, mandatory: number) {
    const url = this._getAllStudyCenterTrainingsURL + "?studyId=" + studyId + "&countryId=" + countryId + "&languageId=" + languageId + "&mandatory=" + mandatory + "&currentUserId=" + this.authService.currentUser.id;
    return this.endpoint.get<StudyCenterTrainingViewModel[]>(url);
  }

  getAllComplianceTraining(studyId: number, countryId: number, siteInfoId: number, roleId: number, searchTraining: string) {
    const url = this._getAllComplianceTrainingURL + "?studyId=" + studyId + "&countryId=" + countryId + "&siteInfoId=" + siteInfoId + "&roleId=" + roleId + "&searchTraining=" + searchTraining;
    return this.endpoint.get<ComplianceTrainingViewModel[]>(url);
  }

  getTraining(id) {
    const url = this._getStudyCenterTrainingURL + "?id=" + id;
    return this.endpoint.get<StudyCenterTraining>(url);
  }

  deleteTraining(id: number) {
    const url = this._deleteStudyCenterTrainingURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  updateTrainingStatus(studyCenterTraining: StudyCenterTraining) {
    if (studyCenterTraining.id <= 0 || studyCenterTraining.id == null || studyCenterTraining.id == undefined) {
      studyCenterTraining.createdBy = this.authService.currentUser.id;
    }
    studyCenterTraining.updatedBy = this.authService.currentUser.id;
    studyCenterTraining.updatedOn = new Date();
    return this.endpoint.addupdate<any>(studyCenterTraining, this._updateStudyCenterTrainingStatusURL);
  }

  uploadStudyCenterTrainingMaterial(formData) {
    var url = this.port + this._uploadStudyCenterTrainingMaterialURL;
    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  fillSiteNumbers(studyId: number) {
    return this.endpoint.get<TitleMaster[]>(this._fillSiteNumbersURL + "?studyId=" + studyId);
  }

  saveTrainingRoleMapping(trainingRoleMapping: TrainingRoleMapping) {
    trainingRoleMapping.createdBy = this.authService.currentUser.id;
    trainingRoleMapping.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(trainingRoleMapping, this._createTrainingRoleMappingURL);
  }

  geTrainingRoleMappings(studyId: number, countryId: number, languageId: number, roleId: number) {
    const url = this._geTrainingRoleMappingsURL + "?studyId=" + studyId + "&countryId=" + countryId + "&languageId=" + languageId + "&roleId=" + roleId;
    return this.endpoint.get<TrainingRoleMappingViewModel[]>(url);
  }

  deleteTrainingMapping(id: number) {
    const url = this._deleteTrainingRoleMappingURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  updateTraningCompletionStatus(trainingUserMapping: TrainingUserMapping) {
    trainingUserMapping.createdBy = this.authService.currentUser.id;
    trainingUserMapping.updatedBy = this.authService.currentUser.id;
    trainingUserMapping.userId = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(trainingUserMapping, this._updateTraningCompletionStatusURL);
  }

  getTrainingRoles(studyId: number) {
    return this.endpoint.get<TrainingRoles[]>(this._getTrainingRolesURL + "?studyId=" + studyId);
  }

  getMappingTrainings(studyId: number) {
    const url = this._getMappingTrainingsURL + "?studyId=" + studyId;
    return this.endpoint.get<StudyCenterTrainingViewModel[]>(url);
  }
}

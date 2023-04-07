import { Injectable } from '@angular/core';
import { EndPointService } from '../../endpoint.service';
import { TherapeuticExperience } from '../../../models/site/investigator/therapeuticexperience.model';
import { TherapeuticExperienceDetail } from '../../../models/site/investigator/therapeuticexperiencedetail.model';
import { AuthService } from '../../account/auth.service';


@Injectable()
export class TherapeuticExperienceService {
  private readonly _getURL: string = "api/TherapeuticExperience/Get";
  private readonly _getAllURL: string = "api/TherapeuticExperience/GetAll";
  private readonly _getAllWithDetailsURL: string = "api/TherapeuticExperience/GetAllWithDetails";
  private readonly _saveURL: string = "api/TherapeuticExperience/Save";
  private readonly _deleteURL: string = "api/TherapeuticExperience/Delete";

  private readonly _getDetailURL: string = "api/TherapeuticExperience/GetDetail";
  private readonly _getAllDetailURL: string = "api/TherapeuticExperience/GetAllDetail";
  private readonly _saveDetailURL: string = "api/TherapeuticExperience/SaveDetail";
  private readonly _deleteDetailURL: string = "api/TherapeuticExperience/DeleteDetail";

  constructor(private endpoint: EndPointService, private authService: AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<TherapeuticExperience>(url);
  }

  getAll() {
    return this.endpoint.get<TherapeuticExperience[]>(this._getAllURL);
  }

  getAllWithDetails() {
    return this.endpoint.get<TherapeuticExperience[]>(this._getAllWithDetailsURL);
  }

  save(therapeuticExperience: TherapeuticExperience) {
    if (therapeuticExperience.id <= 0 || therapeuticExperience.id == null || therapeuticExperience.id == undefined)
      therapeuticExperience.createdBy = this.authService.currentUser.id;
    therapeuticExperience.updatedBy = this.authService.currentUser.id;

    return this.endpoint.addupdate<TherapeuticExperience>(therapeuticExperience, this._saveURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  getDetail(id) {
    const url = this._getDetailURL + "?id=" + id;
    return this.endpoint.get<TherapeuticExperienceDetail>(url);
  }

  getAllDetail(therapeuticExperienceId) {
    const url = this._getAllDetailURL + "?therapeuticExperienceId=" + therapeuticExperienceId;
    return this.endpoint.get<TherapeuticExperienceDetail[]>(url);
  }

  saveDetail(therapeuticExperienceDetail: TherapeuticExperienceDetail) {
    if (therapeuticExperienceDetail.id <= 0 || therapeuticExperienceDetail.id == null || therapeuticExperienceDetail.id == undefined)
      therapeuticExperienceDetail.createdBy = this.authService.currentUser.id;
    therapeuticExperienceDetail.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<TherapeuticExperienceDetail>(therapeuticExperienceDetail, this._saveDetailURL);
  }

  deleteDetail(id: number) {
    const url = this._deleteDetailURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

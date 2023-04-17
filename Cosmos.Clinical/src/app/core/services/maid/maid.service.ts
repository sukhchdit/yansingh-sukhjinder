import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { environment } from '../../../../environments/environment';
import { MaidDetail } from '../../../models/maid/maiddetail.model';
import { EndPointService } from '../endpoint.service';

@Injectable()
export class MaidService {
  port = environment.apiport;
  private readonly _saveMaidURL: string = "api/Maid/SaveMaid";
  private readonly _getMaidByIdURL: string = "api/Maid/GetMaidById";
  private readonly _getAllActiveMaidsURL: string = "api/Maid/GetAllActiveMaids";
  private readonly _getAllDeletedMaidsURL: string = "api/Maid/GetAllDeletedMaids";
  private readonly _deleteMaidURL: string = "api/Maid/DeleteMaid";//UploadMaidPhoto
  private readonly _uploadMaidPhotoURL: string = "api/Maid/UploadMaidPhoto";//UploadMaidPhoto

  constructor(private endpoint: EndPointService, private authService: AuthService, private httpClient: HttpClient) {

  }

  get(id) {
    const url = this._getMaidByIdURL + "?id=" + id;
    return this.endpoint.get<MaidDetail>(url);
  }


  getAllActiveMaids() {
    const url = this._getAllActiveMaidsURL;
    return this.endpoint.get<MaidDetail[]>(url);
  }

  getAllDeletedMaids() {
    const url = this._getAllDeletedMaidsURL;
    return this.endpoint.get<MaidDetail[]>(url);
  }

   save(model: MaidDetail) {
    //if (model.id <= 0 || model.id == undefined || model.id == null || model.createdBy <= 0 || model.createdBy == null || model.createdBy == undefined)
    //  model.createdBy = this.authService.currentUser.id;
    //model.updatedBy = this.authService.currentUser.id;
     return this.endpoint.addupdate<MaidDetail>(model, this._saveMaidURL);
  }

  delete(id) {
    const url = this._deleteMaidURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  uploadDocumentFile(formData) {
    const url = this.port + this._uploadMaidPhotoURL;
    //return this.endpoint.uploadFile(formData, url);
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ',
    });
  }

}

//===================================================================================== Imports ===============================================================//

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/account/services/auth.service';
import { environment } from 'src/environments/environment';
import { StudyCenterNews } from '../../../models/studycenter/studycenternews.model';
import { StudyCenterNewsViewModel } from '../../../viewmodels/studycenter/studycenternewsviewmodel.model';

@Injectable({
  providedIn: 'root'
})

export class StudyCenterNewsService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/StudyCenterNews/";
  private readonly _createStudyCenterNewsURL: string = this._baseApiUrl + "CreateStudyCenterNews";
  private readonly _getStudyCenterNewsListURL: string = this._baseApiUrl + "GetStudyCenterNewsList";
  private readonly _getStudyCenterNewsURL: string = this._baseApiUrl + "GetStudyCenterNews";
  private readonly _deleteStudyCenterNewsURL: string = this._baseApiUrl + "DeleteStudyCenterNews";
  private readonly _uploadStudyIconURL: string = this._baseApiUrl + "UploadStudyIcon";

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

  saveNews(studyCenterNews: StudyCenterNews) {
    studyCenterNews.createdBy = this.authService.currentUser.id;
    studyCenterNews.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<any>(studyCenterNews, this._createStudyCenterNewsURL);
  }

  uploadStudyIcon(formData) {
    var url = this.port + this._uploadStudyIconURL;
    return this.httpClient.post(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  getNewsList(studyId: number) {
    return this.endpoint.get<StudyCenterNewsViewModel[]>(this._getStudyCenterNewsListURL + "?studyId=" + studyId);
  }

  getNews(id) {
    const url = this._getStudyCenterNewsURL + "?id=" + id;
    return this.endpoint.get<StudyCenterNews>(url);
  }

  deleteNews(id: number) {
    const url = this._deleteStudyCenterNewsURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }
}

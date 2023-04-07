import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../account/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StudyteamService {
  port = environment.apiport;
  private readonly _baseApiUrl: string = "api/StudyCenter/";

  private readonly _downloadSampleFileURL: string = this._baseApiUrl + "DownloadSampleFile";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  downloadDocument() {
    var url = this.port + this._downloadSampleFileURL;
    this.httpClient.post(url, null, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, 'StudyContactSampleFile.csv');
    }, (err) => {
      //console.log(err);
    });
  }

}

import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/account/services/auth.service';


@Injectable()
export class EndPointService {
  port = environment.apiport;
  private _authService: AuthService;

  constructor(private http: HttpClient, private injector: Injector) {
  }

  //download<T>(endpointUrl): Observable<T> {
  //  endpointUrl = endpointUrl;
  //  return this.http.get<T>(endpointUrl, this.getRequestHeaders());
  //}

  get<T>(endpointUrl): Observable<T> {
    endpointUrl = this.port + endpointUrl;
    return this.http.get<T>(endpointUrl, this.getRequestHeaders());
  }

  addupdate<T>(obj, endpointUrl): Observable<T> {
    endpointUrl = this.port + endpointUrl;
    return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
  }

  deleteObj<T>(endpointUrl): Observable<T> {
    endpointUrl = this.port + endpointUrl;
    return this.http.delete<T>(endpointUrl, this.getRequestHeaders());
  }

  private getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]} } {
    const headers = this.getHeaders();
    return { headers: headers };
  }

  private get authService() {
    if (!this._authService) {
      this._authService = this.injector.get(AuthService);
    }
    return this._authService;
  }

  uploadFile<T>(formData, endpointUrl) {
    endpointUrl = this.port + endpointUrl;
    const result = this.http.post<T>(
      endpointUrl,
      formData,
      {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.authService.accessToken
        })
      }
    );
    return result;
  }

  uploadFileWithObservable<T>(formData, endpointUrl): Observable<T> {
    endpointUrl = this.port + endpointUrl;
    return this.http.post<T>(endpointUrl, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.accessToken }) });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer '+ this.authService.accessToken,
      'Content-Type': 'application/json',
      'Accept': `application/vnd.iman.v1+json, application/json, text/plain, */*`,
      'App-Version': '1.0'
    });
  }

  downloadFile(obj, downloadUrl): Observable<any> {
    const url = this.port + downloadUrl;
    return this.http.post(url, obj, { responseType: 'blob', headers: this.getHeaders1().append("Content-Type", "application/json") });    
  }

  private getHeaders1() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

}

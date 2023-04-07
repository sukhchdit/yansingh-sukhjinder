import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { CroInfo } from '../../models/cro/croinfo.model';
import { siteCTAMaster, siteCTAMasterAuditHistory } from 'src/app/models/cta/siteCTAMaster.model';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class siteCTAMasterService {
  port = environment.apiport;
  private readonly _getURL: string = "api/siteCTAMaster/Get";
  private readonly _getAllURL: string = "api/siteCTAMaster/GetAll";
  private readonly _saveURL: string = "api/siteCTAMaster/Save";
  private readonly _deleteURL: string = "api/siteCTAMaster/Delete";
  private readonly _getAllSiteCTAsBySSSIDURL: string = "api/siteCTAMaster/getAllSiteCTAsBySSSID";
  private readonly _downloadDocumentFileURL: string = "api/siteCTAMaster/downloadFile";
  private readonly _downloadDocumentDOCFileURL: string = "api/siteCTAMaster/downloadFileDOC";
  private readonly _downloadDocumentByteFileURL: string = "api/siteCTAMaster/viewPDFFile";
  private readonly _closeFilesURL: string = "api/siteCTAMaster/CloseFiles";
  private readonly _saveCommentsURL: string = "api/siteCTAMaster/saveComments";
  private readonly _ApproveBySiteURL: string = "api/siteCTAMaster/ApproveBySite";
  private readonly _DisApproveBySiteURL: string = "api/siteCTAMaster/DisApproveBySite";
  private readonly _ApproveByQCURL: string = "api/siteCTAMaster/ApproveByQC";
  private readonly _DisApproveByQCURL: string = "api/siteCTAMaster/DisApproveByQC";
  private readonly _DisApproveBySponsorURL: string = "api/siteCTAMaster/DisApproveBySponsor"
  private readonly _ApproveBySponsorURL: string = "api/siteCTAMaster/ApproveBySponsor";
  private readonly _sendToSponsorURL: string = "api/siteCTAMaster/sendToSponsor";
  private readonly _ChangeSiteCTAStatusURL: string = "api/siteCTAMaster/ChangeSiteCTAStatus";
  private readonly _sendToQCURL: string = "api/siteCTAMaster/sendToQC";
  private readonly _GetAllSiteCTAAuditHistoryUrl: string = "api/siteCTAMaster/GetAllSiteCTAAuditHistory";

  constructor(private endpoint: EndPointService, private authService: AuthService, public httpClient: HttpClient) {
  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<siteCTAMaster>(url);
  }

  getAll() {
    return this.endpoint.get<siteCTAMaster[]>(this._getAllURL);
  }

  // save(info: siteCTAMaster) {
  //   if (info.id <= 0 || info.id == null || info.id == undefined) {
  //       info.createdBy = this.authService.organization.id;
  //   }
  //   info.updatedBy = this.authService.organization.id;
  //   return this.endpoint.addupdate<siteCTAMaster>(info, this._saveURL);
  // }
  save(formData: FormData) {
    const url = this.port + this._saveURL;
    // invoiceMaster.createdBy = this.authService.currentUser.id;;
    // invoiceMaster.updatedBy = this.authService.currentUser.id;;
    // return this.endpoint.addupdate<invoiceMaster>(invoiceMaster, this._saveURL);
    formData.append('createdBy', this.authService.currentUser.id.toString())
    formData.append('updatedBy', this.authService.currentUser.id.toString())
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  }
  sendToSponsor(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._sendToSponsorURL);
  }
  ChangeSiteCTAStatus(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._ChangeSiteCTAStatusURL);
  }

  sendToQC(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._sendToQCURL);
  }
  ApproveBySite(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._ApproveBySiteURL);
  }
  GetAllSiteCTAAuditHistory(ctaId) {
    return this.endpoint.get<siteCTAMasterAuditHistory[]>(this._GetAllSiteCTAAuditHistoryUrl + "?ctaId=" + ctaId);
  }

 DisApproveBySite(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._DisApproveBySiteURL);
  }

  ApproveBySponsor(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._ApproveBySponsorURL);
  }

  DisApproveBySponsor(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._DisApproveBySponsorURL);
  }

  ApproveByAQC(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._ApproveByQCURL);
  }
  
  DisApproveByQC(cta: siteCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._DisApproveByQCURL);
  }
  
  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  } 

  SaveComments(cta: siteCTAMaster, role: string) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<siteCTAMaster>(cta, this._saveCommentsURL + "?role=" + role);
  }

  CloseFiles(ctaId: number) {
    var updatedby = this.authService.currentUser.id.toString()
    const url = this._closeFilesURL + "?ctaId=" + ctaId;
    return this.endpoint.get<siteCTAMaster>(url);
  }
  getAllSiteCTAsBySSSID(SSScdaId) {
    return this.endpoint.get<siteCTAMaster[]>(this._getAllSiteCTAsBySSSIDURL + "?SSScdaId=" + SSScdaId);
  }
  downloadDocument(obj: siteCTAMaster) {
    //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
    const url = this.port + this._downloadDocumentFileURL;
    return this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, obj.uploadedFileName);
    }, err => {
      console.log(err);
    });
  }
  downloadDocumentDOC(obj: siteCTAMaster) {
    //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
    const url = this.port + this._downloadDocumentDOCFileURL;
    return this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, obj.uploadedFileName);
    }, err => {
      console.log(err);
    });
  }

  // downloadByteArrayForPDFViewer(obj) {
  //   //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
  //   const url = this.port + this._downloadDocumentByteFileURL;
  //   return this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });//.subscribe(data => {
  // }
  previewCTAFile(formData: any) {
    const url = this.port + this._downloadDocumentByteFileURL;
    return this.httpClient.post(url, formData, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });
  }
  
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken
    });
  }
}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { AuthService } from '../account/auth.service';
import { CroInfo } from '../../models/cro/croinfo.model';
import { CTAsiteList, sponsorCTAMaster, sponsorCTAMasterAuditHistory } from 'src/app/models/cta/sponsorCTAMaster.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
@Injectable()
export class sponsorCTAMasterService {
  port = environment.apiport;
  private readonly _getURL: string = "api/sponsorCTAMaster/Get";
  private readonly _getAllURL: string = "api/sponsorCTAMaster/GetAll";
  private readonly _getAllSiteByStudyURL: string = "api/sponsorCTAMaster/GetAllSiteByStudy";
  private readonly _getStudyDetailsURL: string = "api/sponsorCTAMaster/GetStudyDetails";
  private readonly _saveURL: string = "api/sponsorCTAMaster/Save";
  private readonly _deleteURL: string = "api/sponsorCTAMaster/Delete";
  private readonly _downloadDocumentFileURL: string = "api/sponsorCTAMaster/downloadFile";
  private readonly _downloadDocumentByteFileURL: string = "api/sponsorCTAMaster/viewPDFFile";
  private readonly _previewFileLocalURL: string = "api/sponsorCTAMaster/previewFileLocalURL";
  private readonly _sendToSiteURL: string = "api/sponsorCTAMaster/sendToSite";
  private readonly _sendToMultipleSite: string = "api/sponsorCTAMaster/sendToMultipleSite";
  private readonly _closeFilesURL: string = "api/sponsorCTAMaster/CloseFiles";
  private readonly _sendToQAURL: string = "api/sponsorCTAMaster/sendToQA";
  private readonly _sendToQCURL: string = "api/sponsorCTAMaster/sendToQC";
  private readonly _sendToAttorneyURL: string = "api/sponsorCTAMaster/sendToAttorney";
  private readonly _saveCommentsURL: string = "api/sponsorCTAMaster/saveComments";
  private readonly _ApproveByQAURL: string = "api/sponsorCTAMaster/ApproveByQA";
  private readonly _DisApproveByQAURL: string = "api/sponsorCTAMaster/DisApproveByQA";
  private readonly _ApproveByQCURL: string = "api/sponsorCTAMaster/ApproveByQC";
  private readonly _DisApproveByQCURL: string = "api/sponsorCTAMaster/DisApproveByQC";
  private readonly _DisApproveByAttorneyURL: string = "api/sponsorCTAMaster/DisApproveByAttorney"
  private readonly _ApproveByAttorneyURL: string = "api/sponsorCTAMaster/ApproveByAttorney";;
  private readonly _getHistoryURL: string = "api/sponsorCTAMaster/GetHistory";
  private readonly _GetAllSponsorCTAAuditHistory: string = "api/sponsorCTAMaster/GetAllSponsorCTAAuditHistory";
  private readonly _closeTempFileURL: string = "api/sponsorCTAMaster/closeTempFiles";
  private readonly _getAllCTAsByStudyURL: string = "api/sponsorCTAMaster/getAllCTAsByStudy";
  private readonly _getAllAttorneyApprovedCTAsByStudyURL: string = "api/sponsorCTAMaster/GetAllAttorneyApprovedCTAsByStudy";
  private readonly _ChangeStatusURL: string = "api/sponsorCTAMaster/ChangeStatus";
  private readonly _getCTAstatsURL: string = "api/sponsorCTAMaster/getCTAstats";

  constructor(private endpoint: EndPointService, private authService: AuthService, public httpClient: HttpClient) {
  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<sponsorCTAMaster>(url);
  }

  sendToSite(idList: string, ctaId: number, comments: string) {
    var updatedby = this.authService.currentUser.id.toString()
    const url = this._sendToSiteURL + "?id=" + ctaId + "&updatedBy=" + updatedby + "&idList=" + idList + "&comments=" + comments;
    return this.endpoint.get<sponsorCTAMaster>(url);
  }
  sendToMultipleSite(idList: string, ctaId: string, comments: string) {
    var updatedby = this.authService.currentUser.id.toString()
    const url = this._sendToMultipleSite + "?id=" + ctaId + "&updatedBy=" + updatedby + "&idList=" + idList + "&comments=" + comments;
    return this.endpoint.get<sponsorCTAMaster>(url);
  }
  CloseFiles(ctaId: number) {
    var updatedby = this.authService.currentUser.id.toString()
    const url = this._closeFilesURL + "?ctaId=" + ctaId;
    return this.endpoint.get<sponsorCTAMaster>(url);
  }
  CloseTempFile(fileName: string) {
    const url = this._closeTempFileURL + "?fileName=" + fileName;
    return this.endpoint.get<any>(url);
  }
  sendToQA(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._sendToQAURL);
  }
  sendToQC(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._sendToQCURL);
  }
  sendToAttorney(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._sendToAttorneyURL);
  }
  ApproveByQA(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._ApproveByQAURL);
  }

  ChangeStatus(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._ChangeStatusURL);
  }
  // ApproveByQA(ctaId) {
  //   var updatedby = this.authService.currentUser.id;.toString()
  //   const url = this._ApproveByQAURL + "?id=" + ctaId + "&updatedBy=" + updatedby;
  //   return this.endpoint.get<sponsorCTAMaster>(url);
  // }

  DisApproveByQA(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._DisApproveByQAURL);
  }
  DisApproveByAttorney(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._DisApproveByAttorneyURL);
  }
  ApproveByQC(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._ApproveByQCURL);
  }

  ApproveByAttorney(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._ApproveByAttorneyURL);
  }

  DisApproveByQC(cta: sponsorCTAMaster) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._DisApproveByQCURL);
  }

  getAll() {
    return this.endpoint.get<sponsorCTAMaster[]>(this._getAllURL);
  }

  getAllCTAsByStudy(studyId) {
    return this.endpoint.get<sponsorCTAMaster[]>(this._getAllCTAsByStudyURL + "?studyId=" + studyId);
  }

  getAllAttorneyApprovedCTAsByStudy(studyId) {
    return this.endpoint.get<sponsorCTAMaster[]>(this._getAllAttorneyApprovedCTAsByStudyURL + "?studyId=" + studyId);
  }
  GetAllSponsorCTAAuditHistory(ctaId) {
    return this.endpoint.get<sponsorCTAMasterAuditHistory[]>(this._GetAllSponsorCTAAuditHistory + "?ctaId=" + ctaId);
  }

  // SaveComments(ctaId, comments, role) {
  //   var updatedby = this.authService.currentUser.id;.toString()
  //   const url = this._saveCommentsURL + "?comments=" + comments + "&updatedBy=" + updatedby + "&CTAId=" + ctaId + "&role=" + role;
  //   return this.endpoint.get<sponsorCTAMaster>(url);
  // }

  SaveComments(cta: sponsorCTAMaster, role: string) {
    if (cta.id <= 0 || cta.id == null || cta.id == undefined) {
      cta.createdBy = this.authService.currentUser.id;;
    }
    cta.updatedBy = this.authService.currentUser.id;;
    cta.updatedOn = new Date();
    return this.endpoint.addupdate<sponsorCTAMaster>(cta, this._saveCommentsURL + "?role=" + role);
  }

  GetAllSiteByStudy(sponsorInfoId) {
    return this.endpoint.get<any>(this._getAllSiteByStudyURL + "?sponsorInfoId=" + sponsorInfoId);
  }
  
  getStudyDetails(sponsorInfoId) {
    return this.endpoint.get<any>(this._getStudyDetailsURL + "?sponsorInfoId=" + sponsorInfoId);
  }
  getCTAstats(sponsorInfoId) {
    return this.endpoint.get<any>(this._getCTAstatsURL + "?sponsorStudyInfoId=" + sponsorInfoId);
  }

  save(formData: FormData) {
    const url = this.port + this._saveURL;
    // invoiceMaster.createdBy = this.authService.currentUser.id;;
    // invoiceMaster.updatedBy = this.authService.currentUser.id;;
    // return this.endpoint.addupdate<invoiceMaster>(invoiceMaster, this._saveURL);
    formData.append('createdBy', this.authService.currentUser.id.toString())
    formData.append('updatedBy', this.authService.currentUser.id.toString())
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders() });
  }


  downloadDocument(obj: sponsorCTAMaster) {
    //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
    const url = this.port + this._downloadDocumentFileURL;
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
  previewFileLocal(formData: FormData) {
    const url = this.port + this._previewFileLocalURL;
    return this.httpClient.post(url, formData, { responseType: 'blob', headers: this.getHeaders() });
  }
  delete(id) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken
    });
  }
  getSponsorHistory(id) {
    const url = this._getHistoryURL + "?id=" + id;
    return this.endpoint.get<sponsorCTAMaster>(url);
  }

}

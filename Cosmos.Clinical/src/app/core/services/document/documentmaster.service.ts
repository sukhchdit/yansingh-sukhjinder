import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { environment } from 'src/environments/environment';
import { DocumentMaster } from 'src/app/models/document/documentmaster.model';
import { DocumentMasterSignature } from 'src/app/models/document/documentmastersignature.model';
import { AuthService } from 'src/app/account/services/auth.service';

@Injectable()
export class DocumentMasterService {
  port = environment.apiport;
  private readonly _getDocumentURL: string = "api/DocumentMaster/Get";
  private readonly _getDocumentByDocumentGuidURL: string = "api/DocumentMaster/GetByDocumentGuid";
  private readonly _deleteDocumentURL: string = "api/DocumentMaster/Delete";
  private readonly _getAllDocumentURL: string = "api/DocumentMaster/GetAll";
  private readonly _getDocumentsByDocumentTypeURL: string = "api/DocumentMaster/GetDocumentsByDocumentType";
  private readonly _getDocumentsByDocumentTypeAndStudyURL: string = "api/DocumentMaster/GetDocumentsByDocumentTypeAndStudy";
  private readonly _getAllStudyDocumentsListURL: string = "api/DocumentMaster/GetAllStudyDocumentsList";
  private readonly _getSiteInboxDocumentsURL: string = "api/DocumentMaster/GetSiteInboxDocuments";
  private readonly _createDocumentURL: string = "api/DocumentMaster/Save";
  private readonly _createDocumentStudyURL: string = "api/DocumentMaster/CreateDocumentStudy";
  private readonly _uploadDocumentFileURL: string = "api/DocumentMaster/UploadDocumentFile";
  private readonly _downloadDocumentFileURL: string = "api/DocumentMaster/DownloadDocumentFile";
  private readonly _downloadCommunicationDocumentFileURL: string = "api/DocumentMaster/DownloadCommunicationDocumentFile";
  private readonly _getDocumentStudiesByMasterDocumentIdURL: string = "api/DocumentMaster/GetDocumentStudiesByMasterDocumentId";
  private readonly _downloadAllStudyDocumentsURL: string = "api/DocumentMaster/DownloadAllStudyDocuments";

  private readonly _getAllDocumentsByStudyURL: string = "api/DocumentMaster/GetAllDocumentsByStudy";
  private readonly _checkIfParentDocURL: string = "api/DocumentMaster/CheckIfParentDoc";
  private readonly _getAllDocumentsByOrganizationURL: string = "api/DocumentMaster/GetAllDocumentsByOrganization";
  private readonly _getDocumentDownloadURL: string = "api/DocumentMaster/GetDownloadURL";
  private readonly _getDocumentDetailURL: string = "api/DocumentMaster/GetDocumentDetails";
  private readonly _updateDocumentBasicDetailsURL: string = "api/DocumentMaster/UpdateDocumentBasicDetails";
  private readonly _getStudyDocumentsByDocumentTypeURL: string = "api/DocumentMaster/GetStudyDocumentsByDocumentType";
  private readonly _createDocumentMasterSignatureURL: string = "api/DocumentMaster/SaveDocumentMasterSignature";
  private readonly _getSignatureRequestURL: string = "api/DocumentMaster/GetDocumentSignatureRequest";
  private readonly _updateDocumentsStatusURL: string = "api/DocumentMaster/UpdateDocumentStatus";
  private readonly _getSignatureMasterSignatureURL: string = "api/DocumentMaster/GetDocumentMasterSignature";
  private readonly _addSignatureToDocumentURL: string = "api/DocumentMaster/AddDigitalSignature";  
  private readonly _getDocumentMasterSignatureByIdURL: string = "api/DocumentMaster/GetDocumentMasterSignatureById";
  private readonly _updateDocumentMasterSignatureeSignedURL: string = "api/DocumentMaster/UpdateDocumentMasterSignatureeSigned";
  private readonly _getStudyCommunicationDocumentsURL: string = "api/DocumentMaster/GetStudyCommunicationDocuments";
  private readonly _downloadSiteInbodDocumentByteArrayForPDFViewerURL: string = "api/DocumentMaster/DownloadSiteInboxDocumentFileForPdfViewer";
  private readonly _prepareeSignGenieDocumentURL: string = "api/DocumentMaster/PrepareeSignGenieDocument";
  private readonly _getAllDocumentsForStudyByExpirationDateURL: string = "api/DocumentMaster/GetAllDocumentsForStudyByExpirationDate";
  private readonly _getICFSignatureRequestURL: string = "api/DocumentMaster/GetICFDocumentSignatureRequest";
  private readonly _getEConsentSignatureURL: string = "api/DocumentMaster/GetEConsentSignature";
  private readonly _downloadStudyDocumentURL: string = "api/DocumentMaster/DownloadStudyDocument";
  private readonly _uploadEConsentDocumentURL: string = "api/DocumentMaster/UploadEConsentDocument";

  constructor(private endpoint: EndPointService, private httpClient: HttpClient, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  updateDocumentBasicDetails(obj) {
    obj.updatedBy = this.authService.currentUser.id;
    obj.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<any>(obj, this._updateDocumentBasicDetailsURL);
  }

  getDocumentById(id) {
    const url = this._getDocumentURL + "?id=" + id;
    return this.endpoint.get<DocumentMaster>(url);
  }

  getDocumentByDocumentGuid(documentGuid) {
    const url = this._getDocumentByDocumentGuidURL + "?documentGuid=" + documentGuid;
    return this.endpoint.get<DocumentMaster>(url);
  }

  getAllDocumentsByOrganization(obj) {
    return this.endpoint.addupdate<any[]>(obj, this._getAllDocumentsByOrganizationURL);
  }

  getDocumentDownloadUrl() {
    return this.endpoint.get<any>(this._getDocumentDownloadURL);
  }

  getSiteInboxDocuments(siteGuid) {
    return this.endpoint.get<any[]>(this._getSiteInboxDocumentsURL + "?siteGuid=" + siteGuid);
  }

  getStudyCommunicationDocuments(siteGuid, studyId) {
    return this.endpoint.get<any[]>(this._getStudyCommunicationDocumentsURL + "?siteGuid=" + siteGuid + "&studyId=" + studyId);
  }

  getAllDocumentsByStudy(obj) {
    return this.endpoint.addupdate<any[]>(obj, this._getAllDocumentsByStudyURL);
  }

  checkIfParentDoc(documentGuid, studyId) {
    return this.endpoint.get<boolean>(this._checkIfParentDocURL + "?documentGuid=" + documentGuid + "&studyId=" + studyId);
  }

  getAllDocumentsForStudyByExpirationDate(obj) {
    return this.endpoint.addupdate<any[]>(obj, this._getAllDocumentsForStudyByExpirationDateURL);
  }

  getDocumentDetailById(id) {
    const url = this._getDocumentDetailURL + "?documentId=" + id;
    return this.endpoint.get<any>(url);
  }

  getDocumentStudiesByDocumentId(documentId) {
    const url = this._getDocumentStudiesByMasterDocumentIdURL + "?masterDocumentId=" + documentId;
    return this.endpoint.get<any[]>(url);
  }

  getAllDocuments() {
    const url = this._getAllDocumentURL;// + "?id=" + id;
    return this.endpoint.get<DocumentMaster[]>(url);
  }

  getAllDocumentsByDocumentType(documentTypeId, uploadedBy) {
    const url = this._getDocumentsByDocumentTypeURL + "?documentTypeId=" + documentTypeId + "&uploadedBy=" + uploadedBy;
    return this.endpoint.get<DocumentMaster[]>(url);
  }

  getAllDocumentsByDocumentTypeAndStudyId(documentTypeId, uploadedBy, studyId) {
    const url = this._getDocumentsByDocumentTypeAndStudyURL + "?documentTypeId=" + documentTypeId + "&uploadedBy=" + uploadedBy + "&studyId=" + studyId;
    return this.endpoint.get<DocumentMaster[]>(url);
  }

  getStudyDocumentsByDocumentType(sponsorSiteStudyCDAInvitationId, documentTypeId) {
    const url = this._getStudyDocumentsByDocumentTypeURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId + "&documentTypeId=" + documentTypeId;
    return this.endpoint.get<DocumentMaster[]>(url);
  }

  save(document: DocumentMaster) {
    if (document.id <= 0 || document.id == null || document.id == undefined) {
      document.createdBy = this.authService.currentUser.id;
      document.createdOn = this.momentDatePipe.currentDate;
    }
    document.updatedBy = this.authService.currentUser.id;
    document.updatedOn = this.momentDatePipe.currentDate;

    return this.endpoint.addupdate<DocumentMaster>(document, this._createDocumentURL);
  }

  saveDocumentStudy(obj) {
    obj.DocumentDate = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<any>(obj, this._createDocumentStudyURL);
  }

  uploadDocumentFile(formData) {
    const url = this.port + this._uploadDocumentFileURL;
    //return this.endpoint.uploadFile(formData, url);
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  downloadDocument(obj: DocumentMaster) {
    //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
    obj.updatedOn = this.momentDatePipe.currentDate;
    obj.updatedBy = this.authService.currentUser.id;
    const url = this.port + this._downloadDocumentFileURL;
    this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, obj.displayFileName);
    }, err => {
      console.log(err);
    });
  }

  downloadCommunicationDocument(fileName, fileNameWithPath) {
    const url = this.port + this._downloadCommunicationDocumentFileURL + "?fileName=" + fileNameWithPath;
    this.httpClient.get(url, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, fileName);
    }, err => {
      console.log(err);
    });
  }

  downloadAllStudyDocuments(obj) {
    const url = this.port + this._downloadAllStudyDocumentsURL;
    this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, obj.fileName);
    }, err => {
      console.log(err);
    });
  }

  getAllStudyDocumentsList(studyId) {
    const url = this._getAllStudyDocumentsListURL + "?studyId=" + studyId;
    return this.endpoint.get<any[]>(url);
  }

  downloadByteArrayForPDFViewer(obj) {
    //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
    const url = this.port + this._downloadDocumentFileURL ;
    return this.httpClient.post(url, obj, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });//.subscribe(data => {
    //  console.log("Hello");
    //  console.log(data);
    //  return data;
    //}, err => {
    //    console.log(err);
    //    return null;
    //});
  }

  downloadSiteInbodDocumentByteArrayForPDFViewer(siteId, fileName) {
    //return this.http.post<T>(endpointUrl, obj, this.getRequestHeaders());
    const url = this.port + this._downloadSiteInbodDocumentByteArrayForPDFViewerURL + '?siteId=' + siteId + "&fileName=" + fileName;
    return this.httpClient.get(url, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  delete(id) {
    const url = this._deleteDocumentURL + "?id=" + id;
    return this.endpoint.get<any>(url);
  }

  saveDocumentMasterSignature(documentSignature: DocumentMasterSignature[], sponsorSiteStudyCDAInvitationId: number) {
    documentSignature.forEach(x => {
      if (x.id <= 0 || x.id == null || x.id == undefined) {
        x.createdBy = this.authService.currentUser.id;
        x.createdOn = this.momentDatePipe.currentDate;
      }
      x.updatedBy = this.authService.currentUser.id;
      x.updatedOn = this.momentDatePipe.currentDate;
    });
    const obj = { documentMasterSignature: documentSignature, sponsorSiteStudyCDAInvitationId: sponsorSiteStudyCDAInvitationId };
    return this.endpoint.addupdate<DocumentMasterSignature[]>(obj, this._createDocumentMasterSignatureURL);
  }

  getSignatureRequest(signedBy) {
    const url = this._getSignatureRequestURL + "?signedBy=" + signedBy;
    return this.endpoint.get<any[]>(url);
  }
  updateDocumentStatus(id, documentStatus) {
    const url = this._updateDocumentsStatusURL + "?id=" + id + "&documentStatus=" + documentStatus;
    return this.endpoint.get<DocumentMaster[]>(url);
  }
  getDocumentMasterSignature(documentMasterId) {
    const url = this._getSignatureMasterSignatureURL + "?documentMasterId=" + documentMasterId;
    return this.endpoint.get<DocumentMasterSignature[]>(url);
  }
  addDigitalSignatureToDocument(obj, signedByName, signOffDateStamp) {
    const url = this._addSignatureToDocumentURL + "?signedByName=" + signedByName + "&signOffDateStamp=" + signOffDateStamp;
    return this.endpoint.addupdate<any>(obj, url);
  }

  getDocumentMasterSignatureById(id) {
    const url = this._getDocumentMasterSignatureByIdURL + "?id=" + id;
    return this.endpoint.get<DocumentMasterSignature>(url);
  }

  updateDocumentMasterSignatureeSigned(folderId) {
    const url = this._updateDocumentMasterSignatureeSignedURL + "?folderId=" + folderId;
    return this.endpoint.get<DocumentMasterSignature>(url);
  }

  prepareeSignGenieDocument(documentMasterId) {
    const url = this._prepareeSignGenieDocumentURL + "?documentMasterId=" + documentMasterId;
    return this.endpoint.get<any>(url);
  }

  getICFSignatureRequest(econcentId, documentMasterId) {
    const url = this._getICFSignatureRequestURL + "?econcentId=" + econcentId + "&documentMasterId=" + documentMasterId;
    return this.endpoint.get<any[]>(url);
  }
  getEConsentSignature(sponsorSiteStudyCDAInvitationId) {
    const url = this._getEConsentSignatureURL + "?sponsorSiteStudyCDAInvitationId=" + sponsorSiteStudyCDAInvitationId;
    return this.endpoint.get<any[]>(url);
  }

  downloadStudyDocument(obj) {    
    return this.endpoint.downloadFile(obj, this._downloadStudyDocumentURL);    
  }

  uploadEConsentDocument(formData) {
    const url = this.port + this._uploadEConsentDocumentURL;
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { StudySubjectEsourceDocument } from "../../models/document/studysubjectesourcedocument.model";
import { AuthService } from "../account/auth.service";
import { EndPointService } from "../endpoint.service";
import { saveAs } from 'file-saver';

@Injectable()
export class SubjectStudyEsourceDocumentMasterService {
  port = environment.apiport;
  private readonly _getAllStudySubjectDocumentURL: string = "api/StudySubjectEsourceDocument/GetAllStudySubjectDocument";
  private readonly _getAllStudySubjectDocumentsByTypeURL: string = "api/StudySubjectEsourceDocument/GetAllStudySubjectDocumentsByType";
  private readonly _getAllStudySubjectDocumentsByTypeAndVisitURL: string = "api/StudySubjectEsourceDocument/GetAllStudySubjectDocumentsByTypeAndVisit";
  private readonly _saveStudySubjectDocumentURL: string = "api/StudySubjectEsourceDocument/Save";
  private readonly _getSubjecteSourceDocumentsURL: string = "api/StudySubjectEsourceDocument/GetSubjecteSourceDocuments";
  private readonly _getAllBySignOffInvestigatorBySignOffStatusURL: string = "api/StudySubjectEsourceDocument/GetAllBySignOffInvestigatorBySignOffStatus";
  private readonly _getAllBySignOffInvestigatorURL: string = "api/StudySubjectEsourceDocument/GetAllBySignOffInvestigator";
  private readonly _updateInvestigatorSignOffStatusURL: string = "api/StudySubjectEsourceDocument/SaveSignature";
  private readonly _downloadSubjecteSourceDocumentFileURL: string = "api/StudySubjectEsourceDocument/DownloadSubjecteSourceDocumentFile";
  private readonly _uploadDocumentFileURL: string = "api/StudySubjectEsourceDocument/SaveDocument";
  private readonly _uploadUpdatedDocumentFileURL: string = "api/StudySubjectEsourceDocument/UpdateDocument";
  private readonly _getStudySubjectDocumentByGuidURL: string = "api/StudySubjectEsourceDocument/GetStudySubjectDocument";
  
    
  constructor(private endpoint: EndPointService, private httpClient: HttpClient, private authService: AuthService) {}

  saveStudySubjectDocument(obj) {
    obj.createdBy = this.authService.currentUser.id;
    obj.updatedBy = this.authService.currentUser.id;
    obj.createdOn = new Date();
    obj.updatedOn = new Date();
    return this.endpoint.addupdate<any>(obj, this._saveStudySubjectDocumentURL);
  }

  //DownloadSubjecteSourceDocumentFile
  downloadSubjecteSourceDocumentFile(documentId, fileName) {
    const url = this.port + this._downloadSubjecteSourceDocumentFileURL + "?documentId=" + documentId;
    this.httpClient.get(url, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") }).subscribe(data => {
      saveAs(data, fileName);
    }, err => {
      console.log(err);
    });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.accessToken,
    });
  }

  getSubjecteSourceDocuments(obj) {
    return this.endpoint.addupdate<any>(obj, this._getSubjecteSourceDocumentsURL);
  }

  getStudySubjectDocumentByDocumentGuid(documentGuid) {
    const url = this._getStudySubjectDocumentByGuidURL + "?documentId=" + documentGuid;
    return this.endpoint.get<any>(url);
  }

  downloadDocumentByteArrayForPDFViewer(documentId) {
    const url = this.port + this._downloadSubjecteSourceDocumentFileURL + '?documentId=' + documentId;
    return this.httpClient.get(url, { responseType: 'blob', headers: this.getHeaders().append("Content-Type", "application/json") });
  }

  getAllStudySubjectDocument(studyId, subjectId) {
    const url = this._getAllStudySubjectDocumentURL + "?studyId=" + studyId + "&subjectId=" + subjectId;
    return this.endpoint.get<any>(url);
  }

  getAllStudySubjectDocumentsByType(studyId, subjectId, documentType) {
    const url = this._getAllStudySubjectDocumentsByTypeURL + "?studyId=" + studyId + "&subjectId=" + subjectId + "&documentType=" + documentType;
    return this.endpoint.get<any>(url);
  }

  getAllStudySubjectDocumentsByTypeAndVisit(studyId, subjectId, documentType, subjectVisitId) {
    const url = this._getAllStudySubjectDocumentsByTypeAndVisitURL + "?studyId=" + studyId + "&subjectId=" + subjectId + "&documentType=" + documentType + "&subjectVisitId=" + subjectVisitId;
    return this.endpoint.get<any>(url);
  }

  getAllBySignOffInvestigatorBySignOffStatus(signOffInvestigator, isSignedOffByInvestigator) {
    const url = this._getAllBySignOffInvestigatorBySignOffStatusURL + "?signOffInvestigator=" + signOffInvestigator + "&isSignedOffByInvestigator=" + isSignedOffByInvestigator;
    return this.endpoint.get<StudySubjectEsourceDocument[]>(url);
  }

  getAllBySignOffInvestigator(signOffInvestigator) {
    const url = this._getAllBySignOffInvestigatorURL + "?signOffInvestigator=" + signOffInvestigator;
    return this.endpoint.get<StudySubjectEsourceDocument[]>(url);
  }

  updateInvestigatorSignOffStatus(document, signOffDateStamp, signedByName) {
    return this.endpoint.addupdate<boolean>(document, this._updateInvestigatorSignOffStatusURL + "?signOffDateStamp=" + signOffDateStamp + "?signedByName=" + signedByName);
  }

  uploadeSourceDocumentFile(formData) {
    const url = this.port + this._uploadDocumentFileURL;
    //return this.endpoint.uploadFile(formData, url);
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }

  uploadeUpdatedSourceDocumentFile(formData) {
    const url = this.port + this._uploadUpdatedDocumentFileURL;
    //return this.endpoint.uploadFile(formData, url);
    return this.httpClient.post<any>(url, formData, { headers: this.getHeaders(), reportProgress: true, observe: 'events' });
  }
}

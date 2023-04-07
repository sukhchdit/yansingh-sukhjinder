import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudySubjectContact } from '../../models/subject/studysubjectcontact.model';
import { AuthService } from '../account/auth.service';


@Injectable()
export class StudySubjectContactService {
  private readonly _baseApiUrl: string = "api/StudySubjectContact/";

  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";

  constructor(private endpoint: EndPointService, private authService:AuthService) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudySubjectContact>(url);
  }

  //downloadFile(url) {
  //  debugger;
  //  return this.endpoint.download<any>(url);
  //}

  getAll(studySubjectId) {
    const url = this._getAllURL + "?studySubjectId=" + studySubjectId;
    return this.endpoint.get<StudySubjectContact[]>(url);
  }

  save(studySubjectContact: StudySubjectContact) {
    if (studySubjectContact.id <= 0 || studySubjectContact.id == null || studySubjectContact.id == undefined)
      studySubjectContact.createdBy = this.authService.currentUser.id;
    studySubjectContact.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<StudySubjectContact>(studySubjectContact, this._saveURL);
  }

  deleteStudySubjectContact(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

}

import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { StudyVisitTracking } from '../../models/site/studyvisittracking.model';
import { AuthService } from '../account/auth.service';
import { StudyVisitTrackingBasicInfoViewModel } from '../../viewmodels/site/studyvisittrackingbasicinfo.viewmodel';
import { StudyVisitTrackingNote } from '../../models/site/studyvisittrackingnote.model';
import { MomentDatePipe } from '../../pipes/momentdate.pipe';
import { NameCustomIdViewModel } from '../../viewmodels/common/namecustomid.viewmodel';

@Injectable()
export class StudyVisitTrackingService {
  private readonly _baseApiUrl: string = "api/StudyVisitTracking/";
  private readonly _getURL: string = this._baseApiUrl + "Get";
  private readonly _getAllURL: string = this._baseApiUrl + "GetAll";
  private readonly _getAllByParentIdURL: string = this._baseApiUrl + "GetAllByParentId";
  private readonly _getSavedStudySubVisitTrackingURL: string = this._baseApiUrl + "GetSavedStudySubVisitTracking";
  private readonly _getStudyVisitTrackingBasicInfoURL: string = this._baseApiUrl + "GetStudyVisitTrackingBasicInfo";
  private readonly _saveURL: string = this._baseApiUrl + "Save";
  private readonly _markCompletedURL: string = this._baseApiUrl + "MarkCompleted";
  private readonly _saveSubStudyVisitTrackingURL: string = this._baseApiUrl + "SaveSubStudyVisitTracking";
  private readonly _deleteURL: string = this._baseApiUrl + "Delete";
  private readonly _checkScreenNumberExistsURL: string = this._baseApiUrl + "CheckScreenNumberExists";
  private readonly _checkRandomizationNumberExistsURL: string = this._baseApiUrl + "CheckRandomizationNumberExists";
  private readonly _getStudyVisitTrackingNoteURL: string = this._baseApiUrl + "GetStudyVisitTrackingNote";
  private readonly _getAllStudyVisitTrackingNotesURL: string = this._baseApiUrl + "GetAllStudyVisitTrackingNotes";
  private readonly _saveStudyVisitTrackingNoteURL: string = this._baseApiUrl + "SaveStudyVisitTrackingNote";
  private readonly _deleteStudyVisitTrackingNoteURL: string = this._baseApiUrl + "DeleteStudyVisitTrackingNote";
  private readonly _getSubVisitTrackingsURL: string = this._baseApiUrl + "GetSubVisitTrackings";
  private readonly _getUnscheduledVisitTrackingsURL: string = this._baseApiUrl + "GetUnscheduledVisitTrackings";

  constructor(private endpoint: EndPointService, private authService: AuthService, private momentDatePipe: MomentDatePipe) {

  }

  get(id) {
    const url = this._getURL + "?id=" + id;
    return this.endpoint.get<StudyVisitTracking>(url);
  }

  getAll(studyVisitTemplateId) {
    return this.endpoint.get<StudyVisitTracking[]>(this._getAllURL + "?studyVisitTemplateId=" + studyVisitTemplateId);
  }

  getAllByParent(parentId) {
    return this.endpoint.get<StudyVisitTracking[]>(this._getAllByParentIdURL + "?parentId=" + parentId);
  }

  getSavedStudySubVisitTracking(parentId) {
    return this.endpoint.get<StudyVisitTracking[]>(this._getSavedStudySubVisitTrackingURL + "?parentId=" + parentId);
  }

  getStudyVisitTrackingBasicInfo(studyVisitTemplateId, studySubjectId) {
    return this.endpoint.get<StudyVisitTrackingBasicInfoViewModel>(this._getStudyVisitTrackingBasicInfoURL + "?studyVisitTemplateId=" + studyVisitTemplateId + "&studySubjectId=" + studySubjectId);
  }

  save(studyVisitTracking: StudyVisitTracking) {
    if (studyVisitTracking.id <= 0 || studyVisitTracking.id == null || studyVisitTracking.id == undefined) {
      studyVisitTracking.createdBy = this.authService.currentUser.id;
      studyVisitTracking.createdOn = this.momentDatePipe.currentDate;
    }
    else {
      studyVisitTracking.updatedBy = this.authService.currentUser.id;
      studyVisitTracking.updatedOn = this.momentDatePipe.currentDate;
    }
    studyVisitTracking.targetDate = this.momentDatePipe.convertDate(studyVisitTracking.targetDate);
    studyVisitTracking.completionDate = this.momentDatePipe.convertDate(studyVisitTracking.completionDate);

    studyVisitTracking.targetDate = this.momentDatePipe.convertDate(studyVisitTracking.targetDate);
    return this.endpoint.addupdate<StudyVisitTracking>(studyVisitTracking, this._saveURL);
  }

  markCompleted(studyVisitTracking: StudyVisitTracking) {
    return this.endpoint.addupdate<StudyVisitTracking>(studyVisitTracking,this._markCompletedURL);
  }

  saveSubStudyVisitTracking(studyVisitTracking: StudyVisitTracking) {
    if (studyVisitTracking.id <= 0 || studyVisitTracking.id == null || studyVisitTracking.id == undefined) {
      studyVisitTracking.createdBy = this.authService.currentUser.id;
      studyVisitTracking.updatedOn = this.momentDatePipe.currentDate;
    }
    studyVisitTracking.updatedBy = this.authService.currentUser.id;
    studyVisitTracking.updatedOn = this.momentDatePipe.currentDate;

    studyVisitTracking.completionDate = this.momentDatePipe.convertDate(studyVisitTracking.completionDate);
    return this.endpoint.addupdate<StudyVisitTracking>(studyVisitTracking, this._saveSubStudyVisitTrackingURL);
  }

  delete(id: number) {
    const url = this._deleteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  checkScreenNumberExists(id, studySubjectId, screenNumber) {
    const url = this._checkScreenNumberExistsURL + "?id=" + id + "&studySubjectId=" + studySubjectId + "&screenNumber=" + screenNumber;
    return this.endpoint.get<boolean>(url);
  }

  checkRandomizationNumberExists(id, studySubjectId, randomizationNumber) {
    const url = this._checkRandomizationNumberExistsURL + "?id=" + id + "&studySubjectId=" + studySubjectId + "&randomizationNumber=" + randomizationNumber;
    return this.endpoint.get<boolean>(url);
  }

  getStudyVisitTrackingNote(id) {
    const url = this._getStudyVisitTrackingNoteURL + "?id=" + id;
    return this.endpoint.get<StudyVisitTrackingNote>(url);
  }

  getAllStudyVisitTrackingNotes(studyVisitTrackingId) {
    return this.endpoint.get<StudyVisitTrackingNote[]>(this._getAllStudyVisitTrackingNotesURL + "?studyVisitTrackingId=" + studyVisitTrackingId);
  }

  saveStudyVisitTrackingNote(studyVisitTracking: StudyVisitTrackingNote) {
    if (studyVisitTracking.id <= 0 || studyVisitTracking.id == null || studyVisitTracking.id == undefined) {
      studyVisitTracking.createdBy = this.authService.currentUser.id;
      studyVisitTracking.updatedOn = this.momentDatePipe.currentDate;
    }
    studyVisitTracking.updatedBy = this.authService.currentUser.id;
    studyVisitTracking.updatedOn = this.momentDatePipe.currentDate;
    return this.endpoint.addupdate<StudyVisitTrackingNote>(studyVisitTracking, this._saveStudyVisitTrackingNoteURL);
  }

  deleteStudyVisitTrackingNote(id: number) {
    const url = this._deleteStudyVisitTrackingNoteURL + "?id=" + id;
    return this.endpoint.get<boolean>(url);
  }

  GetSubVisitTrackings(studyVisitTrackingId) {
    const url = this._getSubVisitTrackingsURL + "?studyVisitTrackingId=" + studyVisitTrackingId;
    return this.endpoint.get<NameCustomIdViewModel[]>(url);
  }

  getUnscheduledVisitTrackings(parentId) {
    const url = this._getUnscheduledVisitTrackingsURL + "?parentId=" + parentId;
    return this.endpoint.get<NameCustomIdViewModel[]>(url);
  }
}

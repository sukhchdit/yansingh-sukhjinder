import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { iFrameStudyViewModel } from '../../viewmodels/iframe/iframestudy.viewmodel';
import { iFrameSiteViewModel } from '../../viewmodels/iframe/iframesite.viewmodel';
import { SponsorInfo } from '../../models/sponsor/sponsorinfo.model';
import { SponsorStudyInfo } from '../../models/sponsor/sponsorstudyinfo.model';
import { StudySubject } from '../../models/subject/studysubject.model';
import { SiteInfo } from '../../models/site/siteinfo.model';

@Injectable()
export class SubjectRecruitmentService {
  private readonly _baseApiURL: string = "api/iframe/subjectrecruitment/";  
  private readonly _getSiteListURL: string = this._baseApiURL + "GetSiteList";
  private readonly _getStudyListURL: string = this._baseApiURL + "GetStudyList";
  private readonly _getSponsorURL: string = this._baseApiURL + "GetSponsor";
  private readonly _getSponsorStudyInfoByStudyIdURL: string = this._baseApiURL + "GetSponsorStudyInfoByStudyId";
  private readonly _createSubjectURL: string = this._baseApiURL + "CreateSubject";
  private readonly _getSiteInfoURL: string = this._baseApiURL + "GetSiteInfo";
  

  constructor(private endpoint: EndPointService) {

  }

  getSiteList() {
    return this.endpoint.get<iFrameSiteViewModel[]>(this._getSiteListURL);
  }

  getStudyList(siteInfoId) {
    return this.endpoint.get<iFrameStudyViewModel[]>(this._getStudyListURL + '?siteInfoId=' + siteInfoId);
  }

  getSponsor(id) {
    return this.endpoint.get<SponsorInfo>(this._getSponsorURL + '?id=' + id);
  }

  getSponsorStudyInfoByStudyId(studyId) {
    return this.endpoint.get<SponsorStudyInfo>(this._getSponsorStudyInfoByStudyIdURL + '?studyId=' + studyId);
  }

  createSubject(subject: StudySubject) {
    return this.endpoint.addupdate<StudySubject>(subject, this._createSubjectURL);
  }

  getSiteInfo(siteId) {
    return this.endpoint.get<SiteInfo>(this._getSiteInfoURL + '?siteId=' + siteId);
  }
 
}

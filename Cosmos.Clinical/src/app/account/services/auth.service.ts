import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DBkeys } from './db-Keys';
import { JwtHelper } from './jwt-helper';
import { LocalStoreManager } from './local-store-manager.service';
import { OrganizationInfo } from '../../models/organization/organizationinfo.model';
import { LoginResponse, AccessToken } from '../../models/account/login-response.model';
import { PermissionValues } from '../../models/account/permission.model';
import { SponsorInfo } from '../../models/sponsor/sponsorinfo.model';
import { SiteInfo } from '../../models/site/siteinfo.model';
import { InvestigatorInfo } from '../../models/site/investigator/investigatorinfo.model';
import { CurrentUserViewModel } from '../../models/account/currentuserviewmodel.model';
import { CroInfo } from '../../models/cro/croinfo.model';
import { MonitorInfo } from '../../models/monitor/monitorinfo.model';
import { StudyUserInterfaceModel } from '../../models/userrrolemanagement/studyuserinterface.model';
//import { UserInterface } from '../../models/userrrolemanagement/userinterface.model';
//import { StudyUserInterfaceModel } from '../../models/userrrolemanagement/studyuserinterface.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() userSettingChanged: EventEmitter<CurrentUserViewModel> = new EventEmitter();
  @Output() organizationChanged: EventEmitter<OrganizationInfo> = new EventEmitter();
  @Output() sponsorChanged: EventEmitter<SponsorInfo> = new EventEmitter();
  @Output() croChanged: EventEmitter<CroInfo> = new EventEmitter();
  @Output() monitorChanged: EventEmitter<MonitorInfo> = new EventEmitter();
  @Output() siteChanged: EventEmitter<SiteInfo> = new EventEmitter();
  @Output() investigatorChanged: EventEmitter<InvestigatorInfo> = new EventEmitter();
  @Output() siteListChanged: EventEmitter<any[]> = new EventEmitter();
  @Output() investigatorListChanged: EventEmitter<any[]> = new EventEmitter();
  @Output() accounTypeChangedChanged: EventEmitter<any> = new EventEmitter();
  @Output() sponsorStudyInfoIdChanged: EventEmitter<number> = new EventEmitter();
  @Output() sponsorSiteStudyCdaInvitationIdChanged: EventEmitter<number> = new EventEmitter();
  @Output() mainLoadingIndicatorChanged: EventEmitter<boolean> = new EventEmitter();

  private previousIsLoggedInCheck = false;
  private _loginStatus = new Subject<boolean>();

  constructor(private localStorage: LocalStoreManager, private router: Router) {
    this.initializeLoginStatus();
  }

  private initializeLoginStatus() {
    this.localStorage.getInitEvent().subscribe(() => {
      this.reevaluateLoginStatus();
    });
  }

  private reevaluateLoginStatus(currentUser?: CurrentUserViewModel) {
    let user = currentUser || this.localStorage.getDataObject<CurrentUserViewModel>(DBkeys.CURRENT_USER);
    let isLoggedIn = user != null;

    if (this.previousIsLoggedInCheck != isLoggedIn) {
      setTimeout(() => {
        this._loginStatus.next(isLoggedIn);
      });
    }

    this.previousIsLoggedInCheck = isLoggedIn;
  }

  public processLoginResponse(response: LoginResponse, rememberMe: boolean) {
    rememberMe = true;
    let accessToken = response.access_token;
    let userStudies = response.user_studies;

    if (accessToken == null) {
      throw new Error("Received accessToken was empty");
    }

    let refreshToken = response.refresh_token || this.refreshToken;
    let expiresIn = response.expires_in;

    let tokenExpiryDate = new Date();
    tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);

    let accessTokenExpiry = tokenExpiryDate;

    let jwtHelper = new JwtHelper();

    let decodedAccessToken = <AccessToken>jwtHelper.decodeToken(response.access_token);
    let permissions: PermissionValues[] = Array.isArray(decodedAccessToken.permission) ? decodedAccessToken.permission : [decodedAccessToken.permission];
    //let userStudies = JSON.parse(decodedAccessToken.userStudies);

    let user = new CurrentUserViewModel();
    user.email = decodedAccessToken.email;
    user.phone = decodedAccessToken.phone;
    user.name = decodedAccessToken.given_name;
    user.id = decodedAccessToken.unique_name;
    user.firstName = decodedAccessToken.firstName;
    user.lastName = decodedAccessToken.lastName;
    user.organizationContactId = decodedAccessToken.organizationContactId;
    user.userRole = decodedAccessToken.role;
    user.lastLoginDate = decodedAccessToken.lastLoginDate;
    user.role = JSON.parse(decodedAccessToken.organizationContactRole);

    this.saveUserDetails(user, permissions, userStudies, accessToken, refreshToken, accessTokenExpiry, rememberMe);

    this.reevaluateLoginStatus(user);
  }

  private saveUserDetails(user: CurrentUserViewModel, permissions: PermissionValues[], userStudies: any[], accessToken: string, refreshToken: string, expiresIn: Date, rememberMe: boolean) {
    if (rememberMe) {
      this.localStorage.savePermanentData(accessToken, DBkeys.ACCESS_TOKEN);
      this.localStorage.savePermanentData(refreshToken, DBkeys.REFRESH_TOKEN);
      this.localStorage.savePermanentData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
      this.localStorage.savePermanentData(permissions, DBkeys.USER_PERMISSIONS);
      this.localStorage.savePermanentData(user, DBkeys.CURRENT_USER);
      this.localStorage.savePermanentData(userStudies, DBkeys.USER_STUDIES);
    }
    else {
      this.localStorage.saveSyncedSessionData(accessToken, DBkeys.ACCESS_TOKEN);
      this.localStorage.saveSyncedSessionData(refreshToken, DBkeys.REFRESH_TOKEN);
      this.localStorage.saveSyncedSessionData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
      this.localStorage.saveSyncedSessionData(permissions, DBkeys.USER_PERMISSIONS);
      this.localStorage.saveSyncedSessionData(user, DBkeys.CURRENT_USER);
      this.localStorage.saveSyncedSessionData(userStudies, DBkeys.USER_STUDIES);
    }

    this.localStorage.savePermanentData(rememberMe, DBkeys.REMEMBER_ME);
  }

  addNewStudy(newStudy: StudyUserInterfaceModel) {
    var userStudies = this.userStudies;
    userStudies.push(newStudy);
    this.localStorage.saveSyncedSessionData(userStudies, DBkeys.USER_STUDIES);
  }

  updateCurrentUserRole(currentUser) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    if (rememberMe)
      this.localStorage.savePermanentData(currentUser, DBkeys.CURRENT_USER);
    else
      this.localStorage.saveSyncedSessionData(currentUser, DBkeys.CURRENT_USER);
  }

  saveOrganizationDetails(organization: OrganizationInfo) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    this.localStorage.deleteData(DBkeys.CURRENT_ORGANIZATION);

    if (rememberMe)
      this.localStorage.savePermanentData(organization, DBkeys.CURRENT_ORGANIZATION);
    else
      this.localStorage.saveSyncedSessionData(organization, DBkeys.CURRENT_ORGANIZATION);

    this.organizationChanged.emit(organization);
  }

  saveSiteList(siteList: any[]) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    this.localStorage.deleteData(DBkeys.SITELIST);

    if (rememberMe)
      this.localStorage.savePermanentData(siteList, DBkeys.SITELIST);
    else
      this.localStorage.saveSyncedSessionData(siteList, DBkeys.SITELIST);

    this.siteListChanged.emit(siteList);
  }

  saveInvestigatorList(investigatorList: any[]) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    this.localStorage.deleteData(DBkeys.INVESTIGATORLIST);

    if (rememberMe)
      this.localStorage.savePermanentData(investigatorList, DBkeys.INVESTIGATORLIST);
    else
      this.localStorage.saveSyncedSessionData(investigatorList, DBkeys.INVESTIGATORLIST);

    this.investigatorListChanged.emit(investigatorList);
  }

  saveSponsorDetails(sponsor: SponsorInfo) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    this.localStorage.deleteData(DBkeys.CURRENT_SPONSOR);

    if (rememberMe)
      this.localStorage.savePermanentData(sponsor, DBkeys.CURRENT_SPONSOR);
    else
      this.localStorage.saveSyncedSessionData(sponsor, DBkeys.CURRENT_SPONSOR);

    this.sponsorChanged.emit(sponsor);
  }

  saveCRODetails(cro: CroInfo) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    this.localStorage.deleteData(DBkeys.CURRENT_CRO);

    if (rememberMe)
      this.localStorage.savePermanentData(cro, DBkeys.CURRENT_CRO);
    else
      this.localStorage.saveSyncedSessionData(cro, DBkeys.CURRENT_CRO);

    this.croChanged.emit(cro);
  }

  saveMonitorDetails(monitor: MonitorInfo) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    this.localStorage.deleteData(DBkeys.CURRENT_MONITOR);

    if (rememberMe)
      this.localStorage.savePermanentData(monitor, DBkeys.CURRENT_MONITOR);
    else
      this.localStorage.saveSyncedSessionData(monitor, DBkeys.CURRENT_MONITOR);

    this.monitorChanged.emit(monitor);
  }

  saveSiteDetails(site: SiteInfo) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    this.localStorage.deleteData(DBkeys.CURRENT_SITE);

    if (rememberMe)
      this.localStorage.savePermanentData(site, DBkeys.CURRENT_SITE);
    else
      this.localStorage.saveSyncedSessionData(site, DBkeys.CURRENT_SITE);

    this.siteChanged.emit(site);
  }

  saveInvestigatorDetails(investigator: InvestigatorInfo) {
    var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
    this.localStorage.deleteData(DBkeys.CURRENT_INVESTIGATOR);

    if (rememberMe)
      this.localStorage.savePermanentData(investigator, DBkeys.CURRENT_INVESTIGATOR);
    else
      this.localStorage.saveSyncedSessionData(investigator, DBkeys.CURRENT_INVESTIGATOR);

    this.investigatorChanged.emit(investigator);
  }

  saveAccountType(type) {
    if (type) {
      var rememberMe = this.localStorage.getData(DBkeys.REMEMBER_ME);
      this.localStorage.deleteData(DBkeys.ACCOUNTTYPE);

      if (rememberMe)
        this.localStorage.savePermanentData(type, DBkeys.ACCOUNTTYPE);
      else
        this.localStorage.saveSyncedSessionData(type, DBkeys.ACCOUNTTYPE);

      this.accounTypeChangedChanged.emit(type);
    }
  }

  logout(): void {
    this.localStorage.deleteData(DBkeys.ACCESS_TOKEN);
    this.localStorage.deleteData(DBkeys.REFRESH_TOKEN);
    this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);
    this.localStorage.deleteData(DBkeys.USER_PERMISSIONS);
    this.localStorage.deleteData(DBkeys.CURRENT_USER);
    this.localStorage.deleteData(DBkeys.User_Session);
    this.localStorage.deleteData(DBkeys.CURRENT_ORGANIZATION);
    this.localStorage.deleteData(DBkeys.INFOLIST);
    this.localStorage.deleteData(DBkeys.CURRENT_SITE);
    this.localStorage.deleteData(DBkeys.CURRENT_INVESTIGATOR);
    this.localStorage.deleteData(DBkeys.CURRENT_SPONSOR);
    this.localStorage.deleteData(DBkeys.SITELIST);
    this.localStorage.deleteData(DBkeys.INVESTIGATORLIST);
    this.localStorage.deleteData(DBkeys.CURRENT_CRO);
    this.localStorage.deleteData(DBkeys.CURRENT_MONITOR);
    this.localStorage.deleteData(DBkeys.USER_STUDIES);

    this.reevaluateLoginStatus();
    this.router.navigate(['/']);
  }

  get accessToken(): string {
    this.reevaluateLoginStatus();
    return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
  }

  get refreshToken(): string {
    this.reevaluateLoginStatus();
    return this.localStorage.getData(DBkeys.REFRESH_TOKEN);
  }

  get organization(): OrganizationInfo {
    var model = this.localStorage.getData(DBkeys.CURRENT_ORGANIZATION);
    return model;
  }

  get siteList(): any[] {
    var list = this.localStorage.getData(DBkeys.SITELIST);
    return list;
  }

  get investigatorList(): any[] {
    var list = this.localStorage.getData(DBkeys.INVESTIGATORLIST);
    return list;
  }

  get sponsor(): SponsorInfo {
    var model = this.localStorage.getData(DBkeys.CURRENT_SPONSOR);
    return model;
  }

  get cro(): CroInfo {
    var model = this.localStorage.getData(DBkeys.CURRENT_CRO);
    return model;
  }

  get site(): SiteInfo {
    var model = this.localStorage.getData(DBkeys.CURRENT_SITE);
    return model;
  }

  get monitor(): MonitorInfo {
    var model = this.localStorage.getData(DBkeys.CURRENT_MONITOR);
    return model;
  }

  get investigator(): InvestigatorInfo {
    var model = this.localStorage.getData(DBkeys.CURRENT_INVESTIGATOR);
    return model;
  }

  get accountType(): string {
    return this.localStorage.getData(DBkeys.ACCOUNTTYPE);
  }

  get currentUser(): CurrentUserViewModel {
    let user = this.localStorage.getDataObject<CurrentUserViewModel>(DBkeys.CURRENT_USER);
    this.reevaluateLoginStatus(user);

    return user;
  }

  get userStudies(): StudyUserInterfaceModel[] {
    let userStudies = this.localStorage.getDataObject<StudyUserInterfaceModel[]>(DBkeys.USER_STUDIES);
    return userStudies;
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  set sponsorStudyInfoId(studyId) {
    this.localStorage.savePermanentData(studyId, DBkeys.SPONSOR_STUDYINFO_ID);
    this.sponsorStudyInfoIdChanged.emit(studyId);
  }

  get sponsorStudyInfoId(): number {
    let sponsorStudyInfoId = this.localStorage.getDataObject<number>(DBkeys.SPONSOR_STUDYINFO_ID);
    return sponsorStudyInfoId;
  }

  set mainLoadingIndicator(mainloadingindicator) {
    this.localStorage.savePermanentData(mainloadingindicator, DBkeys.MAIN_LOADING_INDICATOR);
    this.mainLoadingIndicatorChanged.emit(mainloadingindicator);
  }

  get mainLoadingIndicator(): boolean {
    let loadingIndicator = this.localStorage.getDataObject<boolean>(DBkeys.MAIN_LOADING_INDICATOR);
    return loadingIndicator;
  }

  set sponsorSiteStudyCdaInvitationId(sponsorSiteStudyCdaInvitationId) {
    this.localStorage.savePermanentData(sponsorSiteStudyCdaInvitationId, DBkeys.SPONSOR_SITE_STUDY_CDA_INVITATION_ID);
    this.sponsorSiteStudyCdaInvitationIdChanged.emit(sponsorSiteStudyCdaInvitationId);
  }

  get sponsorSiteStudyCdaInvitationId(): number {
    let sponsorSiteStudyCdaInvitationId = this.localStorage.getDataObject<number>(DBkeys.SPONSOR_SITE_STUDY_CDA_INVITATION_ID);
    return sponsorSiteStudyCdaInvitationId;
  }

  updateUserInfo(user: CurrentUserViewModel) {
    if (Boolean(this.localStorage.getData(DBkeys.REMEMBER_ME)))
      this.localStorage.savePermanentData(user, DBkeys.CURRENT_USER);
    else
      this.localStorage.saveSyncedSessionData(user, DBkeys.CURRENT_USER);
    this.userSettingChanged.emit(user);
  }


}

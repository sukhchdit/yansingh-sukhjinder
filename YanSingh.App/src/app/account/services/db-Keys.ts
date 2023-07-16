
import { Injectable } from '@angular/core';

@Injectable()
export class DBkeys {

  public static readonly CURRENT_ORGANIZATION = "current_organization";
  public static readonly CURRENT_SITE = "current_site";
  public static readonly CURRENT_INVESTIGATOR = "current_investigator";
  public static readonly CURRENT_SPONSOR = "current_sponsor";
  public static readonly CURRENT_CRO = "current_cro";
  public static readonly CURRENT_MONITOR = "current_monitor";
  public static readonly SITELIST = "site_list";
  public static readonly INVESTIGATORLIST = "investigator_list";
  public static readonly ACCOUNTTYPE = "account_type";
   

  public static readonly CURRENT_USER = "current_user";
  public static readonly USER_PERMISSIONS = "user_permissions";
  public static readonly ACCESS_TOKEN = "access_token";
  public static readonly REFRESH_TOKEN = "refresh_token";
  public static readonly TOKEN_EXPIRES_IN = "expires_in";
  public static readonly User_Session = "user_session";
  public static readonly REMEMBER_ME = "remember_me";
  public static readonly INFOLIST = "info_list";

  public static readonly LANGUAGE = "language";
  public static readonly HOME_URL = "home_url";
  public static readonly THEME_ID = "themeId";
  public static readonly SHOW_DASHBOARD_STATISTICS = "show_dashboard_statistics";
  public static readonly SHOW_DASHBOARD_NOTIFICATIONS = "show_dashboard_notifications";
  public static readonly SHOW_DASHBOARD_TODO = "show_dashboard_todo";
  public static readonly SHOW_DASHBOARD_BANNER = "show_dashboard_banner";

  public static readonly USER_STUDIES = "user_studies";
  public static readonly SPONSOR_STUDYINFO_ID = "sponsor_studyinfo_id";
  public static readonly SPONSOR_SITE_STUDY_CDA_INVITATION_ID = "sponsor_site_study_cda_invitation_id";

  public static readonly MAIN_LOADING_INDICATOR = "main_loading_indicator";
}

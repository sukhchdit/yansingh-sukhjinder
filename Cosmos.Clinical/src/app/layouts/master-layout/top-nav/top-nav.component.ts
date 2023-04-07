import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../account/services/auth.service';
import { InvestigatorService } from '../../../core/services/site/investigator/investigator.service';
import { SiteService } from '../../../core/services/site/site.service';
import { OrganizationContact } from '../../../models/organization/organizationcontact.model';
import { StudyIdTitleViewModel } from '../../../models/userrrolemanagement/studyidtitleview.model';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  accountValues: any[] = [];
  user = new OrganizationContact();
  accountType: string;
  accountValue: number;
  userRole: string;
  lastLoginAt: string;
  currentUser: string;
  studies: StudyIdTitleViewModel[] = [];
  studyId: number;

  practice: any;
  loaction: any;
  status: any;
  page: any;
  selectedSite = 'Select Site';
  selectedStudy = 'Select Study';
  practiceList = ['Atlanta Clinical Trials', 'Sourtheast Clinical Trials', 'Atlantic', 'Atlantic1', 'Atlantic2'];
  locationList = ['Phase IIb/III NASH with Fibrosis  (DA671C01236)', 'TestS1 (01)', 'TestS2 (BC-1214)', 'bbb (dbdb)', 'TestS3 (lik52)'];
  statusList = ['Rejected', 'Completed'];
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedStatus = 'Rejected';
  selectedPageNum = '20';
  selectedDropdown = 'none';

  showProfilePopup = false;

  constructor(private authService: AuthService, private siteService: SiteService, private investigatorService: InvestigatorService, public router: Router) {
  }

  ngOnInit() {

    this.populateTopDropdownList();
  }




  openDropdown(ele: any) {
    if (this.selectedDropdown == ele)
      this.selectedDropdown = 'none';
    else
      this.selectedDropdown = ele;
  }

  closeDropdown(ele: any) {
    this.selectedDropdown = 'none';
  }

  selectDropdownValue(dd: any, model: any, value: any) {
    this.selectedDropdown = 'none';
  }

  logout() {
    this.authService.logout();
  }

  populateTopDropdownList() {
    if (this.authService.isLoggedIn) {
      this.lastLoginAt = this.authService.currentUser.lastLoginDate != "" ? "Last Login at: " + this.authService.currentUser.lastLoginDate : "";
      this.currentUser = this.authService.currentUser.name;
      this.user.name = this.authService.currentUser.name;
      this.userRole = this.authService.currentUser.userRole.toString().toLowerCase();
      this.studies = [];

      if (this.userRole == "siteinvestigatoradmin" || this.userRole == "investigatoradmin" || this.userRole == 'siteuser' || this.userRole == 'investigator' || this.userRole == "siteadmin" || this.userRole == "12" || this.userRole == "14") {
        if (this.authService.siteList && this.authService.siteList.length > 0) {
          this.accountType = "site";
          this.accountValues = this.authService.siteList;
          if (this.accountValues.length > 0) {
            this.accountValue = this.authService.site.id;
            this.selectedSite = this.authService.site.name;
          }
          else {
            this.accountValue = 0;
            this.selectedSite = 'Select Site';
          }
        }
        else if (this.authService.investigatorList && this.authService.investigatorList.length > 0) {
          this.accountType = "investigator";
          this.accountValues = this.authService.investigatorList;
          if (this.accountValues && this.accountValues.length > 0) {
            this.accountValue = this.authService.investigator.id;
            this.selectedSite = 'Dr ' + this.authService.investigator.lastName + '' + this.authService.investigator.firstName;
          }
          else {
            this.accountValue = 0;
            this.selectedSite = 'Select Investigator';
          }
        }
        else if (this.userRole == "siteadmin") {
          this.accountType = "site";
        }
        else if (this.userRole == "investigatoradmin") {
          this.accountType = "investigator";
        }
      }
      else if (this.authService.currentUser.userRole.toString() == "sponsoradmin" || this.authService.currentUser.userRole.toString() == "sponsoruser") {
        this.accountType = "sponsor";
      }
      else if (this.authService.currentUser.userRole.toString() == "croadmin" || this.authService.currentUser.userRole.toString() == "crouser") {
        this.accountType = "sponsor";
      }
      else if (this.authService.currentUser.userRole.toString() == "superadmin")
        this.accountType = "superAdmin";
      else if (this.authService.currentUser.userRole.toString() == "superuser")
        this.accountType = "superAdmin";
      this.authService.saveAccountType(this.accountType);

      this.setStudyList();

      if (this.studies && this.studies.length > 0) {
        if (this.accountValue) {
          if (this.authService.sponsorStudyInfoId && this.authService.sponsorStudyInfoId > 0) {
            var study = this.studies.find(x => x != null && x.sponsorStudyInfoId == this.authService.sponsorStudyInfoId && x.siteInfoId && x.siteInfoId == this.accountValue);
            if (study && study.sponsorStudyInfoId > 0) {
              this.studyId = this.authService.sponsorStudyInfoId;
              if (study && study.sponsorSiteStudyCdaInvitationId)
                this.authService.sponsorSiteStudyCdaInvitationId = study.sponsorSiteStudyCdaInvitationId;
              else
                this.authService.sponsorSiteStudyCdaInvitationId = 0;
            }
            else {
              this.studyId = this.studies[0].sponsorStudyInfoId;
              this.authService.sponsorStudyInfoId = this.studyId;
              if (this.studies && this.studies[0] && this.studies[0].sponsorSiteStudyCdaInvitationId)
                this.authService.sponsorSiteStudyCdaInvitationId = this.studies[0].sponsorSiteStudyCdaInvitationId;
            }
          }
          else {
            this.studyId = this.studies[0].sponsorStudyInfoId;
            this.authService.sponsorStudyInfoId = this.studyId;
            if (this.studies && this.studies[0])
              this.authService.sponsorSiteStudyCdaInvitationId = this.studies[0].sponsorSiteStudyCdaInvitationId;
            else
              this.authService.sponsorSiteStudyCdaInvitationId = 0;
          }

        }
        else {
          if (this.authService.sponsorStudyInfoId && this.authService.sponsorStudyInfoId > 0) {
            var study = this.studies.find(x => x != null && x.sponsorStudyInfoId == this.authService.sponsorStudyInfoId);
            if (study && study.sponsorStudyInfoId > 0) {
              this.studyId = this.authService.sponsorStudyInfoId;
              if (study && study.sponsorSiteStudyCdaInvitationId)
                this.authService.sponsorSiteStudyCdaInvitationId = study.sponsorSiteStudyCdaInvitationId;
              else
                this.authService.sponsorSiteStudyCdaInvitationId = 0;

            }
            else {
              this.studyId = this.studies[0].sponsorStudyInfoId;
              this.authService.sponsorStudyInfoId = this.studyId;
              if (study && study.sponsorSiteStudyCdaInvitationId) {
                this.authService.sponsorSiteStudyCdaInvitationId = study.sponsorSiteStudyCdaInvitationId;
              }
              else {
                this.authService.sponsorSiteStudyCdaInvitationId = 0;
              }
            }
          }
          else {
            this.studyId = this.studies[0].sponsorStudyInfoId;
            this.authService.sponsorStudyInfoId = this.studyId;
            this.authService.sponsorSiteStudyCdaInvitationId = this.studies[0].sponsorSiteStudyCdaInvitationId;
          }
        }

      }

    }
    else
      this.logout();

    this.authService.sponsorSiteStudyCdaInvitationIdChanged.subscribe(invitationId => {
      var study = this.studies.find(x => x.sponsorSiteStudyCdaInvitationId == invitationId);
      if (!study || study.sponsorStudyInfoId <= 0) {
        this.studies = [];
        if (this.accountValue) {
          this.authService.userStudies.forEach(study => {
            if (study && study.sponsorStudy && this.accountValue == study.sponsorStudy.siteInfoId) {
              this.studies.push(study.sponsorStudy);
            }
          });
        }
        else {
          this.authService.userStudies.forEach(study => {
            if (study && study.sponsorStudy) {
              this.studies.push(study.sponsorStudy);
            }
          });
        }

        var study = this.studies.find(x => x.sponsorSiteStudyCdaInvitationId == this.authService.sponsorSiteStudyCdaInvitationId);
        if (study)
          this.studyId = study.sponsorStudyInfoId;
        else
          this.studyId = 0;
      }
    });
  }

  setStudyList() {
    this.studies = [];
    if (this.accountValue) {
      this.authService.userStudies.forEach(study => {
        if (study && study.sponsorStudy && this.accountValue == study.sponsorStudy.siteInfoId) {
          this.studies.push(study.sponsorStudy);
        }
      });
    }
    else {
      this.authService.userStudies.forEach(study => {
        if (study && study.sponsorStudy) {
          this.studies.push(study.sponsorStudy);
        }
      });
    }

    if (this.studies && this.studies.length > 0) {
      this.studyId = this.studies[0].sponsorStudyInfoId;
      this.selectedStudy = this.studies[0].title + ' (' + this.studies[0].protocolNumber + ')';
    }
    else {
      this.studyId = 0;
      this.selectedStudy = 'Select Study';
    }
  }

  onStudyChanged(study) {
    if (study) {
      this.studyId = study.sponsorStudyInfoId;
      this.selectedStudy = study.title + ' (' + study.protocolNumber + ')';
      this.authService.mainLoadingIndicator = true;
      if (this.userRole == "siteinvestigatoradmin" || this.userRole == "investigatoradmin" || this.userRole == "siteadmin" || this.userRole == "12" || this.userRole == "14") {
        if (this.authService && this.authService.userStudies && this.studyId && this.studyId > 0) {
          this.authService.sponsorSiteStudyCdaInvitationId = this.authService.userStudies.find(x => x.sponsorStudy.sponsorStudyInfoId == this.studyId).sponsorStudy.sponsorSiteStudyCdaInvitationId;
          this.authService.sponsorStudyInfoId = this.studyId;
          //this.authService.mainLoadingIndicator = false;
        }
        else {
          this.authService.sponsorStudyInfoId = this.studyId;
          //this.authService.mainLoadingIndicator = false;
        }
      }
      else if (this.authService.currentUser.userRole.toString() == "sponsorAdmin") {
        this.authService.sponsorStudyInfoId = this.studyId;
        //this.authService.mainLoadingIndicator = false;
      }
      else {
        this.authService.mainLoadingIndicator = false;
      }
    }
    this.selectedDropdown = 'none';
  }

  ngAfterContentChecked() {
    if (this.userRole == "siteinvestigatoradmin" || this.userRole == "investigatoradmin" || this.userRole == "siteadmin" || this.userRole == "12" || this.userRole == "14") {
      if (this.accountType == 'site' && this.authService.siteList && this.authService.siteList.length > 0) {
        this.accountValues = this.authService.siteList;
        if (this.accountValues && this.accountValues.length == 1) {
          this.accountValue = this.accountValues[0].id;
          this.selectedSite = this.accountValues[0].name;
          this.authService.sponsorSiteStudyCdaInvitationId = this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue).sponsorStudy.sponsorSiteStudyCdaInvitationId;
          this.authService.sponsorStudyInfoId = this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue).sponsorStudy.sponsorStudyInfoId;
        }
      }
      else if (this.accountType == 'investigator' && this.authService.investigatorList && this.authService.investigatorList.length > 0) {
        this.accountValues = this.authService.investigatorList;
        if (this.accountValues && this.accountValues.length == 1) {
          this.accountValue = this.accountValues[0].id;
          this.selectedSite = this.accountValues[0].name;
        }
      }
      this.authService.saveAccountType(this.accountType);
    }

    if (this.authService.sponsorStudyInfoIdChanged) {
      this.authService.sponsorStudyInfoIdChanged.subscribe(x => {
        this.studyId = x;
      });
    }
  }

  onAccountValueChanged(val) {
    if (val) {
      this.accountValue = val.id;
      this.selectedSite = val.name;
      if (this.accountType == 'investigator') {
        this.getInvestigatorDetails();
      }
      else if (this.accountType == 'site') {
        this.getSiteDetails();
      }
    }
    this.selectedDropdown = 'none';
  }

  getSiteDetails() {
    this.siteService.get(this.accountValue).subscribe(response => {
      if (response) {
        this.authService.saveSiteDetails(response);
        this.router.navigate(['/dashboard']);
      }
    });
    if (this.authService.userStudies && this.authService.userStudies.length > 0) {
      this.setStudyList();
      if (this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue) && this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue).sponsorStudy) {
        this.authService.sponsorSiteStudyCdaInvitationId = this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue).sponsorStudy.sponsorSiteStudyCdaInvitationId;
        this.authService.sponsorStudyInfoId = this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue).sponsorStudy.sponsorStudyInfoId;
      }
      else {
        this.authService.sponsorSiteStudyCdaInvitationId = 0;
        this.authService.sponsorStudyInfoId = 0;
      }
    }
  }

  getInvestigatorDetails() {
    this.investigatorService.get(this.accountValue).subscribe(response => {
      if (response) {
        this.authService.saveInvestigatorDetails(response);
        this.router.navigate(['/investigatordashboard']);
      }
    });

    if (this.authService.userStudies && this.authService.userStudies.length > 0) {
      this.setStudyList();
      if (this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue) && this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue).sponsorStudy) {
        this.authService.sponsorSiteStudyCdaInvitationId = this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue).sponsorStudy.sponsorSiteStudyCdaInvitationId;
        this.authService.sponsorStudyInfoId = this.authService.userStudies.find(x => x.sponsorStudy.siteInfoId == this.accountValue).sponsorStudy.sponsorStudyInfoId;
      }
      else {
        this.authService.sponsorSiteStudyCdaInvitationId = 0;
        this.authService.sponsorStudyInfoId = 0;
      }
    }
  }

  onAccountTypeChange() {
    this.authService.saveAccountType(this.accountType);
    if (this.accountType == "site") {
      this.authService.saveAccountType("site");
      if (this.authService.siteList != null && this.authService.siteList != undefined && this.authService.siteList.length > 0) {
        this.accountValues = this.authService.siteList;
        if (this.accountValues && this.accountValues.length > 0) {
          this.accountValue = this.accountValues[0].id;
          this.selectedSite = this.accountValues[0].name;
        }
        this.onAccountValueChanged(this.accountValue);
      }
      else {
        this.accountValues = [];
        this.accountValue = null;
        this.selectedSite = 'Select Site';
      }
    }
    else if (this.accountType == "investigator") {
      this.authService.saveAccountType("investigator");
      if (this.authService.investigatorList != null && this.authService.investigatorList != undefined && this.authService.investigatorList.length > 0) {
        this.accountValues = this.authService.investigatorList;
        if (this.accountValues && this.accountValues.length > 0) {
          this.accountValue = this.accountValues[0].id;
          this.selectedSite = this.accountValues[0].name;
        }
        this.onAccountValueChanged(this.accountValue);
      }
      else {
        this.accountValues = [];
        this.accountValue = null;
        this.selectedSite = 'Select Investigator';
      }
    }
  }

  navigateToProfilePage() {
    this.router.navigate(['/products']);
  }

}

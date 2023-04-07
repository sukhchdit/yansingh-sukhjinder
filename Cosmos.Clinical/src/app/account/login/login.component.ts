import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import * as fs from '@fortawesome/free-solid-svg-icons';
import { User, UserStatus } from 'src/app/models/account/user.model';

import { LoginViewModel } from 'src/app/models/account/loginviewmodel.model';
import { EventStatus } from 'src/app/models/calendar/calendareventparticipent.model';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { SiteService } from 'src/app/core/services/site/site.service';
import { OrganizationService } from 'src/app/core/services/organization/organization.service';
import { MonitorService } from 'src/app/core/services/monitor/monitor.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { InvestigatorService } from 'src/app/core/services/site/investigator/investigator.service';
import { SponsorService } from 'src/app/core/services/sponsor/sponsor.service';
import { CroService } from 'src/app/core/services/cro/cro.service';
import { CalendarEventService } from 'src/app/core/services/calendar/calendarevent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  obj = new User();
  isloader = false;
  returnUrl: string = '';
  email: string = '';
  emailFieldError = false;
  passwordFieldError = false;

  fs = fs;

  constructor(private service: LoginService, public router: Router, private authService: AuthService, private route: ActivatedRoute,
    private organizationService: OrganizationService, private bnIdle: BnNgIdleService, private siteService: SiteService,
    private monitorService: MonitorService, private commonService: CommonService,
    private investigatorService: InvestigatorService, private sponsorService: SponsorService, private croService: CroService, private calendarEventService: CalendarEventService) {
    this.obj.isDisabled = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
      var code = params.code;
      this.confirmemail(this.email, code);
      var eventStatus = params.action;
      var eventParticipentId = params.id;
      var eventId = params.eventId;
      this.returnUrl = params.returnUrl;

      this.updateEventParticipentEventStatus(eventParticipentId, eventStatus, eventId);

    });

    if (this.authService.isLoggedIn && this.authService.currentUser) {
      if (this.authService.currentUser.userRole.toString() == "superAdmin")
        this.router.navigate(['/admin/dashboard']);
      else if (this.authService.currentUser.userRole.toString() == "superUser")
        this.router.navigate(['/superuser/dashboard']);
      else if (this.authService.currentUser.userRole.toString() == "investigatorAdmin" || this.authService.currentUser.userRole.toString() == "investigatorUser")
        this.router.navigate(['/investigator/dashboard']);
      else if (this.authService.currentUser.userRole.toString() == "siteAdmin" || this.authService.currentUser.userRole.toString() == "siteUser" || this.authService.currentUser.userRole.toString() == "investigator") {
        if (this.email != null && this.email != undefined && this.email.trim() != "" && this.returnUrl != null && this.returnUrl != undefined && this.returnUrl.trim() != "") {
          if (this.authService.currentUser.email == this.email)
            this.router.navigate([this.returnUrl]);
          else
            this.obj.email = this.email;
        } else {
          this.router.navigate(['/site/dashboard']);
        }
      }
      else if (this.authService.currentUser.userRole.toString() == "sponsorAdmin" || this.authService.currentUser.userRole.toString() == "sponsorUser")
        this.router.navigate(['/sponsor/dashboard']);
      else if (this.authService.currentUser.userRole.toString() == "croAdmin" || this.authService.currentUser.userRole.toString() == "croUser")
        this.router.navigate(['/cro/dashboard']);
      else if (this.authService.currentUser.userRole.toString() == "monitorAdmin" || this.authService.currentUser.userRole.toString() == "monitorUser")
        this.router.navigate(['/monitor/dashboard']);
    }
  }

  setMissingGuids() {
    //this.commonService.setMissingGuidData().subscribe(response => { });
  }

  onEmailFieldBlur() {
    let EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    this.emailFieldError = true;
    if (this.obj.email && this.obj.email != '' && EMAIL_REGEXP.test(this.obj.email)) {
      this.emailFieldError = false;
    }
  }

  onPasswordFieldBlur() {
    this.passwordFieldError = true;
    if (this.obj.password && this.obj.password != '') {
      this.passwordFieldError = false;
    }
  }

  updateEventParticipentEventStatus(eventParticipentId, eventStatus, eventId) {
    if (eventParticipentId != null && eventParticipentId != undefined && eventStatus != null && eventStatus != undefined && eventId != null && eventId != undefined) {
      this.isloader = true;
      this.calendarEventService.checkEventParticipentEventStatus(eventParticipentId).subscribe(response => {
        this.isloader = false;
        if (response == EventStatus.Pending) {
          this.isloader = true;
          this.calendarEventService.updateEventParticipentEventStatus(eventParticipentId, eventStatus, eventId).subscribe(res => {
            this.isloader = false;
            if (!this.authService.isLoggedIn) {
              if (res)
                Swal.fire("Calendar Event", "Event added to your calendar successfully.", "success");
              else
                Swal.fire("Calendar Event", "Event has been rejected.", "info");
            }
            else
              this.router.navigate(['/calendar']);

          },
            err => {
              this.isloader = false;
              if (err.status == 400) {
                Swal.fire("", err.error.message, "error");
              }
              else
                Swal.fire("", err.error.message, "error");
            });
        }
        else if (response == EventStatus.Accept)
          Swal.fire("Calendar Event", "Event already accepted.", "success");
        else if (response == EventStatus.Reject)
          Swal.fire("Calendar Event", "Event already rejected.", "info");
        else
          Swal.fire("Calendar Event", "Event not exists.", "info");

      });

    }
  }

  confirmemail(email, code) {
    if (email != null && email != undefined && email != "" && code != null && code != undefined && code != "") {
      var model = new LoginViewModel();
      model.email = email;
      model.code = code;
      this.isloader = true;
      this.service.activateUser(model).subscribe(
        res => {
          this.isloader = false;
          if (res.userStatus == UserStatus.active)
            Swal.fire("", "Account activated successfully.", "success");
          else
            Swal.fire("", "Email verified successful. You will be notified through email when we activate your account.", "success");
        },
        err => {
          this.isloader = false;
          if (err.status == 400) {
            Swal.fire("", err.error.message, "error");
          }
          else
            Swal.fire("", err.error.message, "error");
        });
    }
    else
      this.obj.isDisabled = false;
  }

  login() {
    let EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!this.obj.isDisabled && this.passwordFieldError == false && this.emailFieldError == false && this.obj.email != '' && this.obj.password != '' && EMAIL_REGEXP.test(this.obj.email)) {
      this.isloader = true;
      this.service.signIn(this.obj).subscribe(
        response => {
          this.isloader = false;
          if (response) {
            this.authService.processLoginResponse(response, this.obj.rememberMe);
            this.getProfiles();
            this.getOrganization();
          }
        },
        err => {
          this.isloader = false;
          if (err.status == 400) {
            Swal.fire("", err.error.message, "error");
          }
          else
            Swal.fire("", err.error.message, "error");
          //Swal.fire("", "Please check your internet connection!", "error");
        });
    }
  }

  getOrganization() {
    this.organizationService.GetOrganizationByContactId(this.authService.currentUser.organizationContactId).subscribe(
      res => {
        this.authService.saveOrganizationDetails(res);
        var userRole = this.authService.currentUser.userRole.toString().toLowerCase();
        if (userRole == "superadmin") {
          this.router.navigate(['/admin/dashboard']);
        }
        else if (userRole == "superuser") {
          this.router.navigate(['/superuser/dashboard']);
        }
        else if (userRole == "investigatoradmin" || userRole == "investigatoruser") {
          this.authService.saveAccountType("investigator");
          //this.getListOfInvestigatorsByOrganizationContactId();
          //this.router.navigate(['/investigatordashboard']);
          this.investigatorService.getInvestigatorNamesAndIdByOrganizationContactId(this.authService.currentUser.organizationContactId).subscribe(response => {
            if (response) {
              this.authService.saveInvestigatorList(response);
              this.investigatorService.getByEmail(this.authService.currentUser.email).subscribe(investigatorResponse => {
                if (investigatorResponse) {
                  this.authService.saveInvestigatorDetails(investigatorResponse);
                  this.siteService.getSiteNamesAndIdByOrganizationId(this.authService.organization.id).subscribe(response => {
                    if (response) {
                      this.authService.saveSiteList(response);
                      this.siteService.getByEmail(this.authService.organization.email).subscribe(siteResponse => {
                        if (siteResponse) {
                          this.authService.saveSiteDetails(siteResponse);
                          if (investigatorResponse.isMaster && investigatorResponse.percentageCompleted == 0) {
                            this.router.navigate(['/investigator'], { queryParams: { investigatorId: investigatorResponse.id } });
                          }
                          else {
                            this.router.navigate(['/investigator/dashboard']);
                          }
                        }
                      });
                    }
                  });



                }
              });
            }
          });
        }
        else if (userRole.toLocaleLowerCase() == "siteadmin" || userRole.toLocaleLowerCase() == "siteuser" || userRole.toLocaleLowerCase() == "investigator") {
          this.authService.saveAccountType("site");
          this.siteService.getSiteNamesAndIdByOrganizationId(this.authService.organization.id).subscribe(response => {
            if (response) {

              this.authService.saveSiteList(response);
              this.siteService.getByEmail(this.authService.organization.email).subscribe(siteResponse => {
                if (siteResponse) {
                  this.authService.saveSiteDetails(siteResponse);
                  if (this.returnUrl != null && this.returnUrl != undefined && this.returnUrl.trim() != "" && this.authService.currentUser.email == this.email) {
                    this.router.navigate([this.returnUrl]);
                  }
                  else if (siteResponse.isMaster && siteResponse.percentageCompleted == 0) {
                    this.router.navigate(['/sitedetails'], { queryParams: { siteId: siteResponse.id } });
                  }
                  else {
                    this.router.navigate(['/site/dashboard']);
                  }
                }
              });
            }
          });
        }
        else if (userRole.toLocaleLowerCase() == "siteinvestigatoradmin" || userRole.toLocaleLowerCase() == "siteinvestigatoruser") {
          this.authService.saveAccountType("investigator");
          this.siteService.getSiteNamesAndIdByOrganizationId(this.authService.organization.id).subscribe(response => {
            if (response) {
              this.authService.saveSiteList(response);
              this.siteService.getByEmail(this.authService.organization.email).subscribe(siteResponse => {
                if (siteResponse) {
                  this.authService.saveSiteDetails(siteResponse);
                  if (siteResponse.isMaster && siteResponse.percentageCompleted == 0) {
                    this.router.navigate(['/sitedetails'], { queryParams: { siteId: siteResponse.id } });
                  }
                  else {
                    this.router.navigate(['/site/dashboard']);
                  }
                }
              });
            }
            this.investigatorService.getInvestigatorNamesAndIdByOrganizationId(this.authService.organization.id).subscribe(response => {
              if (response) {
                this.authService.saveInvestigatorList(response);
                this.investigatorService.getByEmail(this.authService.currentUser.email).subscribe(investigatorResponse => {
                  if (investigatorResponse) {
                    this.authService.saveInvestigatorDetails(investigatorResponse);
                    if (investigatorResponse.isMaster && investigatorResponse.percentageCompleted == 0) {
                      this.router.navigate(['/investigator'], { queryParams: { investigatorId: investigatorResponse.id } });
                    }
                    else {
                      this.router.navigate(['/investigator/dashboard']);
                    }
                  }
                });
              }
              this.router.navigate(['/investigator/dashboard']);
            });
          });
          //this.router.navigate(['/siteinvestigatordashboard']);
        }
        else if (userRole.toLocaleLowerCase() == "sponsoradmin" || userRole.toLocaleLowerCase() == "sponsoruser") {
          this.authService.saveAccountType("sponsor");
          this.sponsorService.getSponsorInfoByOrganizationId(res.id).subscribe(response => {
            if (response) {
              this.authService.saveSponsorDetails(response);
              if (response.percentageCompleted == 0) {
                this.router.navigate(['/sponsor']);
              }
              else {
                this.router.navigate(['/sponsor/dashboard']);
              }
            }
          });
        }
        else if (userRole.toLocaleLowerCase() == "croadmin" || userRole.toLocaleLowerCase() == "crouser") {
          this.authService.saveAccountType("cro");
          this.croService.getCroInfoByOrganizationId(res.id).subscribe(response => {
            if (response) {
              this.authService.saveCRODetails(response);
              this.croService.getCroInfoByOrganizationId(this.authService.organization.id).subscribe(croResponse => {
                if (response.percentageCompleted == 0) {
                  this.router.navigate(['/cro'], { queryParams: { croId: croResponse.id } });
                }
                else {
                  this.router.navigate(['/cro/dashboard']);
                }
              });
            }
          });
        }
        else if (userRole.toLocaleLowerCase() == "monitoradmin" || userRole.toLocaleLowerCase() == "monitoruser") {
          this.authService.saveAccountType("monitor");
          this.monitorService.getMonitorInfoByOrganizationId(res.id).subscribe(response => {
            if (response) {
              this.authService.saveMonitorDetails(response);
              this.monitorService.getMonitorInfoByOrganizationId(this.authService.organization.id).subscribe(monitorResponse => {
                if (response.percentageCompleted == 0) {
                  this.router.navigate(['/monitor'], { queryParams: { monitorId: monitorResponse.id } });
                }
                else {
                  this.router.navigate(['/monitor/dashboard']);
                }
              });
            }
          });
        }
      },
      err => {
        //console.log("Error while fetching organization");
      });
  }

  getSponsor(organizationId) {
    this.sponsorService.getSponsorInfoByOrganizationId(organizationId).subscribe(response => {
      if (response) {
        this.authService.saveSponsorDetails(response);
      }
    });
  }

  getInvestigator(organizationId) {
    this.investigatorService.getInvestigatorByOrganizationId(organizationId).subscribe(response => {
      if (response)
        this.authService.saveInvestigatorDetails(response);
    });
  }

  getMonitor(organizationId) {
    this.monitorService.getMonitorInfoByOrganizationId(organizationId).subscribe(response => {
      if (response)
        this.authService.saveMonitorDetails(response);
    });
  }

  getSite(organizationId) {
    this.siteService.getSiteInfoByOrganizationId(organizationId).subscribe(response => {
      if (response)
        this.authService.saveSiteDetails(response);
    });
  }

  getListOfSitesByOrganizationContactId() {
    this.siteService.getSiteNamesAndIdByOrganizationId(this.authService.organization.id).subscribe(response => {
      if (response) {
        this.authService.saveSiteList(response);
      }
    });
  }

  getListOfInvestigatorsByOrganizationContactId() {
    this.investigatorService.getInvestigatorNamesAndIdByOrganizationId(this.authService.organization.id).subscribe(response => {
      if (response) {
        this.authService.saveInvestigatorList(response);
      }
    });
  }

  getProfiles() {
    //this.ccservice.getProfiles().subscribe(
    //  res => {
    //    this.authService.saveInfoDetails(res);
    //  },
    //  err => {

    //  });
  }

  autoLogout(timeout) {
    var timetoLogOff = parseInt(timeout) * 60;
    this.bnIdle.startWatching(timetoLogOff).subscribe((res) => {
      if (res)
        this.authService.logout();
    });
  }


}

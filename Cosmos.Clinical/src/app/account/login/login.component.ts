import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import * as fs from '@fortawesome/free-solid-svg-icons';
import { User, UserStatus } from 'src/app/models/account/user.model';

import { LoginViewModel } from 'src/app/models/account/loginviewmodel.model';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from 'src/app/core/services/organization/organization.service';

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
    private organizationService: OrganizationService, private bnIdle: BnNgIdleService) {
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
          
        }
        else if (userRole.toLocaleLowerCase() == "siteadmin" || userRole.toLocaleLowerCase() == "siteuser" || userRole.toLocaleLowerCase() == "investigator") {
          this.authService.saveAccountType("site");
          
        }
        else if (userRole.toLocaleLowerCase() == "siteinvestigatoradmin" || userRole.toLocaleLowerCase() == "siteinvestigatoruser") {
          this.authService.saveAccountType("investigator");
          
          //this.router.navigate(['/siteinvestigatordashboard']);
        }
        else if (userRole.toLocaleLowerCase() == "sponsoradmin" || userRole.toLocaleLowerCase() == "sponsoruser") {
          this.authService.saveAccountType("sponsor");
          
        }
        else if (userRole.toLocaleLowerCase() == "croadmin" || userRole.toLocaleLowerCase() == "crouser") {
          this.authService.saveAccountType("cro");
          
        }
        else if (userRole.toLocaleLowerCase() == "monitoradmin" || userRole.toLocaleLowerCase() == "monitoruser") {
          this.authService.saveAccountType("monitor");
          
        }
      },
      err => {
        //console.log("Error while fetching organization");
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

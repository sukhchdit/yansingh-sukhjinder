import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOut } from 'src/app/core/services/animations';
import { OrganizationService } from 'src/app/core/services/organization/organization.service';
import { Register } from 'src/app/models/account/register.model';
import Swal from 'sweetalert2';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeInOut]
})

export class RegisterComponent implements OnInit {
  obj = new Register();
  isloader = false;
  passwordstrength: number = 1;
  fNameFieldNewError = false;
  lNameFieldNewError = false;
  emailFieldNewError = false;
  phoneFieldNewError = false;
  organizationNameNewrror = false;
  openOrganizationDropdown = false;
  organizationTypeList = [{ value: 0, name: 'Organization Type' }, { value: 4, name: 'CRO' }, { value: 1, name: 'Site' }, { value: 2, name: 'Sponsor' }];
  selectedOrganizationType = 'Organization Type';

  constructor(private service: RegisterService, public router: Router, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.obj.organizationType = 0;
  }

  checkValidations() {
    let EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!this.obj.email || this.obj.email == '' || !EMAIL_REGEXP.test(this.obj.email)) {
      this.emailFieldNewError = false;
    }
    if (!this.obj.firstname || this.obj.firstname == '') {
      this.fNameFieldNewError = false;
    }
    if (!this.obj.lastname || this.obj.lastname == '') {
      this.lNameFieldNewError = false;
    }
    if (!this.obj.phone || this.obj.phone == '') {
      this.phoneFieldNewError = false;
    }
    if (!this.obj.organizationName || this.obj.organizationName == '') {
      this.organizationNameNewrror = false;
    }
    if (!this.emailFieldNewError || !this.obj.firstname || !this.obj.lastname || !this.obj.phone || !this.obj.organizationName) {
      return false;
    }
    if (this.obj.organizationType == 0) {
      Swal.fire("", "Please select organization type.", "error");
      return false;
    }
    if (this.obj.termspolicy == false) {
      Swal.fire("", "Please select read terms & conditions.", "error");
      return false;
    }
    return true;
  }

  save(f: NgForm) {
    if (f.valid) {
      if (this.checkValidations()) {
        this.isloader = true;
        this.organizationService.checkOrganizationForSignUp(this.obj).subscribe(response => {
          if (response && response.id > 0) {
                this.isloader = false;
            Swal.fire("", "The organization has already been registered. Please contact your organization administrator.", "info");
          }
          else {
            this.service.addEditObj(this.obj).subscribe(
              res => {
                this.isloader = false;
                Swal.fire("", res.message, "success");
                this.router.navigate(['']);
              },
              err => {
                this.isloader = false;

                if (err.status == 400)
                  Swal.fire("", err.error.message, "error");
                else
                  Swal.fire("", "Please check your internet connection!", "error");
              });
          }
        });
      }
    }
  }

  onFNameFieldNewBlur() {
    if (this.obj.firstname && this.obj.firstname != '') {
      this.fNameFieldNewError=false;
    }
    else {
      this.fNameFieldNewError= true;
    }
  }

  onLNameFieldNewBlur() {
    if (this.obj.lastname && this.obj.lastname != '') {
      this.lNameFieldNewError = false;
    }
    else {
      this.lNameFieldNewError = true;
    }
  }

  onEmailFieldNewBlur() {
    let EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (this.obj.email && this.obj.email != '' && EMAIL_REGEXP.test(this.obj.email)) {
      this.emailFieldNewError = false;
    }
    else {
      this.emailFieldNewError = true;
    }
  }

  onPhoneFieldNewBlur() {
    if (this.obj.phone && this.obj.phone != '') {
      this.phoneFieldNewError = false;
    }
    else {
      this.phoneFieldNewError = true;
    }
  }

  onOrganizationNameNewBlur() {
    if (this.obj.organizationName && this.obj.organizationName != '') {
      this.organizationNameNewrror = false;
    }
    else {
      this.organizationNameNewrror = true;
    }
  }

  openDropdown() {
    this.openOrganizationDropdown = true;
    //$scope[ele] = !$scope[ele];
  }

  closeDropdown() {
    this.openOrganizationDropdown = false;
    //$scope[ele] = false;
  }

  selectDropdownValue(org) {
    this.obj.organizationType = org.value;
    this.selectedOrganizationType = org.name;
    this.openOrganizationDropdown = false;
    //$scope[dd] = false;
    //$scope[model] = value;
  }

  //Login
  onEmailFieldBlur () {
    //$scope.emailFieldError = true;
    //if ($scope.emailField && $scope.emailField != '') {
    //  $scope.emailFieldError = false;
    //}
  }

  onPasswordFieldBlur () {
    //$scope.passwordFieldError = true;
    //if ($scope.passwordField && $scope.passwordField != '') {
    //  $scope.passwordFieldError = false;
    //}
  }


  //Forgot Password
  onEmailFieldForgotBlur () {
    //$scope.emailFieldForgotError = true;
    //if ($scope.emailFieldForgot && $scope.emailFieldForgot != '') {
    //  $scope.emailFieldForgotError = false;
    //}
  }


  //Reset Password
  onOldPasswordFieldBlur () {
    //$scope.oldPasswordFieldError = true;
    //if ($scope.oldPasswordField && $scope.oldPasswordField != '') {
    //  $scope.oldPasswordFieldError = false;
    //}
  }

  onNewPasswordFieldBlur () {
    //$scope.newPasswordFieldError = true;
    //if ($scope.newPasswordField && $scope.newPasswordField != '') {
    //  $scope.newPasswordFieldError = false;
    //}
  }

  //Sign Up

  onOrganizationTypeNewBlur () {
    //$scope.organizationTypeNewError = true;
    //if ($scope.organizationTypeNew && $scope.organizationTypeNew != '') {
    //  $scope.organizationTypeNewError = false;
    //}
  }

}

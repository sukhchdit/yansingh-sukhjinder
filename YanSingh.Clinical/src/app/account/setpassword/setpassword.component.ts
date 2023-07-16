import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from 'src/app/models/account/loginviewmodel.model';
import { fadeInOut } from 'src/app/core/services/animations';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css'],
  animations: [fadeInOut]
})

export class SetpasswordComponent implements OnInit {
  obj = new LoginViewModel();
  isloader = false;
  passwordstrength: number = 1;
  newPasswordFieldError = false;
  oldPasswordFieldError = false;

  constructor(private service: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.obj.code = params.id;
      this.obj.email = params.email;
    });
  }

  checkPassword() {
    //---min 8 letter check
    if (this.obj.password.length < 8) {
      this.passwordstrength = 1;
      return;
    }

    //---uppercase check
    var res1 = this.obj.password.match('(?=.*[A-Z])');
    if (res1 != null) {
      this.passwordstrength = 2;
    }
    else
      return

    //---numbers check
    var res2 = this.obj.password.match('(?=.*[0-9])');
    if (res2 != null)
      this.passwordstrength = 3;
    else
      return

    //---special chars check
    var format = /(?=.*[~!@#$%\^&*()\-_=+\|\[{\]};:'",<.>/?])/;
    var res3 = this.obj.password.match(format);
    if (res3 != null) {
      this.passwordstrength = 4;
      return;
    }
  }

  update() {
    this.onOldPasswordFieldBlur();
    this.onNewPasswordFieldBlur();
    if (this.oldPasswordFieldError && !this.oldPasswordFieldError && this.newPasswordFieldError && !this.newPasswordFieldError) {
      if (this.obj.password != this.obj.confirmpassword) {
        Swal.fire("", "Password and confirm password does not match", "error");
        return false;
      }

      if (this.passwordstrength == 1) {
        Swal.fire("", "Password must contain one uppercase letter", "error");
        return false;
      }

      this.isloader = true;
      this.service.setPassword(this.obj).subscribe(
        res => {
          this.isloader = false;
          this.router.navigate(['']);
          Swal.fire("", res.message, "success");
        },
        err => {
          this.isloader = false;
          if (err.status == 400) {
            Swal.fire("", err.error.message, "error");
          }
          else
            Swal.fire("", "Please check your internet connection!", "error");
        });
    }
  }

  onOldPasswordFieldBlur() {
    if (this.obj.password && this.obj.password.length >= 6) {
      this.oldPasswordFieldError = false;
    }
    else {
      this.oldPasswordFieldError = true;
    }
  }

  onNewPasswordFieldBlur() {
    if (this.obj.confirmpassword && this.obj.confirmpassword.length >= 6) {
      this.newPasswordFieldError = false;
    }
    else {
      this.newPasswordFieldError = true;
    }
  }

}

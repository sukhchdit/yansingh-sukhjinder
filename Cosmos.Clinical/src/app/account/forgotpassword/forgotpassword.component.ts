import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from '@angular/core';
import { ForgotPassword } from 'src/app/models/account/forgotpassword.model';
import { UserService } from '../services/user.service';
import { InterationService } from 'src/app/core/services/interaction';
import { fadeInOut } from 'src/app/core/services/animations';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  animations: [fadeInOut]
})

export class ForgotpasswordComponent implements OnInit {
  obj = new ForgotPassword();
  isloader = false;
  emailFieldForgotError = false;

  constructor(private service: UserService, public router: Router, private interationService: InterationService) { }

  ngOnInit() {
  }

  onEmailFieldForgotBlur() {
    let EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (this.obj.email && this.obj.email != '' && EMAIL_REGEXP.test(this.obj.email))
      this.emailFieldForgotError = false;
    else
      this.emailFieldForgotError = true;
  }

  update() {
    let EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    this.onEmailFieldForgotBlur()
    if (this.obj.email && this.obj.email != '' && this.emailFieldForgotError == false && EMAIL_REGEXP.test(this.obj.email)) {
      this.isloader = true;

      this.service.forgotPassword(this.obj).subscribe(
        res => {
          this.isloader = false;
          Swal.fire("", res.message, "success");
          this.router.navigate(['']);
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
}

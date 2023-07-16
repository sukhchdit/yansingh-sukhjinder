import { UserRole } from "./user.model";

export class LoginViewModel {

  constructor(email?: string, password?: string, confirmpassword?: string) {
    email == undefined ? this.email = "" : this.email = email;
    password == undefined ? this.password = "" : this.password = password;
    confirmpassword == undefined ? this.confirmpassword = "" : this.confirmpassword = confirmpassword;
  }

  email: string;
  password: string;
  confirmpassword: string;
  code: string;
  userRole: UserRole;
}

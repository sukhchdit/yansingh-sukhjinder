import { BaseViewModel } from "./baseviewmodel.model";

export class ChangePassword extends BaseViewModel {
  constructor(email?: string, currentpassword?: string, newpassword?: string, confirmpassword?: string) {
      super();
    
    this.email = email;
    this.newpassword = newpassword;
    this.currentpassword = currentpassword;
    this.confirmpassword = confirmpassword;
  }

  email: string;
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
}

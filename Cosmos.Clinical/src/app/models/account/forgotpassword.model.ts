import { UserRole } from "./user.model";
import { BaseViewModel } from "./baseviewmodel.model";

export class ForgotPassword extends BaseViewModel {
  email: string;
  userRole: UserRole;
  code: string;
}

export class CallResult {
  message: string;
}

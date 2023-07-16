import { UserRole } from "./user.model";
import { BaseViewModel } from "./baseviewmodel.model";
import { OrganizationType } from '../organization/organizationinfo.model';

export class Register extends BaseViewModel {
  constructor(id?: number, email?: string, firstname?: string, lastname?: string, phone?: string, password?: string, enableEmailApproval?: boolean,
    termspolicy?: boolean, confirmPassword?: string) {
      super();
    id == undefined ? this.id = 0 : this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.password = password;
    this.enableEmailApproval = enableEmailApproval;
    this.termspolicy = termspolicy;
    this.confirmPassword = confirmPassword;
  }

  id: number;
  firstname: string;
  lastname: string;
  email: string;
  confirmemail: string;
  phone: string;
  password: string;
  confirmPassword: string;
  enableEmailApproval: boolean;
  termspolicy: boolean;
  userRole: UserRole;
  organizationInfoId: string;
  organizationName: string;
  organizationType: OrganizationType;
}

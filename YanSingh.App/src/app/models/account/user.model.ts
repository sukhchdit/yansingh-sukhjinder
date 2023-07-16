
export enum UserRole {
  superAdmin = 1, siteAdmin = 2, siteUser = 3, sponsorAdmin = 4, sponsorUser = 5,
  investigatorAdmin = 6, investigatorUser = 7, monitorAdmin = 8, monitorUser = 9,
  croAdmin = 10, croUser = 11, siteinvestigatoradmin = 12, superUser = 13, investigator
}

export enum UserStatus { pending = 1, active, suspended, EmailActivationPending, Rejected }


export class User {
  constructor(id?: number, email?: string, password?: string, userStatus?: UserStatus,
    rememberMe?: boolean, createdBy?: number, updatedBy?: number, createdOn?: Date, updatedOn?: Date) {
    id == undefined ? this.id = 0 : this.id = id;
    email == undefined ? this.email = "" : this.email = email;
    password == undefined ? this.password = "" : this.password = password;
    userStatus == undefined ? this.userStatus = UserStatus.pending : this.userStatus = userStatus;
    rememberMe == undefined ? this.rememberMe = false : this.rememberMe = rememberMe;
    createdBy == undefined ? this.createdBy = 0 : this.createdBy = createdBy;
    updatedBy == undefined ? this.updatedBy = 0 : this.updatedBy = updatedBy;
    createdOn == undefined ? this.createdOn = new Date() : this.createdOn = createdOn;
    updatedOn == undefined ? this.updatedOn = new Date() : this.updatedOn = updatedOn;
    this.isDisabled = true;
  }

  id: number;
  email: string;
  password: string;
  rememberMe: boolean;
  createdBy: number;
  updatedBy: number;
  userStatus: UserStatus;
  isDisabled: boolean;
  enableEmailApproval: boolean;
  createdOn: Date;
  updatedOn: Date;
  lastLoginAt: string;
}

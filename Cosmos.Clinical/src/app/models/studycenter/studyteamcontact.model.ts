import { BaseEntity } from '../baseentity.model';
export enum ContactStatus { NotCertified = 1, Certified, Active, InActive, QCReady, QCFlag, QCCompleted }
export class StudyTeamContact extends BaseEntity {
  constructor() {
    super();
    this.salutationId = 0;
    this.contactstatus = ContactStatus.NotCertified;
  }
  sponsorstudyinfoid: number;
  siteNumber: string;
  salutationId: number;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  organization: string;
  roleId: number;
  roleName: string;
  countryId: number;
  country: string;
  stateId: number;
  state: string;
  certified: boolean;
  headshot: string;
  phone: string;
  email: string;
  location: string;
  contactstatus: ContactStatus;
  studyteamcontactguid: string;
}
export class StudyTeamContactHistory {
  constructor() {
    this.column = columnType.status;
  }
  StudyCenterFaqId: number;
  valueFrom: string;
  valueTo: string;
  column: columnType;
  ccreatedByName: string;
}
enum columnType {
  status
}

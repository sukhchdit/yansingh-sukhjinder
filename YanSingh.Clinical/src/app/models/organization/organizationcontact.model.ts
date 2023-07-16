import { BaseContact } from '../basecontact.model';
import { OrganizationInfo } from './organizationinfo.model';
import { UserRole, User } from '../account/user.model';

export enum JobRole {
  Monitor = 1, MedicalMonitor, FeasibilityTeam, StudyStartup, Finance, PM, ProgramDirector, OperationsManager, OperationsDirector, Contract, Legal, CTA,
  CRA, Admin, Regulatory, PI, SubI, CRC, QA, DataEntry, MA, Budget,
}

export enum Education { MD = 1, BS, MS, PHD, PMP, MBA, Diploma, Other }


export class OrganizationContact extends BaseContact {
  constructor() {
    super();
    this.salutationId = 0;
  }
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  canSignCTA: boolean;
  canSignCDA: boolean;
  isInvestigator: boolean;
  salutationId: number;
  roleTypeId: number;
  roleTypeName: string;
  roleId: number;
  roleName: string;
  userRole: UserRole;
  education: Education;
  digitalSignature: any;
  siteNumber: any;
  userId: User;
  user: User;
  organizationInfoId: number;
  organizationInfo: OrganizationInfo;
}

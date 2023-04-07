import { BaseAddress } from '../baseaddress.model';
import { JobRole } from '../organization/organizationcontact.model';

//export enum JobRole { Manager = 1, Director, ProjectManager }

export class SponsorContact extends BaseAddress {
  constructor() {
    super();
    this.salutationId = 0; 
    this.jobRole = JobRole.Admin;
    this.therapeuticId = 0;
  }
  firstName: string;
  lastName: string;
  salutationId: number;
  receiveTextMessage: boolean;
  password: string;
  lastPasswordUpdated: Date;
  jobRole: JobRole;
  therapeuticId: number;
  sponsorInfoId: number;

}

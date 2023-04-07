import { BaseEntity } from '../baseentity.model';
import { SponsorStudyTeamRole } from '../userrrolemanagement/sponsorstudyteamrole.model';

export enum Position { Finance = 1, HR, PM, Director, Prog_Manager, StudyEmergencyContact }

export class SponsorStudyTeam extends BaseEntity {
  constructor() {
    super();
    this.position = 0;
    this.signatureAuthorityCDA = false;
    this.signatureAuthorityFQ = false;
    this.signatureAuthoritySiteSelection = false;
    this.organizationContactId = 0;
    this.roleId = 0;
  }
  position: Position;
  signatureAuthorityCDA: boolean;
  signatureAuthorityFQ: boolean;
  signatureAuthoritySiteSelection: boolean;
  roleId: number;
  isBlind: boolean;
  iseReg: boolean;
  iseSource: boolean;
  iseDiary: boolean;
  isEDC: boolean;
  isIWRS: boolean;
  isECOA: boolean;
  isIP: boolean;
  isLabs: boolean;
  isIRB: boolean;
  isTraining: boolean;
  isStudyPortal: boolean;
  isPayments: boolean;

  sponsorStudyInfoId: number;
  organizationContactId: number;
  sponsorContactName: string;

  role: string;
  roleType: string;
}

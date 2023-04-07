import { BaseEntity } from "../baseentity.model";
import { Role } from "../role.model";

export class SponsorStudyTeamRole extends BaseEntity{
  constructor() {
    super();
    this.role = new Role();
  }
  roleId: number;
  role: Role;
  sponsorStudyTeamId: number;
}

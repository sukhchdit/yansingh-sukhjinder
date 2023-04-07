import { BaseEntity } from './baseentity.model';
import { OrganizationType } from './organization/organizationinfo.model';
import { Role } from './role.model';

export class RoleType extends BaseEntity {
  constructor() {
    super();
    this.type = 0;
  }

  name: string;
  type: OrganizationType;
  roles: Role[] = [];
}

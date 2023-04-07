import { BaseAddress } from '../baseaddress.model';
import { OrganizationType } from '../organization/organizationinfo.model';

export class CroInfo extends BaseAddress {
  constructor() {
    super();
    this.organizationType = OrganizationType.CRO;
  }
  name: string;
  organizationType: OrganizationType;
  taxId: string;
  percentageCompleted: number;
  organizationInfoId: number;
}

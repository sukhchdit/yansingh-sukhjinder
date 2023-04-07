import { BaseAddress } from '../baseaddress.model';
import { OrganizationType } from '../organization/organizationinfo.model';


export class SponsorInfo extends BaseAddress {
  constructor() {
    super();
    this.organizationType = OrganizationType.Sponsor;
  }
  name: string;
  organizationType: OrganizationType;
  taxId: string;
  percentageCompleted: number;
  organizationInfoId: number;
  sponsorGuid: string;
}

import { BaseAddress } from '../baseaddress.model';

export class SiteLabDetail extends BaseAddress {
  constructor() {
    super();
    this.isLocal = false;
    this.stateId = 0;
    this.countryId = 0;
  }

  name: string;
  description: string;
  licenseNumber: string;
  isLocal: boolean;

  siteInfoId: number;
}

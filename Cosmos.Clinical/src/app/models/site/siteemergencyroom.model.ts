import { BaseAddress } from '../baseaddress.model';

export class SiteEmergencyRoom extends BaseAddress {
  constructor() {
    super();
    this.stateId = 0;
    this.countryId = 0;
    this.distanceToER = 1;
  }

  nameOfTheCloset: string;
  distanceToER: number;

  siteInfoId: number;
}

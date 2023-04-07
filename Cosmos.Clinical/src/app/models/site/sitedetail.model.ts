import { BaseAddress } from '../baseaddress.model';

export class SiteDetail extends BaseAddress {

  constructor() {
    super();
  }

  type: string;
  content: string;

  siteInfoId: number;
}

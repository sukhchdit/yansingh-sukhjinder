import { BaseEntity } from '../baseentity.model';

export class SiteIT extends BaseEntity {
  constructor() {
    super();
    this.computer = false;
    this.printer = false;
    this.internetAccess = false;
    this.scanner = false;
    this.fax = false;
    this.fedexUpsAccess = false;

  }

  computer: boolean;
  printer: boolean;
  internetAccess: boolean;
  scanner: boolean;
  fax: boolean;
  fedexUpsAccess: boolean;

  siteInfoId: number;
}

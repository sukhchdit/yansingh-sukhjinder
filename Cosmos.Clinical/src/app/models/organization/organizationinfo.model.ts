import { BaseAddress } from '../baseaddress.model';
import { OrganizationContact } from './organizationcontact.model';
import { SiteInfo } from '../site/siteinfo.model';

export enum OrganizationType {
  SuperAdmin=0,
  Site = 1,
  Sponsor,
  Monitor,
  CRO
}

export class OrganizationInfo extends BaseAddress {
  name: string;
  type: OrganizationType;
  description: string;
  taxId: string;
  content: string;

  organizationContacts: OrganizationContact[];
  siteInfos: SiteInfo[];
}

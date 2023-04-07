import { BaseEntity } from '../baseentity.model';

export class SiteInfo extends BaseEntity {

  name: string;
  description: string;
  taxId: string;
  percentageCompleted: number;
  isMaster: boolean;
  smsNumber: string;
  communicationDomain: string;
  communicationFax: string;
  siteGuid: string;
  organizationInfoId: number;
}

export class CTASiteInfo extends BaseEntity {

  name: string;
  description: string;
  taxId: string;
  percentageCompleted: number;
  isMaster: boolean;
  smsNumber: string;
  communicationDomain: string;
  communicationFax: string;
  siteGuid: string;
  organizationInfoId: number;
  isAdded: boolean;
}
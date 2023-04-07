import { BaseEntity } from '../baseentity.model';

export class Country extends BaseEntity {
  name: string;
  phonecode: string;
  currencyCode: string;
  currencySymbol: string;
}

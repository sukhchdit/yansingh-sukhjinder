import { BaseEntity } from './baseentity.model';

export class BaseContact extends BaseEntity {
  website: string;
  phone: string;
  mobile: string
  fax: string;
  email: string;
}

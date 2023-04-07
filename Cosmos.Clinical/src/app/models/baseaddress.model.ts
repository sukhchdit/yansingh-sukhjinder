import { BaseContact } from './basecontact.model';

export class BaseAddress extends BaseContact {
  constructor() {
    super();
    this.stateId = 0;
    this.countryId = 0;
  }
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zipCode: string;
  stateId: number;
  countryId: number;
}

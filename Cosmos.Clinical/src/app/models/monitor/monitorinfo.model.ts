import { BaseAddress } from '../baseaddress.model';
import { MonitorDocument } from './monitordocument.model';

export class MonitorInfo extends BaseAddress {
  constructor() {
    super();
    this.salutationId = 0;
  }

  credential: string;
  firstName: string;
  middleName: string;
  lastName: string;
  salutationId: number;
  percentageCompleted: number;
  organizationInfoId: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zipCode: string;
  stateId: number;
  countryId: number;
  isMaster: boolean;
  monitorDocuments: MonitorDocument[] = [];
}

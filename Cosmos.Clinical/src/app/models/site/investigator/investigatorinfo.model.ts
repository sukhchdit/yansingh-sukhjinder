import { BaseAddress } from '../../baseaddress.model';

export class InvestigatorInfo extends BaseAddress {
  constructor() {
    super();
    this.salutationId = 0;
  }

  credential: string;
  firstName: string;
  middleName: string;
  lastName: string;
  salutationId: number;
  boardCertified: boolean;
  percentageCompleted: number;
  organizationContactId: number;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zipCode: string;
  stateId: number;
  countryId: number;
  isMaster: boolean;
}

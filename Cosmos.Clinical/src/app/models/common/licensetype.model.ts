import { BaseEntity } from '../baseentity.model';

export class LicenseType extends BaseEntity {
  constructor() {
    super();
  }

  name: string;
}

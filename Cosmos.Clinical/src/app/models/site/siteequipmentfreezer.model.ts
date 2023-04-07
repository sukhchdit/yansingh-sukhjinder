import { BaseEntity } from '../baseentity.model';

export class SiteEquipmentFreezer extends BaseEntity {
  constructor() {
    super();
    this.minus20 = false;
    this.minus70 = false;
    this.minus80 = false;
  }
  minus20: boolean;
  minus70: boolean;
  minus80: boolean;
}

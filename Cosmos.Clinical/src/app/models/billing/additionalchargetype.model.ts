import { BaseEntity } from '../baseentity.model';

export class additionalChargeType extends BaseEntity {
  constructor() {
    super();
  }

  chargeName:string;
}

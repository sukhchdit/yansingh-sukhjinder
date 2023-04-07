import { BaseEntity } from '../../baseentity.model';

export class Indicator extends BaseEntity {
  constructor() {
    super();
  }

  name: string;
  therapeuticId: number;
}

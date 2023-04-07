import { BaseEntity } from '../baseentity.model';

export class Therapeutic extends BaseEntity {
  constructor() {
      super();
  }
  name: string;
  description: string;
}

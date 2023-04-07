import { BaseEntity } from '../baseentity.model';

export class Salutation extends BaseEntity {
  constructor() {
    super();
  }

  title: string;
}

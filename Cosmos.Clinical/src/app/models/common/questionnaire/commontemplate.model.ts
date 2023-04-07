import { BaseEntity } from '../../baseentity.model';

export class CommonTemplate extends BaseEntity {
  constructor() {
    super();
    this.therapeuticId = 0;
  }

  title: string;
  therapeuticId: number;
  siteId: number;
}

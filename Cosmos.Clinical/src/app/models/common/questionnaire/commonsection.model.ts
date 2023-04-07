import { BaseEntity } from '../../baseentity.model';

export class CommonSection extends BaseEntity {
  constructor() {
    super();
    this.commonTemplateId = 0;
  }
  sectionName: string;
  sortOrder: number;

  commonTemplateId: number;

}

import { BaseEntity } from '../baseentity.model';

export class Section extends BaseEntity {

  sectionName: string;
  sortOrder: number;

  organizationInfoId: number;

}

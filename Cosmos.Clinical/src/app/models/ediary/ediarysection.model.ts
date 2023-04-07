import { BaseEntity } from '../baseentity.model';

export class eDiarySection extends BaseEntity {

  sectionName: string;
  sortOrder: number;

  organizationInfoId: number;

}

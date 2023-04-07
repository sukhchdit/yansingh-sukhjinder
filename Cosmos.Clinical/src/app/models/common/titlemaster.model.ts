import { BaseEntity } from '../baseentity.model';

export class TitleMaster extends BaseEntity {
  constructor() {
    super();
  }
  masterTypeId: number;
  title: string;
}

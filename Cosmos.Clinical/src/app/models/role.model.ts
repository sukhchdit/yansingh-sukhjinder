import { BaseEntity } from './baseentity.model';

export class Role extends BaseEntity {

  name: string;
  roleTypeId: number;
}

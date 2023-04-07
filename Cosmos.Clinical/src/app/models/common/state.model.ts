import { BaseEntity } from '../baseentity.model';

export class State extends BaseEntity {
  name: string;
  countryId: number;
  isActive: string;
  isCompleted: string;
  workflowName: string;
}

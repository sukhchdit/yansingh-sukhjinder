import { BaseEntity } from '../baseentity.model';

export class Procedure extends BaseEntity {
  constructor() {
    super();
    this.procedureCategoryId = 0;
  }

  title: string;
  cptCode: string;
  isNonProcedure: boolean;
  isInclusionExclusion: boolean;
  isConditional: boolean;

  procedureCategoryId: number;
}

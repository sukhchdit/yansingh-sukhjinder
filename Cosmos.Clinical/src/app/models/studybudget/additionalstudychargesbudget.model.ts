import { BaseEntity } from '../baseentity.model';

export class AdditionalStudyChargesBudget extends BaseEntity {
  constructor() {
    super();
    this.studyAdditionalChargeTypeId = 0;
    this.numberOfSubjects = 0;
  }  
  description: string;
  units: number;
  pricePerUnit: number;
  maxPricePerUnit: number;
  numberOfSubjects: number;
  
  studyBudgetVersionArmId: number;
  studyAdditionalChargeTypeId: number;
}

import { BaseEntity } from '../baseentity.model';

export class SiteAdditionalStudyChargesBudget extends BaseEntity {
  constructor() {
    super();
    this.studyAdditionalChargeTypeid = 0;
  }  
  description: string;
  units: number;
  pricePerUnit: number;
  maxPricePerUnit: number;
  numberOfSubjects: number;
    
  siteStudyBudgetVersionArmId: number;
  studyAdditionalChargeTypeid: number;
}

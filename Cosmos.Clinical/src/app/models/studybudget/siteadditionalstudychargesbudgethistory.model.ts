import { BaseEntity } from '../baseentity.model';

export class SiteAdditionalStudyChargesBudgetHistory extends BaseEntity {
  
  description: string;
  units: number;
  pricePerUnit: number;
  maxPricePerUnit: number;
  numberOfSubjects: number;
  
  siteAdditionalStudyChargesBudgetId: number;
}

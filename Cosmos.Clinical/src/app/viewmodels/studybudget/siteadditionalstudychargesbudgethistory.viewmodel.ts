import { BaseEntity } from "../../models/baseentity.model";

export class SiteAdditionalStudyChargesBudgetHistoryViewModel extends BaseEntity{
  
  description: string;
  units: number;
  pricePerUnit: number;
  maxPricePerUnit: number;
  numberOfSubjects: number;
  siteAdditionalStudyChargesBudgetId: number;
  updatedByName: string;
}

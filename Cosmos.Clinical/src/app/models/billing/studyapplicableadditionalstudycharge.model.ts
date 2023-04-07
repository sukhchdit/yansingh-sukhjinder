import { BaseEntity } from '../baseentity.model';

export class studyApplicableadditionalCharge extends BaseEntity {
  constructor() {
    super();
  }
  chargename:string;
  siteStudyAdditionalChargeId: number;
  dateOfService:Date;
  quantity:number;
  isPaid:boolean;
}


export class studyApplicableadditionalChargeViewItem  {
  id:number;
  chargename:string;
  studyAdditionalChargeId: number;
  dateOfService:Date;
  quantity:number;
  isPaid:boolean;
  total:number;
  isAdded:boolean;
}

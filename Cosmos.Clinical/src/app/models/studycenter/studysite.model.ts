import { BaseEntity } from '../baseentity.model';
export class StudySite extends BaseEntity {
  constructor() {
    super();
    this.salutationId = 0;
  }
  sponsorStudyInfoId: number;
  siteNumber: string;
  organizationName: string;  
  countryId: number;
  country:string;
  salutationId:number;
  salutationName:string;
  firstName:string;
  middleName:string;
  lastName:string;
  phone:string;
  mobile:string;
  email: string;  
  siteName:string;
  smsNumber:string;
  communicationDomain:string;
  communicationFax: string;
  siteInfoId: number;
  investigatorInfoId: number;
}

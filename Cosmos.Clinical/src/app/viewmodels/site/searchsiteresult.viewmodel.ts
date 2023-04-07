import { Education } from "../../models/organization/organizationcontact.model";

export class SearchSiteResultViewModel {
  
  siteInfoId: number;
  siteName: string;
  investigatorId: number;
  investigatorName: string;
  education: Education;
  ssuRequestId: string;
}

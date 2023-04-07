import { BaseContact } from "../../basecontact.model";
import { IPComponent, IPUnit } from "../../site/ipmaster.model";

export class IPMasterViewModel extends BaseContact {
  constructor() {
    super();
    this.ipUnit = 0;
  }
  kitNumber: string;
  lotNumber: string;
  recievedDate: any;
  recievedBy: number;
  recievedByName: string;
  dispensedDate: Date;
  dispensedBy: number;
  dispensedByName: string;
  subjectId: number;
  subjectName: string;
  crcVerified: boolean;
  crcVerifiedBy: number;
  crcVerifiedByName: string;
  crcVerifiedDate: Date;
  comment: string;
  sponsorSiteStudyCDAInvitationId: number;
  ipUnit: IPUnit;
  numberOfDosage: number;
  returnDosage: number;
  unusedIpReturn: boolean;
  reciverId: number;
  reciverName: string;
  recieverDate: Date;
  subjectVisitId: number;
  returnSubjectVisitId: number;
  consumedDosage: number;
  lostDosage: number;
  metIpConpliance: string;
  reEducateIpConpliance: string;
  educateIpConpliance: string;
  componentId: IPComponent;
}

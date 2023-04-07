import { BaseEntity } from '../baseentity.model';

export class IPMaster extends BaseEntity {
  constructor() {
    super();
    this.ipUnit = 0;
  }
  kitNumber: string;
  lotNumber: string;
  recievedDate: Date;
  recievedBy: number;
  dispensedDate: Date;
  dispensedBy: number;
  subjectId: number;
  crcVerified: boolean;
  crcVerifiedBy: number;
  crcVerifiedDate: Date;
  comment: string;
  sponsorSiteStudyCDAInvitationId: number;
  ipUnit: IPUnit;
  numberOfDosage: number;
  returnDosage: number;
  unusedIpReturn: boolean;
  reciverId: number;
  recieverDate: Date;
  subjectVisitId: number;
  returnSubjectVisitId: number;
  consumedDosage: number;
  lostDosage: number;
  metIpConpliance: string;
  educateIpConpliance: string;
  reEducateIpConpliance: string;
  componentId: IPComponent;
  recievedByName: string;
}
export enum IPUnit { capsule = 1, bottle, tablet }
export enum IPComponent { ipMaster = 1, ipPreparation, ipVerification,ipReturn }

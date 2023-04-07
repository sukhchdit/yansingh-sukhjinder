import { BaseEntity } from '../baseentity.model';

export enum ShipmentType { IP = 1, LabKits, StudySupplies, Other }
export enum ShipmentAction { Primary = 1, Backup, Inactive }


export class Shipment extends BaseEntity {
  constructor() {
    super();
    this.shipmentAction = ShipmentAction.Primary;
    this.shipmentType = ShipmentType.IP;
    this.sponsorStudyTeamId = 0;
    this.siteInfoId = 0;
  }
  
  sponsorStudyTeamId: number;
  shipmentType: ShipmentType;
  siteInfoId: number;
  shipmentAction: ShipmentAction;
  sponsorSiteStudyCDAInvitationId: number;
}

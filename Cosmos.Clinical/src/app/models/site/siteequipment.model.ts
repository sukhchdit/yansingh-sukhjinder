import { BaseEntity } from '../baseentity.model';
import { SiteEquipmentFreezer } from './siteequipmentfreezer.model';

export class SiteEquipment extends BaseEntity {

  constructor() {
    super();
    this.freezer = new SiteEquipmentFreezer();
    this.numberOfExamRooms = 1;
    this.numberOfMonitoringRooms = 1;
    this.storageSpace = false;
    this.accessToDryIce = false;
    this.crashCart = false;
    this.refrigerator = false;
    this.bp = false;
    this.scale = false;
    this.centrifuse = false;
    this.refrigerator = false;
  }

  numberOfExamRooms: number;
  freezer: SiteEquipmentFreezer;
  storageSpace: boolean;
  accessToDryIce: boolean;
  crashCart: boolean;
  refrigerator: boolean;
  bp: boolean;
  scale: boolean;
  centrifuse: boolean;
  numberOfMonitoringRooms: number;

  siteInfoId: number;
}

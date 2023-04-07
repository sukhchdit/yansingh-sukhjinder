import { BaseEntity } from '../baseentity.model';
import { SiteImagingDetail } from './siteimagingdetail.model';

export class SiteImaging extends BaseEntity {
  constructor() {
    super();
    this.accessToMRI = false;
    this.accessToCT = false;
    this.accessToDEXA = false;
    this.infusionPump = false;
    this.accessToPET = false;
    this.accessToUltraSound = false;
    this.accessToMammogram = false;
    this.accessToXRay = false;
    this.ECG = false;
    this.spirometer = false;

  }

  accessToMRI: boolean;
  accessToCT: boolean;
  accessToDEXA: boolean;
  infusionPump: boolean;
  accessToPET: boolean;
  accessToUltraSound: boolean;
  accessToMammogram: boolean;
  accessToXRay: boolean;
  ECG: boolean;
  spirometer: boolean;

  siteImagingDetail: SiteImagingDetail[] = [];

  siteInfoId: number;
}

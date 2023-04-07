import { BaseEntity } from '../baseentity.model';

export class SiteImagingDetail extends BaseEntity {
  constructor() {
    super();
    this.imagingDevice = ImagingDevice.MRI;
  }

  imagingDevice: ImagingDevice;
  manufacturer: boolean;
  model: boolean;
  serial: boolean;
  fieldStrength: boolean;
  softwareVersion: boolean;

  siteImagingId: number;
}

export enum ImagingDevice {
  MRI = 1,
  CT,
  DEXA,
  infusionPump,
  PET,
  UltraSound,
  MammoGram,
  XRay,
  ECG,
  Spirometer
}

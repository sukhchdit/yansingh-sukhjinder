import { BaseEntity } from '../baseentity.model';

export enum MonitorDocumentType { GCP=1, CV }

export class MonitorDocument extends BaseEntity {
  constructor() {
    super();
    this.countryId = 0;
    this.stateId = 0;
    this.monitorDocumentType = MonitorDocumentType.CV;
  }

  monitorDocumentType: MonitorDocumentType;
  documentTypeId: number;
  documentTypeName: string;
  expiryDate: Date;
  hasUploadedDocumentFile: boolean;
  fileName: string;
  stateId: number;
  stateName: string;
  countryId: number;
  countryName: string;
  monitorInfoId: number;
}

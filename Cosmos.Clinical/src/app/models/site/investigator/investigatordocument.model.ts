import { BaseEntity } from '../../baseentity.model';

export enum InvestigatorDocumentType { License = 1, GCP, CV }

export class InvestigatorDocument extends BaseEntity {
  constructor() {
    super();
    this.countryId = 0;
    this.stateId = 0;
    this.licenseTypeId = 0;
    this.investigatorDocumentType = InvestigatorDocumentType.License;
  }

  investigatorDocumentType: InvestigatorDocumentType;
  licenseTypeId: number;
  licenseTypeName: string;
  licenseNumber: string;
  expiryDate: Date;
  hasUploadedLicenseFile: boolean;
  fileName: string;
  stateId: number;
  stateName: string;
  countryId: number;
  countryName: string;
  investigatorInfoId: number;
}

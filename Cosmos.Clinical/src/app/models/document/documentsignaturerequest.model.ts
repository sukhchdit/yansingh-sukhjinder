import { BaseEntity } from '../baseentity.model';
import { DocumentSignatureType } from './documentmastersignature.model';

export class DocumentSignatureRequest extends BaseEntity {
  documentMasterSignatureId: number;
  documentMasterId: number;
  documentCategory: string;
  documentType: string; 
  title: string;
  documentNumber: string;
  version: string;
  uploadedBy: string;
  uploadedFileName: string;
  documentDate: Date;
  expirationDate: Date;
  signatureDate: Date;
  documentSignatureType: DocumentSignatureType;
  signOrder: number;
  documentGuid: string;
}

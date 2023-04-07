import { BaseEntity } from '../baseentity.model';

export enum BlindedType { Both, DoubleBlinded, Blinded }
export enum DocumentType { Current, Draft, Inactive }

export class DocumentMaster extends BaseEntity {
  title: string;
  blindedType: BlindedType;
  version: string;
  documentNumber: string;
  comments: string;
  documentDate: any;
  expirationDate: any;
  displayFileName: string;
  uploadedFileName: string;
  isSignatureRequired: boolean;
  signatureDueDate: Date;
  isCertifiedCopy: boolean;
  certifiedBy: number;
  certifiedDate: any;
  documentGuid: string;
  documentLifeCycleStageId: number;
  documentTypeId: number;
  researchOrganizationId: number;
  documentStatus: DocumentType;
  documentCategoryId: number;
  uploadedBy: number;
  templateId: string;
  embeddedTemplateSessionURL: string;
  siteGuid: string;
  sponsorsitestudycdainvitationId: number;
  studyGuid: string;
  organizationInfoId: number;
  parentDocGuid: string;
  }

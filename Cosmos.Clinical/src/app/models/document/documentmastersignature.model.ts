import { BaseEntity } from '../baseentity.model';
export enum DocumentSignatureType { ApproveDocument = 1, AcknowledgeDocument, DocumentTraining, ReviewApproveDocument, ReviewDocument, SignDocument,Subject,SubjectGuardian }
export class DocumentMasterSignature extends BaseEntity {
  documentSignatureType: DocumentSignatureType;
  signatureDate: Date;
  signedBy: number;
  signOrder: number;
  signedByName: string;
  documentMasterId: number;
  folderId: number;
  embeddedSigningSessionURL: string;
  embeddedToken: string;
  signatureImage: string;
}

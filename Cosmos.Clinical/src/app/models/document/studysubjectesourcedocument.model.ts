import { BaseEntity } from "../baseentity.model";
import { DocumentSignatureType } from "./documentmastersignature.model";

export enum StudySubjectEsourceDocumentType { Labs = 1, EKG, Images, AE_SAE, IP, ICF, Medical_Records, eSource }

export class StudySubjectEsourceDocument extends BaseEntity {
  title: string;
  comments: string;
  displayFileName: string;
  uploadedFileName: string;
  eTag: string;
  versionETag: string;
  awsBucketUrl: string;
  documentType: string;
  size: number;
  documentGuid: string;
  signOffInvestigator: number;
  studyVisitTrackingId: number;
  studySubjectEsourceDocumentType: StudySubjectEsourceDocumentType;
  subjectId: number;
  sponsorSiteStudyCDAInvitationId: number;
  isSignedOffByInvestigator: boolean;
  siteId: number;
  documentSignatureType: DocumentSignatureType;
  signatureImage: string;
}

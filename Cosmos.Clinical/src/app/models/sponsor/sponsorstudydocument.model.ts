import { BaseEntity } from '../baseentity.model';

export enum DocumentType { StudySynopsis = 1, StudyProtocol, StudyIB, StudyCDA }

export class SponsorStudyDocument extends BaseEntity {
  constructor() {
    super();
    this.documentType = DocumentType.StudySynopsis;
  }
  documentType: DocumentType;
  uploadedFileName: string;
  sponsorStudyInfoId: number;
  documentTypeName: string;
  isSentForStudy: boolean;
  templateId: string;
  embeddedTemplateSessionURL: string;
  isTemplateReady: boolean;  
}

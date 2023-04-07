import { BaseEntity } from '../baseentity.model';

export class DocumentHistory extends BaseEntity {
  action: string;
  documentMasterId: number;
}

export class DocumentAction {
  DOCUMENT_CREATED : string = "Document Created";
  DOCUMENT_UPDATED: string = "Document Updated";
  DOCUMENT_VIEWED: string = "Document Viewed";
  DOCUMENT_DOWNLOADED: string = "Document Downloaded";
}

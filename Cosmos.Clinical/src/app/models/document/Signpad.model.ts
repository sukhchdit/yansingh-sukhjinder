import { BaseEntity } from '../baseentity.model';
import { DocumentSignatureRequest } from './documentsignaturerequest.model';

export class SignPad extends BaseEntity {
  path: string;
  base64String: string;
  documentSignatureRequestViewModel: DocumentSignatureRequest;
}

import { BaseEntity } from '../baseentity.model';
import { DocumentType } from '../document/documenttype.model';
import { Role } from '../role.model';

export class DocumentTypeRoleModel extends BaseEntity {
  documentTypeId: number;
  documentType: DocumentType;
  roleId: number;
  role: Role;
  read: boolean;
  write: boolean;
  execute: boolean;
  share: boolean;
  certify: boolean;
  upload: boolean;
  validate: boolean;
  archive: boolean;
}

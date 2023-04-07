import { BaseEntity } from '../baseentity.model';
import { OrganizationType } from '../organization/organizationinfo.model';

export class DocumentOrganization extends BaseEntity {
  documentMasterId: number;
  organizationType: OrganizationType;
  uploadedFor: number;
}

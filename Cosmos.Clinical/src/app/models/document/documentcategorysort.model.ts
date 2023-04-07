import { BaseEntity } from '../baseentity.model';
import { DocumentCategory } from './documentcategory.model';

export class DocumentCategorySort extends BaseEntity {
  sortOrder: number;
  documentCategoryId: number;
  documentCategory: DocumentCategory;
  siteInfoId: string;
}

import { BaseEntity } from '../baseentity.model';
import { DocumentType } from './documenttype.model';

export enum DocumentSubCategory { PersonalDocuments = 1, StudyDocuments }

export class DocumentCategory extends BaseEntity {
  name: string;
  organizationType: number;
  eRegulatoryCatalognumber: string;
  documentSubCategory: number;
  documentCategoryGuid: string;
  documentTypes: DocumentType[]=[];
}

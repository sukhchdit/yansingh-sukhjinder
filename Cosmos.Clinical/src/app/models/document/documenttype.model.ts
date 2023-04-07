import { BaseEntity } from '../baseentity.model';
import { LogTypeEnum } from '../logs/logtype.enum';

export class DocumentType extends BaseEntity {
  name: string;
  documentCategoryId: number;
  needeSignGenie: boolean;
  logType: LogTypeEnum;
  documentTypeGuid: string;
}

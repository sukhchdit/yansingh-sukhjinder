import { BaseEntity } from '../baseentity.model';
import { TMFSection } from './tmfsection.model';


export class TMFZone extends BaseEntity {
  constructor() {
    super();
  }
  zoneName: string;
  zoneCode: string;
  tmfSections?: TMFSection[] = [];
}

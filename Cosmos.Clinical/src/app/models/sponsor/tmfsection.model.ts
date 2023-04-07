import { BaseEntity } from '../baseentity.model';
import { TMFArtifact } from './tmfartifact.model';


export class TMFSection extends BaseEntity {
  constructor() {
    super();
  }
  sectionName: string;
  sectionCode: string;
  artifacts?: TMFArtifact[] = [];
  zoneId:number;
}

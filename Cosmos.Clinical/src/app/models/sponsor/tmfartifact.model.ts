import { BaseEntity } from '../baseentity.model';


export class TMFArtifact extends BaseEntity {
  constructor() {
    super();
  }
  artifactName: string;
  artifactCode: string;
  sectionId:number;
}

import { BaseEntity } from '../baseentity.model';
export class StudyCenterNews extends BaseEntity {
  constructor() {
    super();
  }
  sponsorstudyinfoid: number;
  newsTitle: string;
  newsContent: string;
  studyIcon: string;
  location: string;
  studycenternewsGuid: string;
}

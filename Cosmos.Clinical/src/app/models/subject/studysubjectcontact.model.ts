import { BaseAddress } from '../baseaddress.model';

export enum Relationship { Daughter = 1, Son, Parent, Sibling, Spouse, Friend, OtherRelative }

export class StudySubjectContact extends BaseAddress {
  constructor() {
    super();
    this.relationship = 0;
  }

  contactName: string;
  relationship: Relationship;

  studySubjectId: number;

}

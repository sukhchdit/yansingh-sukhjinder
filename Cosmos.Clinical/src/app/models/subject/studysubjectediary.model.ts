import { BaseEntity } from '../baseentity.model';
import { SponsorStudyeDiary } from '../sponsor/sponsorstudyediary.model';

export enum Attempt { New = 0, Opened, Completed,Expired }

export class StudySubjecteDiary extends BaseEntity {
  constructor() {
    super();
    this.isAttempted = Attempt.New;
  }
    
  isAttempted: Attempt;
  eDiaryKey: string;
  resultPercentage: number;

  sponsorStudyeDiaryId: number;
  sponsorStudyeDiary: SponsorStudyeDiary;
  studySubjectId: number;

}

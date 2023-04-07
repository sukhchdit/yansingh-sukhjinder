import { BaseEntity } from '../baseentity.model';
import { ControlType } from '../ediary/ediaryquestionnairetemplate.model';
import { SponsorStudyeDiaryOption } from './sponsorstudyediaryoption.model';

export class SponsorStudyeDiaryQuestionnaire extends BaseEntity {
  constructor() {
    super();
    this.controlType = 0;
    this.isNumeric = false;
    this.sponsorStudyOptions = [];
  }

  name: string;
  isQualifyingeDiary: boolean;

  title: string;
  controlType: ControlType;
  isNumeric: boolean;
  maxLength: number;
  sortOrder: number;

  sponsorStudyOptions: SponsorStudyeDiaryOption[]=[];

  sectionId: number;
  sponsorStudyInfoId: number;

}

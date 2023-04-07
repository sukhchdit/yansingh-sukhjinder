import { BaseEntity } from '../baseentity.model';
import { ControlType } from './questionnairetemplate.model';
import { StudyOption } from './studyoption.model';

export class StudyQuestionnaire extends BaseEntity {

  title: string;
  controlType: ControlType;
  isNumeric: boolean;
  maxLength: number;
  sortOrder: number;
  studyOptions: StudyOption[] = [];

  sectionId: number;
  sponsorStudyInfoId: number;

}

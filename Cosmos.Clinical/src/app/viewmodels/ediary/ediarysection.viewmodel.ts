import { StudyeDiaryAnswerViewModel } from './studyediaryanswer.viewmodel';

export class eDiarySectionViewModel {

  id: number;
  sectionName: string;
  sortOrder: number;
  studyeDiary: StudyeDiaryAnswerViewModel[] = [];

  organizationInfoId: number;

}

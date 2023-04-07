import { StudyeDiaryAnswerViewModel } from './studyediaryanswer.viewmodel';

export class SectionViewModel {

  id: number;
  sectionName: string;
  sortOrder: number;
  studyeDiary: StudyeDiaryAnswerViewModel[] = [];

  organizationInfoId: number;

}

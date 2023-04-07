export class StudyQuestionnaireViewModel {
  
  studyQuestionnaireList: StudyQuestionnaireList[] = [];
  sponsorStudyInfoId: number;
  sectionId: number;
}

export class StudyQuestionnaireList {
  questionnaireTemplateId: number;
  sortOrder: number;
}

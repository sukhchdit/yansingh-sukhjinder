import { CommonQuestionnaireTemplate } from "../../../models/common/questionnaire/commonquestionnairetemplate.model";

export class CommonSectionViewModel {
  constructor() {
    this.commonQuestionnaireTemplates = [];
  }

  commonQuestionnaireTemplates: CommonQuestionnaireTemplate[] = [];
}

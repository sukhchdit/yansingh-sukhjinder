import { eSourceSubjectQuestionnaire } from "../../models/esource/questionnaire/esourcesubjectquestionnaire.model";
import { eSourceSubjectQuestionnaireAudit } from "../../models/esource/questionnaire/esourcesubjectquestionnaireaudit.model";

export class eSourceSubjectQuestionnaireWithAuditViewModel {
  constructor() {
    this.questionnaire = new eSourceSubjectQuestionnaire();
    this.audit = new eSourceSubjectQuestionnaireAudit();
  }

  questionnaire: eSourceSubjectQuestionnaire;
  audit: eSourceSubjectQuestionnaireAudit;
}

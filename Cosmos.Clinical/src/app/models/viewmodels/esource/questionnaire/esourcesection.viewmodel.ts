import { eSourceSection } from "../../../esource/questionnaire/esourcesection.model";
import { eSourceSubjectQuestionnaire } from "../../../esource/questionnaire/esourcesubjectquestionnaire.model";

export class eSourceSectionViewModel extends eSourceSection {
  constructor() {
    super();
    this.esourceSubjectQuestionnaires = [];
  }
  esourceSubjectQuestionnaires: eSourceSubjectQuestionnaire[];
}

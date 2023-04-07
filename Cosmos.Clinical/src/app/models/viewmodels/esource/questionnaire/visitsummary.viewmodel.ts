import { eSourceSubjectQuestionnaire } from "../../../esource/questionnaire/esourcesubjectquestionnaire.model";
import { StudyVisitTrackingNote } from "../../../site/studyvisittrackingnote.model";

export class VisitSummaryViewModel {
  constructor() {
    this.esourceSubjectQuestionnaires = [];
    this.studyVisitTrackingNotes = [];
  }
  esourceSubjectQuestionnaires: eSourceSubjectQuestionnaire[];
  studyVisitTrackingNotes: StudyVisitTrackingNote[];
}

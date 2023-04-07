export class StudyVisitTrackingNextPreviousViewModel {
  constructor() {
    this.previousStudyVisitTemplateId = 0;
    this.previousStudySubjectId = 0;
    this.previousStudyVisitTrackingId = 0;

    this.nextStudyVisitTemplateId = 0;
    this.nextStudySubjectId = 0;
    this.nextStudyVisitTrackingId = 0;
     
    this.washoutStudySubjectId = 0;
    this.washoutStudyVisitTemplateId = 0;
    this.washoutStudyVisitTrackingId = 0;    
  }

  previousStudyVisitTemplateId: number;
  previousStudySubjectId: number;
  previousStudyVisitTrackingId: number;

  nextStudyVisitTemplateId: number;
  nextStudySubjectId: number;
  nextStudyVisitTrackingId: number;

  washoutStudySubjectId: number;
  washoutStudyVisitTemplateId: number;
  washoutStudyVisitTrackingId: number;
}

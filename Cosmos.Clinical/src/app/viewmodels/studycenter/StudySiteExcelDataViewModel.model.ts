import { StudySite } from '../../models/studycenter/studysite.model';

export class StudySiteExcelDataViewModel {
  constructor() {
    this.studySite = new StudySite();
  }

  studySite: StudySite;
  isValid: boolean;
}

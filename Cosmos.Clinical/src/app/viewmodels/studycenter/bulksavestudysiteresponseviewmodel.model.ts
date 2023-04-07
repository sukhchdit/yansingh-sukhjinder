import { StudySite } from '../../models/studycenter/studysite.model';

export class BulkSaveStudySiteResponseViewModel {
  constructor() {
    this.duplicateSites = [];
  }
  saved: number;
  duplicateSites: StudySite[] = [];
}

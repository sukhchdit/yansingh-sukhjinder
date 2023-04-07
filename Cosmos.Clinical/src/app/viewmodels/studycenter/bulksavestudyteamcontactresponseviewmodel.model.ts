import { StudyTeamContact } from '../../models/studycenter/studyteamcontact.model';

export class BulkSaveStudyTeamContactResponseViewModel {
  constructor() {
    this.duplicateContacts = [];
  }
  saved: number;
  duplicateContacts: StudyTeamContact[] = [];
}

import { StudyTeamContact } from '../../models/studycenter/studyteamcontact.model';

export class StudyTeamContactExcelDataViewModel {
  constructor() {
    this.studyTeamContact = new StudyTeamContact();
  }

  studyTeamContact: StudyTeamContact;
  isValid: boolean;
}

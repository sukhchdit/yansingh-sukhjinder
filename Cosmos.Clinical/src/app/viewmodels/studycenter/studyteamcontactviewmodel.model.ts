import { ContactStatus } from '../../models/studycenter/studyteamcontact.model';
export class StudyTeamContactViewModel {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  fullname: string;
  rolename: string;
  phone: string;
  email: string;
  countryname: string;
  contactstatus: ContactStatus;
  contactstatustitle: string;
  sitenumber: string;
}

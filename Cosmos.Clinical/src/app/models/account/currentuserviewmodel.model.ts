import { StudyUserInterfaceModel } from '../userrrolemanagement/studyuserinterface.model';
import { UserRole } from './user.model';

export class CurrentUserViewModel {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userRole: UserRole;
  organizationContactId: number;
  lastLoginDate: string;
  rememberMe: boolean;
  enableEmailApproval: boolean;
  role: any;
  roleType: any;
}

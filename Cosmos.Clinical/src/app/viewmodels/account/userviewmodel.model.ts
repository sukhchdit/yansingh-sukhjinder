import { UserStatus } from '../../models/account/user.model';
import { OrganizationType } from '../../models/organization/organizationinfo.model';

export class UserViewModel {
  id: number;
  name: string;
  organizationContactId: number;
  email: string;
  phone: string;
  organizationName: string;
  organizationType: OrganizationType;
  date: Date;
  userStatus: UserStatus;
}

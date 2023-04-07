import { UserRole } from "../account/user.model";
import { BaseEntity } from "../baseentity.model";

export class UserInterfaceUserRole extends BaseEntity {
  userRole: UserRole;
  userInterfaceId: number;
}

import { BaseEntity } from "../baseentity.model";
import { Role } from "../role.model";
import { UserInterfaceActionButton } from "./userinterfaceactionbutton.model";

export class UserInterfaceActionButtonRole extends BaseEntity {
  isApplicable: boolean;
  userInterfaceActionButtonId: number;
  userInterfaceActionButton: UserInterfaceActionButton;
  roleId: number;
  role: Role;
}

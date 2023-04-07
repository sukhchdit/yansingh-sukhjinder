import { UserInterface } from "../../models/userrrolemanagement/userinterface.model";

export class UserInterfaceActionButtonRoleViewModel {
  userInterface: UserInterface;
  roleButtons: RoleButtonsViewModel[];
}

export class RoleButtonsViewModel {
  roleId: number;
  roleTypeId: number;
  roleName: string;
  roleTypeName: string;
  roleButtons: RoleButton[];
}

export class RoleButton {
  buttonId: number;
  buttonName: string;
  userInterfaceActionButtonId: number;
}

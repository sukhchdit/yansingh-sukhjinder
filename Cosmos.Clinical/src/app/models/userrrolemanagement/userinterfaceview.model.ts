import { ActionButtonViewModel } from "./actionbuttonview.model";

export class UserInterfaceViewModel {
  uiId: number;
  uiTitle: string;
  uiLocation: string;
  uiUrl: string;
  uiIsExternal: boolean;
  uiIcon: string;
  uiType: string;
  uiNavigationId: string;
  uiParentId: number;
  isApplicable: boolean;
  roleId: number;
  isNavMenuItem: boolean;
  userInterfaceGuid: string;
  children: UserInterfaceViewModel[];
  userInterfaceActionButtons: ActionButtonViewModel[];
}

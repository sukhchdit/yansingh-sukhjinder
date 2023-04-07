import { BaseEntity } from "../baseentity.model";
import { UserInterfaceActionButton } from "./userinterfaceactionbutton.model";
import { UserInterfaceUserRole } from "./userinterfaceuserrole.model";

export class UserInterface extends BaseEntity {
  constructor() {
    super();
    this.type = 'item';
  }
  title: string;
  location: string;
  url: string;
  description: string;
  isExternal: boolean;
  icon: string;
  type: string;
  navigationId: string;
  parentId: number;
  isNavMenuItem: boolean;
  userInterfaceGuid: string;
  userInterfaceScreenshot: string;
  children: UserInterface[] = [];
  userInterfaceActionButtons: UserInterfaceActionButton[] = [];
  userInterfaceUserRoles: UserInterfaceUserRole[]=[];
}

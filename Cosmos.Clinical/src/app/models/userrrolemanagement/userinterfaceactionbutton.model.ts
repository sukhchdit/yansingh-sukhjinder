import { BaseEntity } from "../baseentity.model";
import { ActionButton } from "./actionbutton.model";

export class UserInterfaceActionButton extends BaseEntity {
  constructor() {
    super();
    this.actionButton = new ActionButton();
  }
  userInterfaceId: number;
  actionButtonId: number;
  actionButton: ActionButton;
}

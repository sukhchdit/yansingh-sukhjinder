import { BaseEntity } from "../baseentity.model";
export enum MessageStatus { Pending = 1, Send, Error }
export class SmsNotification extends BaseEntity {
  messageId: string;
  subjectId: number;
  messageFrom: string;
  messageTo: string;
  messageSource: string;
  message: string;
  messageResponse: string;
  messageStatus: MessageStatus;
  sponsorSiteStudyCDAInvitationId: number;
}

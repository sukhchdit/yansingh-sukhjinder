import { BaseEntity } from '../baseentity.model';

export class CommentMaster extends BaseEntity {
    comment: string;
    phonecode: string;
    componentid: number;
    isreply: boolean;
    commentid: number;
    component:componentType;
    createdByUser:string;
    replyComment:string;
    replyUser:string;
}
export enum componentType {
    CTA = 1, EssentialDoc
}

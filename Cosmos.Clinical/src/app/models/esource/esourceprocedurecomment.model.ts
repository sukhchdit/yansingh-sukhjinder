import { BaseEntity } from '../baseentity.model';

export class eSourceProcedureComment extends BaseEntity {
  constructor() {
    super();
    this.isPrivate = false;    
  }

  comments: string;
  commentId: number;
  isReply: boolean;
  isPrivate: boolean;

  commentedBy: string;

  replies: eSourceProcedureComment[] = [];

  studyVisitTrackingProcedureId: number;
}

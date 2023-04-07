import { Injectable } from '@angular/core';
import { EndPointService } from '../endpoint.service';
import { CommentMaster } from 'src/app/models/common/commentPopup.model';
import { AuthService } from '../account/auth.service';

@Injectable()
export class CommentPopupService {
  private readonly _getAllByComponentIdURL: string = "api/Comment/GetAllCommentByComponentId";
  private readonly _SaveURL: string = "api/Comment/Create";

  constructor(private endpoint: EndPointService,private authService: AuthService) {
  }

  GetAllCommentByComponentId(componentId:number, componentType: string) {
    return this.endpoint.get<CommentMaster[]>(this._getAllByComponentIdURL+"?componentId="+componentId+"&type="+componentType);
  }

  save(commentMaster: CommentMaster) {
   // if (commentMaster.id <= 0)
    commentMaster.createdBy = this.authService.currentUser.id;
    //commentMaster.updatedBy = this.authService.currentUser.id;
    return this.endpoint.addupdate<CommentMaster>(commentMaster, this._SaveURL);
  }

}

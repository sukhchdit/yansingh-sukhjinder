import { Component } from '@angular/core';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
import { EconsentComments } from 'src/app/models/econsent/enum/econsent.enum';
declare var window: any;

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss']
})
export class CommentsModalComponent {
  commentModal: any;
  commentText: string| null;
  commentsList: EconsentComments[] = [];

  data: any;
  constructor(private eConsentService: EconsentService) { }
 
  ngOnInit() {
    this.commentModal = new window.bootstrap.Modal(
      document.getElementById('comment')
    );
  }

  openModal(ModalData) {
    this.data = ModalData;
    if(this.data && this.data.subjectId){
      this.onLoad(this.data.subjectId);
    } 
    this.commentModal.show();
  }
  closeModal() {
    this.commentModal.hide();
  }

  onLoad(subjectId){
    this.eConsentService.getComments(subjectId).subscribe((res: EconsentComments[])=> {
      // this.loadingIndicator = false;
        this.commentsList = res;
   },
   err => {
    //  this.loadingIndicator = false;
    //  this.toastyService.showToast("Comments Request", "Failed to load EConsent Comments Data.", ToastType.error);
   });
  
   }
    addComment(){
      if(this.commentText){
        let data= {
          Remarks : this.commentText,
          SubjectId : this.data?.subjectId
        }
        // this.loadingIndicator = true;
        this.eConsentService.saveEconsentComment(data).subscribe((res)=> {
          // this.loadingIndicator = false;
          if(res){
            this.commentText = null;
            this.onLoad(this.data?.subjectId);
          }
        },
        err => {
          // this.loadingIndicator = false;
          // this.toastyService.showToast("Comments Submit", "Failed to Submit EConsent Comments.", ToastType.error);
        });
       
      }
    }
}

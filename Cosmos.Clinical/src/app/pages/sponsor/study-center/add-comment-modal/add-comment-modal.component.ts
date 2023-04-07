import { Component } from '@angular/core';
import { faStarOfLife} from '@fortawesome/free-solid-svg-icons';
declare var window: any;
@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.scss'],
})
export class AddCommentModalComponent {
  faStarOfLife=faStarOfLife;
  commentModal: any;

  ngOnInit() {
    this.commentModal = new window.bootstrap.Modal(
      document.getElementById('commentModal')
    );
  }

  openModal() {
    this.commentModal.show();
  }
  closeModal() {
    this.commentModal.hide();
  }
}

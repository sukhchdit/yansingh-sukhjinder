import { Component } from '@angular/core';

declare var window: any;
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  confirmationModal: any;

  ngOnInit(): void {
    this.confirmationModal = new window.bootstrap.Modal(
      document.getElementById('confirmationModal')
    );
  }
  openModal() {
    this.confirmationModal.show();
  }

  closeModal() {
    this.confirmationModal.hide();
  }
}

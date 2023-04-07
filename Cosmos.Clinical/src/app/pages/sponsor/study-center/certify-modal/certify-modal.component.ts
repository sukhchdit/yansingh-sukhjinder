import { Component } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-certify-modal',
  templateUrl: './certify-modal.component.html',
  styleUrls: ['./certify-modal.component.scss'],
})
export class CertifyModalComponent {
  certifyModal: any;

  ngOnInit() {
    this.certifyModal = new window.bootstrap.Modal(
      document.getElementById('certifyModal')
    );
  }

  openModal() {
    this.certifyModal.show();
  }
  closeModal() {
    this.certifyModal.hide();
  }
}

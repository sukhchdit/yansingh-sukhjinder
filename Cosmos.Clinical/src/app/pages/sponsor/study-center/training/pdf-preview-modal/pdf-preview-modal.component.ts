import { Component } from '@angular/core';

declare var window: any;
@Component({
  selector: 'app-pdf-preview-modal',
  templateUrl: './pdf-preview-modal.component.html',
  styleUrls: ['./pdf-preview-modal.component.scss'],
})
export class PdfPreviewModalComponent {
  uploadModal: any;

  ngOnInit(): void {
    this.uploadModal = new window.bootstrap.Modal(
      document.getElementById('uploadModal')
    );
  }
  openModal() {
    this.uploadModal.show();
  }

  closeModal() {
    this.uploadModal.hide();
  }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/account/services/auth.service';
import { DocumentMasterService } from 'src/app/core/services/document/documentmaster.service';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
import { HttpEventType } from '@angular/common/http';

declare var window: any;

@Component({
  selector: 'app-paper-sign-modal',
  templateUrl: './paper-sign-modal.component.html',
  styleUrls: ['./paper-sign-modal.component.scss']
})
export class PaperSignModalComponent {
  historyModal: any;
  public uploadedFiles: Array<File> = [];
  isNoFileSelected: boolean;
  documentId: string;
  documentDetails: any;
  progress: any = 0;
  currentFile: File;
  uploadPaperSignConsent: File = null;
  uploadPaperSignName: string;
  data: any;

  constructor(private authService: AuthService, public eConsentService: EconsentService, private documentService: DocumentMasterService) {}

  uploadSignDocument() {
    console.log(this.uploadPaperSignConsent);
    console.log(this.uploadPaperSignName);
    // this.toastyService.showToast("Success", 'Successfully uploaded Signed Doc', ToastType.success);
  }

  ngOnInit() {
    this.historyModal = new window.bootstrap.Modal(
      document.getElementById('paperSignModal')
    );
  }
  openModal(modalData: any) {
    if(modalData) {
      this.data = modalData
    }
    this.historyModal.show();
    this.uploadPaperSignConsent = null;
  }
  closeModal() {
    this.historyModal.hide();
  }
  onFileChange(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      let fileFormat = file.name.split('.')[1].toLowerCase();
      if (fileFormat === 'pdf' || fileFormat === 'doc' || fileFormat === 'docx') {
        this.uploadPaperSignConsent = file
        this.uploadedFiles = e.target.files;
        this.isNoFileSelected = false;
      }
    }
    else {
      this.isNoFileSelected = true;
    }
  }

  uploadEConsentDocument() {
    // this.loadingIndicator = true;
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {
      const fileToUpload = this.uploadedFiles[0];
      this.currentFile = <File>this.uploadedFiles[0];
      const strFileNameArray = fileToUpload.name.split(".");
      const strExtension = strFileNameArray[(strFileNameArray.length - 1)];      
      if (strExtension.toLocaleLowerCase() === "pdf") {
        if (fileToUpload.size <= 40097152) {
          const formData = new FormData();
          formData.append('file', fileToUpload, fileToUpload.name);
          formData.append('documentId', this.data.documentId);
          formData.append('subjectId', this.data.subjectId);
          formData.append('econsentId', this.data.econsentId);
          formData.append('createdBy', this.authService.currentUser.id.toString());
          formData.append('cDAInvitationId', this.authService.sponsorSiteStudyCdaInvitationId.toString());
          let progress;
          this.documentService.uploadEConsentDocument(formData).subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                progress = Math.round(100 * event.loaded / event.total);
                if (progress == 100) {
                  progress = 99;
                }
                this.progress = progress;
                setTimeout(() => {
                  this.progress = 100;
                  // this.toastyService.showToast("Success", 'Signed doc successfully uploaded.', ToastType.success);
                  // this.loadingIndicator = false;
                  // this.dialogRef.close("1");
                  this.closeModal();
                }, 2000);
              }
            },
            err => {
              this.progress = 0;              
              console.log(err);
              this.currentFile = undefined;
              // this.loadingIndicator = false;
              // this.toastyService.showToast("Upload File Error", "Failed to upload file", ToastType.error);
            })
        }
        else {
          // this.loadingIndicator = false;
          // this.toastyService.showToast("Upload File Error", "File size should not be more than 40 MB", ToastType.error);
        }
      }
      else {
        // this.loadingIndicator = false;
        // this.toastyService.showToast("Upload File Error", "Select file of type pdf only", ToastType.error);
      }

    }
    else {
      // this.loadingIndicator = false;
      // this.toastyService.showToast("Upload File Error", "Please select atleast one file of type pdf only", ToastType.error);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MaidService } from '../../../core/services/maid/maid.service';
import { ToastNotificationService, ToastType } from '../../../core/services/toastnotification.service';
import { MaidDetail } from '../../../models/maid/maiddetail.model';

@Component({
  selector: 'app-registermaid',
  templateUrl: './registermaid.component.html',
  styleUrls: ['./registermaid.component.scss']
})
export class RegisterMaidComponent implements OnInit {
  tabselectornew:string = 'basictab';

  maidDetail = new MaidDetail();
  public uploadedFiles: any; /*Array<File> = []*/

  constructor(private maidService: MaidService, private toastyService: ToastNotificationService) {

  }

  ngOnInit() {
    //this.maidDetail = new MaidDetail();
  }

  tabsSliderNew(val) {
    this.tabselectornew = val;
  }

  handleFileInput(files: FileList) {
    this.uploadedFiles = files.item(0);
  }

  uploadDocumentFile() {
    if (this.uploadedFiles) {
      const fileToUpload = this.uploadedFiles;
      const strFileNameArray = fileToUpload.name.split(".");
      const strExtension = strFileNameArray[(strFileNameArray.length - 1)];
      const fileName = 'img'+this.maidDetail.id + "." + strExtension;
      if (strExtension.toLocaleLowerCase() === "jpg" || strExtension.toLocaleLowerCase() === "jpeg" || strExtension.toLocaleLowerCase() === "png") {
        if (fileToUpload.size <= 4009715) {
          const formData = new FormData();
          formData.append('file', fileToUpload, fileName);
          formData.append('maidId', this.maidDetail.id.toString());
          this.maidService.uploadDocumentFile(formData).subscribe(response => {
            if (response) {
              this.toastyService.showToast("Upload Photo", "Photo uploaded successfully", ToastType.success);
            }
          },
            err => {
              this.toastyService.showToast("Upload File Error", "Failed to upload the photo", ToastType.error);
            });
        }
        else {
          //this.loadingIndicator = false;
          this.toastyService.showToast("Upload File Error", "File size should not be more than 4 MB", ToastType.error);
        }
      }
      else {
        //this.loadingIndicator = false;
        this.toastyService.showToast("Upload File Error", "Select file of type .docx .doc or pdf only", ToastType.error);
      }

    }
    else {
      ///this.loadingIndicator = false;
      this.toastyService.showToast("Upload File Error", "Please select atleast one file of type .docx .doc or pdf only", ToastType.error);
    }
  }


  saveMaidBasicDetails() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      if (response) {
        this.maidDetail = response;
        this.toastyService.showToast("Maid basic detail", "Basic detail saved successfully", ToastType.success);
        this.tabselectornew = 'skillstab';
        this.tabsSliderNew('skillstab');
      }
      else {
        this.toastyService.showToast("Maid basic detail", "failed to save maid basic details", ToastType.error);
      }
    });
  }

  saveMaidSkills() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      if (response) {
        this.toastyService.showToast("Maid skills", "Maid skills saved successfully", ToastType.success);
        this.tabselectornew = 'questionstab';
        this.tabsSliderNew('questionstab');
      }
      else {
        this.toastyService.showToast("Maid skills", "failed to save maid skills", ToastType.error);
      }
    });
  }

  saveMaidExperience() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      this.tabselectornew = 'questionstab';
      this.tabsSliderNew('questionstab');
    });
  }

  saveMaidGeneralquestions() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      if (response) {
        this.toastyService.showToast("Maid general questions", "Maid general questions saved successfully", ToastType.success);
        this.tabselectornew = 'savetab';
        this.tabsSliderNew('savetab');
      }
      else {
        this.toastyService.showToast("Maid general questions", "failed to save maid general questions", ToastType.error);
      }
    });
  }

  saveMaidPhoto() {
    this.uploadDocumentFile();
  }

  previous(tabName) {
    this.tabselectornew = tabName;
    this.tabsSliderNew(tabName);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faTrashCan, faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { DBkeys } from 'src/app/account/services/db-Keys';
import { LocalStoreManager } from 'src/app/account/services/local-store-manager.service';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { CurrentUserViewModel } from 'src/app/models/account/currentuserviewmodel.model';
import { eVaultTypeOfReports } from 'src/app/models/evault/evault.enum';
declare var window: any;

@Component({
  selector: 'app-upload-safety-document',
  templateUrl: './upload-safety-document.component.html',
  styleUrls: ['./upload-safety-document.component.scss']
})

export class UploadSafetyDocumentComponent implements OnInit {
  @Output() saveUploadResponse : EventEmitter<any> = new EventEmitter();
  constructor(public formBuilder: FormBuilder, public evaultService: EvaultService, public localStorage: LocalStoreManager) {}
  faTrashCan= faTrashCan;
  faStarOfLife=faStarOfLife;
  uploadDocumentModal:any;
  safetyDocSources = ['MedWatch 3500A', 'CIOMS', 'Other'];
  eosDocSources = ['eCRF-EDC', 'eCOA', 'IWRS', 'Acknowledment Letter', 'Other'];
  docSources: any;
  eosDocumentUser: boolean = false;
  saveLoadingIndicator: boolean;
  uploadSafetyFormSubmit: boolean = false;
  studyId: any;
  siteId: any;
  eVaultTypeOfReports = eVaultTypeOfReports;
  eVaultReportsOptions = Object.keys(eVaultTypeOfReports).map(key => eVaultTypeOfReports[key]).filter(value => typeof value === 'string');
  uploadSafetyDocument = this.formBuilder.group({
    docSource: ['',Validators.required],
    controlNumber: ['', Validators.required],
    reportNumber: ['', Validators.required],
    caseNumber: ['', Validators.required],
    worldWideNumber: [''],
    version: ['', Validators.required],
    reportType: ['', Validators.required],
    comments: [''],
    uploadFile: ['', Validators.required],
    eVaultSafetyFile: [null, Validators.required],
  });
  ngOnInit(){
    this.uploadDocumentModal = new window.bootstrap.Modal(
      document.getElementById('uploadDocumentModal')
    );
  }

  openModal(formData){
    if (formData) {
      this.studyId = (formData) ? formData['StudyId'] : null;
      this.siteId = (formData && formData['SiteId']) ? formData['SiteId'] : null;
    }
    if (this.siteId == null) {
      this.eosDocumentUser = false;
      this.docSources = this.safetyDocSources;
    } else {
      this.eosDocumentUser = true;
      this.docSources = this.eosDocSources;
      this.uploadSafetyDocument.controls['reportType'].setValue('EOS');
      this.uploadSafetyDocument.controls['reportType'].updateValueAndValidity();
    }
    this.uploadDocumentModal.show();
  }

  closeSafetyForm() {
    this.uploadSafetyFormSubmit = false;
    this.uploadSafetyDocument.reset();
    this.uploadDocumentModal.hide();
  }
  get uploadSafetyFormControl() {
    return this.uploadSafetyDocument.controls;
  }

  onFileChange(e) {
    if (e.target.files.length > 0) {
      this.uploadSafetyDocument.patchValue({
        eVaultSafetyFile: null
      });

      // this.uploadSafetyDocument.controls.eVaultSafetyFile.touched = true;
      const file = e.target.files[0];
      console.log(file);
      let fileFormat = file.name.split('.')[1].toLowerCase();
      if (fileFormat === 'pdf' || fileFormat === 'doc' || fileFormat === 'docx') {
        this.uploadSafetyDocument.patchValue({
          eVaultSafetyFile: file
        })
      }
    }
  }

  safetyFormSubmit() {
    this.uploadSafetyFormSubmit = true;
    if (this.eosDocumentUser) {
      this.uploadSafetyDocument.controls['controlNumber'].setValue(' ');
      this.uploadSafetyDocument.controls['reportNumber'].setValue(' ');
      this.uploadSafetyDocument.controls['caseNumber'].setValue(' ');
      this.uploadSafetyDocument.controls['version'].setValue(' ');
    }
    console.log(this.uploadSafetyDocument);

    if (this.uploadSafetyDocument.invalid) return;
    let requiredData = this.uploadSafetyDocument.value;
    this.uploadSafetyFormSubmit = false;
    this.uploadFileData(requiredData);
  }

  uploadFileData(data) {
    this.saveLoadingIndicator = true;
    if (data && data.eVaultSafetyFile) {
      const fileToUpload = data.eVaultSafetyFile;
      const fileName = fileToUpload.name;
      const formData = new FormData();
      formData.append('docSource', (data.docSource)?.toString());
      formData.append('mfrCtrlNo', (data.controlNumber)?.toString());
      formData.append('reportNumber', (data.reportNumber)?.toString());
      formData.append('caseNumber', (data.caseNumber)?.toString());
      formData.append('worldWideNumber', (data.worldWideNumber)?.toString());
      formData.append('version', (data.version)?.toString());
      formData.append('reportType', (data.reportType)?.toString());
      formData.append('comments', (data.comments)?.toString());
      if (this.siteId != null) {
        formData.append('siteId', (this.siteId)?.toString());
      }
      formData.append('studyId', (this.studyId)?.toString());
      formData.append('_file', fileToUpload, fileName)
      formData.append('uploadBy', (this.localStorage.getDataObject<CurrentUserViewModel>(DBkeys.CURRENT_USER).id).toString());

      this.evaultService.uploadEvaultFile(formData).subscribe(response => {
        if (response) {
          this.saveLoadingIndicator = false;
         // this.toastyService.showToast("Site File", "File Uploaded successfully!", ToastType.success);
         // this.dialogRef.close(response);
         this.saveUploadResponse.emit(response);
         this.uploadDocumentModal.hide();
        }
      }, err => {
        this.saveLoadingIndicator = false;
        console.log(err);
       // this.toastyService.showToast("Site File", "Failed to Upload.", ToastType.error);
      })
      this.uploadSafetyDocument.reset();
    }

  }

  onValueChange(e,f){
    this.uploadSafetyDocument.controls[f].setValue(e);
    this.uploadSafetyDocument.controls[f].updateValueAndValidity();
  }
}

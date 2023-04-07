import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/account/services/auth.service';
import { DBkeys } from 'src/app/account/services/db-Keys';
import { LocalStoreManager } from 'src/app/account/services/local-store-manager.service';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
import { CurrentUserViewModel } from 'src/app/models/account/currentuserviewmodel.model';

declare var window: any;
@Component({
  selector: 'app-e-manager-modal',
  templateUrl: './e-manager-modal.component.html',
  styleUrls: ['./e-manager-modal.component.scss'],
})
export class EManagerModalComponent {
  @Output() eManagerModalSubmit = new EventEmitter();
  EManageModal: any;
  uploadICFFormSubmit = false;
  // loadingIndicator: boolean;

  constructor(public eConsentService: EconsentService, public localStorage: LocalStoreManager, public authService: AuthService, public formbuilder: FormBuilder) {

  }
  uploadICFForm: any = this.formbuilder.group({
    ICFName: ['', [Validators.required]],
    ICFVersion: ['', [Validators.required]], //, Validators.pattern("^[0-9].*$")
    ICFApprovedDate: ['', [Validators.required]],
    ProtocolVersion: ['', [Validators.required]],
    ICFType: [null, [Validators.required]],
    ICFSource: [null, [Validators.required]],
    EffectiveDate: [''],
    EConsentFile: [null, [Validators.required]],
    ICFFile: [null, [Validators.required]],
    IsToIRBApproveCheck: [false, [Validators.requiredTrue]],
    languageId: [null, [Validators.required]],
  })  

  ngOnInit(): void {
   
  }

  resetICFForm() {
    this.uploadICFFormSubmit = false;
    this.uploadICFForm.reset();
  }
  get uploadICFFormControl() {
    return this.uploadICFForm.controls;
  }

  onValueChange(value, valueType) {
    if(valueType == 'icfType')
      this.uploadICFForm.controls['ICFType'].setValue(value);
    else if(valueType == 'icfSource')
      this.uploadICFForm.controls['ICFSource'].setValue(value);
    else if(valueType == 'language')
      this.uploadICFForm.controls['languageId'].setValue(value)
  }

  onFileChange(e) {
    if (e.target.files.length > 0) {
      this.uploadICFForm.patchValue({
        EConsentFile: null
      });
      this.uploadICFForm.controls.EConsentFile.touched = true;
      const file = e.target.files[0];
      let fileFormat = file.name.split('.')[1].toLowerCase();
      if (fileFormat === 'pdf' || fileFormat === 'doc') {
        this.uploadICFForm.patchValue({
          EConsentFile: file
        })
      }
    }
  }


  icfFormSubmit() {
    this.uploadICFFormSubmit = true;
    if (this.uploadICFForm.invalid) return;
    let requiredData = this.uploadICFForm.value;
    requiredData['StudyId'] = this.authService.sponsorStudyInfoId;
    this.uploadICFFormSubmit = false;
    this.uploadFileData(requiredData);
  }

  uploadFileData(data) {
    // this.loadingIndicator = true;
    if (data && data.EConsentFile) {
      const fileToUpload = data.EConsentFile;
      const fileName = fileToUpload.name;
      const formData = new FormData();
      formData.append('EConsentFile', fileToUpload, fileName);
      formData.append('createdBy', (this.localStorage.getDataObject<CurrentUserViewModel>(DBkeys.CURRENT_USER).id).toString());
      formData.append('icfApprovedDate', data.ICFApprovedDate);
      formData.append('protocalVersion', data.ProtocolVersion);
      formData.append('icfType', data.ICFType);
      formData.append('icfSource', data.ICFSource);
      formData.append('effectiveDate', (data.EffectiveDate != '') ? data.EffectiveDate : '');
      formData.append('studyCDAInviationId', data.StudyId);
      formData.append('icfName', data.ICFName);
      formData.append('icfVersion', data.ICFVersion);
      formData.append('languageId', data.languageId);
      this.eConsentService.saveEconsentICFData(formData).subscribe(formResponse => {
        if (formResponse) {
          this.closeModal();
          this.eManagerModalSubmit.emit(true);
          // this.toastyService.showToast("Success", "Successfully submitted.", ToastType.success);
          // this.loadingIndicator = false;
        }
      }, err => {
        console.log(err);
        // this.loadingIndicator = false;
        // this.toastyService.showToast("Error", "Error while submitting.", ToastType.error);
      });
      // this.uploadICFForm.reset();
    }

  }
  openModal() {
    this.EManageModal = new window.bootstrap.Modal(
      document.getElementById('EManageModal')
    );
    this.EManageModal.show();
  }

  closeModal() {
    // if(event)
    this.EManageModal.hide();
  }

}

import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons';
const language = [
  {
    id: 1,
    name: 'German',
  },
  {
    id: 2,
    name: 'Hindi',
  },
];
const country = [
  {
    id: 1,
    name: 'United States',
  },
  {
    id: 2,
    name: 'Afganistan',
  },
  {
    id: 3,
    name: 'Algeria',
  },
  {
    id: 4,
    name: 'Albania',
  },
];
const category = [
  {
    id: 1,
    name: 'Vendor Training',
  },
  {
    id: 2,
    name: 'Regulatiry Training',
  },
];
declare var window: any;
@Component({
  selector: 'app-upload-training-modal',
  templateUrl: './upload-training-modal.component.html',
  styleUrls: ['./upload-training-modal.component.scss'],
})
export class UploadTrainingModalComponent {
  historyModal: any;
  faStarOfLife=faStarOfLife;
  faTrashCan=faTrashCan;
  selectedDropdown = 'none';
  selectedLanguage = 'Select';
  selectedCountry = 'Select';
  selectedCategory = 'Select';
  language = language;
  country = country;
  category = category;

  ngOnInit() {
    this.historyModal = new window.bootstrap.Modal(
      document.getElementById('trainingPopup')
    );
  }

  openModal() {
    this.historyModal.show();
  }
  closeModal() {
    this.historyModal.hide();
  }
  onLanguageValueChanged(val) {
    if (val) {
      this.selectedLanguage = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onCountryValueChanged(val) {
    if (val) {
      this.selectedCountry = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onCategoryValueChanged(val) {
    if (val) {
      this.selectedCategory = val.name;
    }
    this.selectedDropdown = 'none';
  }
  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }
}

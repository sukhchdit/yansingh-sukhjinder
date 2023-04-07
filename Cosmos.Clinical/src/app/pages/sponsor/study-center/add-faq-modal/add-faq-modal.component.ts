import { Component } from '@angular/core';

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
const language = [
  {
    id: 1,
    name: 'Germany',
  },
  {
    id: 2,
    name: 'English',
  },
  {
    id: 3,
    name: 'Hindi',
  },
];
declare var window: any;
@Component({
  selector: 'app-add-faq-modal',
  templateUrl: './add-faq-modal.component.html',
  styleUrls: ['./add-faq-modal.component.scss'],
})
export class AddFaqModalComponent {
  historyModal: any;
  selectedDropdown = 'none';
  selectedCountry = 'Select';
  selectedLanguage = 'Select';

  language = language;
  country = country;

  ngOnInit() {
    this.historyModal = new window.bootstrap.Modal(
      document.getElementById('updateProfilePopup')
    );
  }

  openModal() {
    this.historyModal.show();
  }
  closeModal() {
    this.historyModal.hide()
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

  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }
}

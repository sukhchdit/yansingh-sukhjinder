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
const url_type = [
  {
    id: 1,
    name: 'Url 1',
  },
  {
    id: 2,
    name: 'Url 2',
  },
  {
    id: 3,
    name: 'Url 3',
  },
];

declare var window: any;
@Component({
  selector: 'app-add-study-url-modal',
  templateUrl: './add-study-url-modal.component.html',
  styleUrls: ['./add-study-url-modal.component.scss'],
})
export class AddStudyUrlModalComponent {
  studyUrlModal: any;
  selectedDropdown = 'none';
  selectedCountry = 'Select';
  selectedLanguage = 'Select';
  selectedUrlType = 'Select';

  urlType = url_type;
  language = language;
  country = country;

  ngOnInit() {
    this.studyUrlModal = new window.bootstrap.Modal(
      document.getElementById('studyUrlModal')
    );
  }

  openModal() {
    this.studyUrlModal.show();
  }
  closeModal() {
    this.studyUrlModal.hide();
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
  onUrlTypeValueChanged(val) {
    if (val) {
      this.selectedUrlType = val.name;
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

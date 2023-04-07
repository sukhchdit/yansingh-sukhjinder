import { Component } from '@angular/core';
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons';
const role = [
  {
    id: 1,
    name: 'ROle 1',
  },
  {
    id: 2,
    name: 'role 2',
  },
];
const state = [
  {
    id: 1,
    name: 'state 1',
  },
  {
    id: 2,
    name: 'state 3',
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
const honorific = [
  {
    id: 1,
    name: 'Mr',
  },
  {
    id: 2,
    name: 'Ms',
  },
];
declare var window: any;
@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.scss'],
})
export class UpdateProfileModalComponent {
  historyModal: any;
  faStarOfLife=faStarOfLife;
  selectedDropdown = 'none';
  selectedRole = 'Select';
  selectedCountry = 'Select';
  selectedHonorific = 'Select';
  selectedState = 'Select';
  role = role;
  honorific = honorific;
  country = country;
  state = state;
  error:boolean=true;
  ngOnInit() {
    this.historyModal = new window.bootstrap.Modal(
      document.getElementById('updateProfilePopup')
    );
  }

  openModal() {
    this.historyModal.show();
  }
  closeModal() {
    this.historyModal.hide();
  }
  onRoleValueChanged(val) {
    if (val) {
      this.selectedRole = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onStateValueChanged(val) {
    if (val) {
      this.selectedState = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onCountryValueChanged(val) {
    if (val) {
      this.selectedCountry = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onHonorificValueChanged(val) {
    if (val) {
      this.selectedHonorific = val.name;
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

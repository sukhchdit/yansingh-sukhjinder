import { Component } from '@angular/core';
import { faStarOfLife} from '@fortawesome/free-solid-svg-icons';

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

declare var window: any;
@Component({
  selector: 'app-add-site-modal',
  templateUrl: './add-site-modal.component.html',
  styleUrls: ['./add-site-modal.component.scss']
})
export class AddSiteModalComponent {
  faStarOfLife=faStarOfLife;
  siteModal: any;
  selectedDropdown = 'none';
  selectedCountry = 'Select';
  selectedState = 'Select';
  country = country;
  state = state;
  error:boolean=true;
  ngOnInit() {
    this.siteModal = new window.bootstrap.Modal(
      document.getElementById('updateProfilePopup')
    );
  }

  openModal() {
    this.siteModal.show();
  }
  closeModal() {
    this.siteModal.hide();
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

  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }
}

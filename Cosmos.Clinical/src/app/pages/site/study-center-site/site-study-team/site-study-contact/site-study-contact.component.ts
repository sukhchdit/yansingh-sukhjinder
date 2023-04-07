import { Component } from '@angular/core';
import { faEllipsis, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const data = [
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
  },

  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
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

@Component({
  selector: 'app-site-study-contact',
  templateUrl: './site-study-contact.component.html',
  styleUrls: ['./site-study-contact.component.scss'],
})
export class SiteStudyContactComponent {
  faEllipsis = faEllipsis;
  faPenToSquare = faPenToSquare;
  status: number;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  rowData = data;
  country = country;
  selectedStatus = 'Certified';
  statusDrop = status;
  selectedCountry = 'Select';

  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }

  onStatusValueChanged(val) {
    if (val) {
      this.selectedStatus = val.name;
    }
    this.selectedDropdown = 'none';
  }

  showStatusInputs(i: number) {
    if (this.status == i) {
      this.status = null;
    } else {
      this.status = i;
    }
  }

  onCountryValueChanged(val) {
    if (val) {
      this.selectedCountry = val.name;
    }
    this.selectedDropdown = 'none';
  }
}

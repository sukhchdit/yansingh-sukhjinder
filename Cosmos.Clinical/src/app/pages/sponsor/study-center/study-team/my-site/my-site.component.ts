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
  selector: 'app-my-site',
  templateUrl: './my-site.component.html',
  styleUrls: ['./my-site.component.scss'],
})
export class MySiteComponent {
  faEllipsis = faEllipsis;
  faPenToSquare = faPenToSquare;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  selectedCountry = 'Select';
  rowData = data;
  country = country;

  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }
  onCountryValueChanged(val) {
    if (val) {
      this.selectedCountry = val.name;
    }
    this.selectedDropdown = 'none';
  }
}

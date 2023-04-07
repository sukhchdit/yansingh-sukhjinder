import { Component } from '@angular/core';
import { faEllipsis, faPenToSquare ,faXmark,  faSortUp,faSortDown} from '@fortawesome/free-solid-svg-icons';

const data = [
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },

  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },
  {
    category: 'Vendor Training',
    name: 'tr1',
    language: 'English',
    certified: 'No',
    country: 'Bahamas The',
    status: 'Not Certified',
    history: [
      {
        user_name: 'ashraf ',
        activity_date: '26 Dec 2022, 3:29 PM',
        activity: 'Upload Document',
        value_form: 'Test_20210204_EOS 2.pdf ',
        value_to: 'ICFStatus',
      },
    ],
  },
];
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
@Component({
  selector: 'app-training-available',
  templateUrl: './training-available.component.html',
  styleUrls: ['./training-available.component.scss'],
})
export class TrainingAvailableComponent {
  faEllipsis = faEllipsis;
  faPenToSquare = faPenToSquare;
  faSortUp=faSortUp;
  faSortDown=faSortDown;
  faCross=faXmark;
  status: number;
  history: number;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  rowData = data;
  selectedLanguage = 'Select';
  selectedCountry = 'Select';
  selectedCategory = 'Select';
  language = language;
  country = country;
  category = category;

  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }

  showHistory(i: number) {
    if (this.history == i) {
      this.history = null;
    } else this.history = i;
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
}

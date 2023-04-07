import { Component } from '@angular/core';
import { faEllipsis, faXmark ,faSortUp,faSortDown} from '@fortawesome/free-solid-svg-icons';

const data = [
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Not Certified',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Certified',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Certified',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },

  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    id: 1,
    url_type: 'study link',
    url_name: 'Test-123',
    url: 'https://test.com',
    language: 'English',
    country: 'Bangladesh',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
];

@Component({
  selector: 'app-study-url',
  templateUrl: './study-url.component.html',
  styleUrls: ['./study-url.component.scss'],
})

export class StudyUrlComponent {
  faEllipsis = faEllipsis;
  faSortUp=faSortUp;
  faSortDown=faSortDown;
  faCross = faXmark;
  history: number;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  rowData = data;

  closeDropdown() {
    this.selectedDropdown = 'none';
  }

  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }

  onSelectDropValueChange(val) {
    if (val) {
      this.selectedPageNum = val;
    }
    this.selectedDropdown = 'none';
  }

  showHistory(i: number) {
    if (this.history == i) {
      this.history = null;
    } else this.history = i;
  }
}

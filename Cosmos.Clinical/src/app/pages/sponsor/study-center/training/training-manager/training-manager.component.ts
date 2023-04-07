import { Component } from '@angular/core';
import {
  faEllipsis,
  faPenToSquare,
  faXmark,
  faSortUp,faSortDown
} from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
const data = [
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },

  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
      },
    ],
  },
  {
    language: 'English',
    training_category: 'Regulatory Training',
    training_name: 'testing',
    assigned_role: 2,
    history: [
      {
        role: 'CRC 1',
        study_role:'role 1'
      },
      {
        role: 'RN',

        study_role:'role 1'
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
const role = [
  {
    id: 1,
    name: 'Role 1',
  },
  {
    id: 2,
    name: 'Role 2',
  },
];
const role_type = [
  {
    id: 1,
    name: 'Role type 1',
  },
  {
    id: 2,
    name: 'Role type 2',
  },
];
const org_type = [
  {
    id: 1,
    name: 'CRO',
  },
  {
    id: 2,
    name: 'Monitor',
  },
  {
    id: 3,
    name: 'Monitor 3',
  },
];

@Component({
  selector: 'app-training-manager',
  templateUrl: './training-manager.component.html',
  styleUrls: ['./training-manager.component.scss'],
})
export class TrainingManagerComponent {
  faEllipsis = faEllipsis;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faSortUp=faSortUp;
  faSortDown=faSortDown;
  faCross = faXmark;
  status: number;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  rowData = data;
  selectedStatus = null;
  statusDrop = status;
  selectedLanguage = 'Select';
  selectedCountry = 'Select';
  selectedRole = 'Select';
  selectedRoleType = 'Select';
  language = language;
  country = country;
  role = role;
  roleType = role_type;
  orgType = org_type;
  selectedOrgType = 'Select';
  history: number;
  popupModal: any;



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
  onRoleValueChanged(val) {
    if (val) {
      this.selectedRole = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onRoleTypeValueChanged(val) {
    if (val) {
      this.selectedRoleType = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onOrgTypeValueChanged(val) {
    if (val) {
      this.selectedOrgType = val.name;
    }
    this.selectedDropdown = 'none';
  }
  showHistory(i: number) {
    console.log('sdf', i);
    if (this.history == i) {
      this.history = null;
    } else this.history = i;
  }

}

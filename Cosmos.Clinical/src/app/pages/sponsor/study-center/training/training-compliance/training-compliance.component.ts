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
    site: '001',
    site_name: 'Atlanta Clinical Trials',
    completed: 2,
    history: [
      {
        user_name:'Ashraf Khan',
        training: 'testing',
        role: 'study Director',
        status:'pending',
        date:'3/3/2023'
   
      },
    ],
  },
  {
    site: '001',
    site_name: 'Atlanta Clinical Trials',
    completed: 2,
    history: [
      {
        user_name:'Ashraf Khan',
        training: 'testing',
        role: 'study Director',
        status:'pending',
        date:'3/3/2023'
   
      },
    ],
  },
  {
    site: '001',
    site_name: 'Atlanta Clinical Trials',

    completed: 2,
    history: [
      {
        user_name:'Ashraf Khan',
        training: 'testing',
        role: 'study Director',
        status:'pending',
        date:'3/3/2023'
   
      },
    ],
  },
  {
    site: '001',
    site_name: 'Atlanta Clinical Trials',
    completed: 2,
    history: [
      {
        user_name:'Ashraf Khan',
        training: 'testing',
        role: 'study Director',
        status:'pending',
        date:'3/3/2023'
   
      },
    ],
  },
];
const site = [
  {
    id: 1,
    name: '0001',
  },
  {
    id: 2,
    name: '12863',
  },
  {
    id: 3,
    name: '99',
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
  selector: 'app-training-complience',
  templateUrl: './training-compliance.component.html',
  styleUrls: ['./training-compliance.component.scss'],
})
export class TrainingComplianceComponent {
  faEllipsis = faEllipsis;
  faPenToSquare = faPenToSquare;
  faSortUp=faSortUp;
  faSortDown=faSortDown;
  faTrashCan = faTrashCan;
  faCross = faXmark;
  status: number;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  rowData = data;
  selectedStatus = null;
  statusDrop = status;
  selectedSite = 'Select';
  selectedCountry = 'Select';
  selectedRole = 'Select';
  selectedRoleType = 'Select';
  site = site;
  country = country;
  role = role;
  roleType = role_type;
  orgType = org_type;
  selectedOrgType = 'Select';
  history: number;
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

  onSiteValueChanged(val) {
    if (val) {
      this.selectedSite = val.name;
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

import { Component } from '@angular/core';
import {
  faEllipsis,
  faXmark,
  faDownload,
  faPen,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
const data = [
  {
    folder_name: 'Site procedural Documents and Forms',
    created_on: '15.02.2023',
    size: '500MB',
    history: [
      {
        title: 'Curriculum Vitae',
        subHistory: [
          {
            title: 'Hasan CV',
            version: '1',
            exp_date: '2023-08-03',
            created: '15.02.2023',
            owner: 'Addy',
            status: 'Certified',
            certified: 'ok',
          },
        ],
      },
    ],
  },
  {
    folder_name: 'Subject Enrollment',
    created_on: '15.02.2023',
    size: '500MB',
    history: [
      {
        title: 'Curriculum Vitae',
        subHistory: [
          {
            title: 'Hasan CV',
            version: '1',
            exp_date: '2023-08-03',
            created: '15.02.2023',
            owner: 'Addy',
            status: 'Certified',
            certified: 'ok',
          },
        ],
      },
    ],
  },
  {
    folder_name: 'Ethics Committee - IRB',
    created_on: '15.02.2023',
    size: '500MB',
    history: [
      {
        title: 'Curriculum Vitae',
        subHistory: [
          {
            title: 'Hasan CV',
            version: '1',
            exp_date: '2023-08-03',
            created: '15.02.2023',
            owner: 'Addy',
            status: 'Certified',
            certified: 'ok',
          },
        ],
      },
    ],
  },
  {
    folder_name: 'Site Personnel Documentation',
    created_on: '15.02.2023',
    size: '500MB',
    history: [
      {
        title: 'Curriculum Vitae',
        subHistory: [
          {
            title: 'Hasan CV',
            version: '1',
            exp_date: '2023-08-03',
            created: '15.02.2023',
            owner: 'Addy',
            status: 'Certified',
            certified: 'ok',
          },
        ],
      },
    ],
  },
  {
    folder_name: 'Study Training Documentation',
    created_on: '15.02.2023',
    size: '500MB',
    history: [
      {
        title: 'Curriculum Vitae',
        subHistory: [
          {
            title: 'Hasan CV',
            version: '1',
            exp_date: '2023-08-03',
            created: '15.02.2023',
            owner: 'Addy',
            status: 'Certified',
            certified: 'ok',
          },
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-edocs',
  templateUrl: './edocs.component.html',
  styleUrls: ['./edocs.component.scss'],
})
export class EdocsComponent {
  faEllipsis = faEllipsis;
  faDownload = faDownload;
  faPen = faPen;
  faCheck = faCheck;
  faTrashCan = faTrashCan;
  faCross = faXmark;

  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  rowData = data;
  documents: number;
  subFolders: number;

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
  showDocuments(i: number) {
    if (this.documents == i) {
      this.documents = null;
    } else this.documents = i;
  }
  showSubFolder(i: number) {
    if (this.subFolders == i) {
      this.subFolders = null;
    } else this.subFolders = i;
  }
}

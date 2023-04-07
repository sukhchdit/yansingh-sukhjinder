import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
declare var window: any;

const data = [
  {
    email: 'test',
    name: 'MFR Ctrl123',
    phone: 'Report 123',
    site_name: 'CST234',
    site: 'MFR ',
    site_phone: '434535',
    first_name: 'test',
    last_name: 'vv13',
    country: 'England',
    state: 'London',
    city: 'Texta',
    address: 'vv13',
    zip_code: '3452',
  },
  {
    email: 'test',
    name: 'M234',
    phone: '23423423',
    site_name: 'CST234',
    site: 'MFR C',
    site_phone: '234423423',
    first_name: 'test',
    last_name: 'vv13',
    country: 'United State',
    state: 'New York',
    city: 'ALea',
    address: 'vv13',
    zip_code: '0230',
  },
];
const errorData = [
  { row_no: 'MFR Ctrl123',
    error_type: 'test',
    error_description: 'ashrafkhan@gmail.com',
  },
  { row_no: 'MFR Ctrl123',
    error_type: 'test',
    error_description: 'ashrafkhan@gmail.com',
  },
];
@Component({
  selector: 'app-import-sites-modal',
  templateUrl: './import-sites-modal.component.html',
  styleUrls: ['./import-sites-modal.component.scss'],
})
export class ImportSitesModalComponent {
  importSiteModal: any;
  faTrashCan = faTrashCan;
  rowData = data;
  errorData=errorData;
  ngOnInit() {
    this.importSiteModal = new window.bootstrap.Modal(
      document.getElementById('importSiteModal')
    );
  }
  openModal() {
    this.importSiteModal.show();
  }
  closeModal() {
    this.importSiteModal.hide();
  }
}

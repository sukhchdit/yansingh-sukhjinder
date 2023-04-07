import { Component } from '@angular/core';
import { faStarOfLife} from '@fortawesome/free-solid-svg-icons';
declare var window: any;

const StudyRole = [
  {
    id: 1,
    name: 'study 1',
  },
  {
    id: 2,
    name: 'study2',
  },
];
const training = [
  {
    id: 1,
    name: 'T1',
  },
  {
    id: 2,
    name: 'T2',
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
const mandatory = [
  {
    id: 1,
    name: 'Mandatory1',
  },
  {
    id: 2,
    name: '2',
  },
  {
    id: 3,
    name: '4',
  },
];
@Component({
  selector: 'app-add-map-training-modal',
  templateUrl: './add-map-training-modal.component.html',
  styleUrls: ['./add-map-training-modal.component.scss'],
})
export class AddMapTrainingModalComponent {
  mapTrainingModal: any;
  faStarOfLife=faStarOfLife;
  selectedDropdown = 'none';
  selectedStudyRole = 'Select';
  selectedTraining = 'Select';
  selectedRole = 'Select';
  selectedRoleType = 'Select';
  mandatory=mandatory;
  study_role= StudyRole;
  training = training;
  role = role;
  roleType = role_type;
  orgType = org_type;
  selectedOrgType = 'Select';
  selectedMandatory='Select'

  ngOnInit(): void {
    this.mapTrainingModal = new window.bootstrap.Modal(
      document.getElementById('mapTrainingModal')
    );
  }
  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }

  onStudyRoleValueChanged(val) {
    if (val) {
      this.selectedStudyRole= val.name;
    }
    this.selectedDropdown = 'none';
  }
  onTrainingValueChanged(val) {
    if (val) {
      this.selectedTraining = val.name;
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
  onMandatoryValueChanged(val) {
    if (val) {
      this.selectedMandatory = val.name;
    }
    this.selectedDropdown = 'none';
  }
  
  openModal() {
    this.mapTrainingModal.show();
  }

  closeModal() {
    this.mapTrainingModal.hide();
  }
}

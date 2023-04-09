import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../account/services/auth.service';
import { OrganizationContact } from '../../../models/organization/organizationcontact.model';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  accountValues: any[] = [];
  user = new OrganizationContact();
  accountType: string;
  accountValue: number;
  userRole: string;
  lastLoginAt: string;
  currentUser: string;
  studyId: number;

  practice: any;
  loaction: any;
  status: any;
  page: any;
  selectedSite = 'Select Site';
  selectedStudy = 'Select Study';
  practiceList = ['Atlanta Clinical Trials', 'Sourtheast Clinical Trials', 'Atlantic', 'Atlantic1', 'Atlantic2'];
  locationList = ['Phase IIb/III NASH with Fibrosis  (DA671C01236)', 'TestS1 (01)', 'TestS2 (BC-1214)', 'bbb (dbdb)', 'TestS3 (lik52)'];
  statusList = ['Rejected', 'Completed'];
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedStatus = 'Rejected';
  selectedPageNum = '20';
  selectedDropdown = 'none';

  showProfilePopup = false;

  constructor(private authService: AuthService, public router: Router) {
  }

  ngOnInit() {

    this.populateTopDropdownList();
  }




  openDropdown(ele: any) {
    if (this.selectedDropdown == ele)
      this.selectedDropdown = 'none';
    else
      this.selectedDropdown = ele;
  }

  closeDropdown(ele: any) {
    this.selectedDropdown = 'none';
  }

  selectDropdownValue(dd: any, model: any, value: any) {
    this.selectedDropdown = 'none';
  }

  logout() {
    this.authService.logout();
  }

  populateTopDropdownList() {
  
  }

  setStudyList() {
  
  }

  onStudyChanged(study) {
 
  }

  ngAfterContentChecked() {
 
  }

  onAccountValueChanged(val) {
 
  }


  onAccountTypeChange() {

  }

  navigateToProfilePage() {
    this.router.navigate(['/products']);
  }

}

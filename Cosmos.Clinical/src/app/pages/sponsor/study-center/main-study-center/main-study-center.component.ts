import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

const tabs = [
  {
    route: '/sponsor/study_center',
    name: 'News',
  },
  {
    route: '/sponsor/study_center/news',
    name: 'News',
  },
  {
    route: '/sponsor/study_center/eisf',
    name: 'eISF',
  },

  {
    route: '/sponsor/study_center/training/available',
    name: 'Training',
  },
  {
    route: '/sponsor/study_center/study_team/study_contact',
    name: 'Study Team',
  },
  {
    route: '/sponsor/study_center/faq',
    name: 'FAQ',
  },
  {
    route: '/sponsor/study_center/study_url',
    name: 'Study URL',
  },
];
@Component({
  selector: 'app-main-study-center',
  templateUrl: './main-study-center.component.html',
  styleUrls: ['./main-study-center.component.scss'],
})
export class MainStudyCenterComponent {
  tab: string;
  tabs = tabs;
  selectedDropdown = 'none';
  selectedTab = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        this.tab = event.url;
      }
    });
    this.tab = this.router.url;
  }

  setTab(tabname: string) {
    this.tab = tabname;
    this.router.navigate([tabname]);
  }
  closeDropdown() {
    this.selectedDropdown = 'none';
  }

  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }
  onTabValueChanged(val) {
    if (val) {
      this.selectedTab = val.name;
      this.router.navigate([val.route]);
    }
    this.selectedDropdown = 'none';
  }
}

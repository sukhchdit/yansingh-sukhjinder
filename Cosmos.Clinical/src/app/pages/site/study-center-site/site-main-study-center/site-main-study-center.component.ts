import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

const tabs = [
  {
    route: '/study_center/news',
    name: 'News',
  },
  {
    route: '/studies/esif',
    name: 'eISF',
  },

  {
    route: '/study_center/training/available',
    name: 'Training',
  },
  {
    route: '/study_center/study_team/study_contact',
    name: 'Study Team',
  },
  {
    route: '/study_center/faq',
    name: 'FAQ',
  },
  {
    route: '/study_center/study_url',
    name: 'Study URL',
  },
];

@Component({
  selector: 'app-site-main-study-center',
  templateUrl: './site-main-study-center.component.html',
  styleUrls: ['./site-main-study-center.component.scss'],
})
export class SiteMainStudyCenterComponent {
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

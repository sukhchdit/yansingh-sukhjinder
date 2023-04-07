import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-site-main-study-team',
  templateUrl: './site-main-study-team.component.html',
  styleUrls: ['./site-main-study-team.component.scss'],
})
export class SiteMainStudyTeamComponent {
  tab: string;

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
}

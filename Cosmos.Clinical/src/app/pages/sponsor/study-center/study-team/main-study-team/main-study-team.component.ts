import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-study-team',
  templateUrl: './main-study-team.component.html',
  styleUrls: ['./main-study-team.component.scss'],
})
export class MainStudyTeamComponent {
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

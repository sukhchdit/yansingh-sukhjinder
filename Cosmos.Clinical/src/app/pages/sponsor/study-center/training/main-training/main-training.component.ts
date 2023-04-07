import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-training',
  templateUrl: './main-training.component.html',
  styleUrls: ['./main-training.component.scss'],
})
export class MainTrainingComponent {
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

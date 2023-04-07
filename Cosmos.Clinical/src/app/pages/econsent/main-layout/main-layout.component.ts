import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  tab: string;

  selectedDropdown = 'none';
  selectedTab = null;
  constructor(private router: Router) {}
  setTab(tabname: string) {
    this.tab = tabname;
    this.router.navigate([tabname]);
  }

  ngOnInit() {
    this.tab = this.router.url;

  }
}

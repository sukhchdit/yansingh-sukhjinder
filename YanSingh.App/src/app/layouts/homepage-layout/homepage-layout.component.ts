import { Component } from '@angular/core';
import { MaidService } from '../../core/services/maid/maid.service';

@Component({
  selector: 'app-homepage-layout',
  templateUrl: './homepage-layout.component.html',
  styleUrls: ['./homepage-layout.component.scss']
})
export class HomePageLayoutComponent {
  title = 'Yan Singh';
  maidList: any[] = [];

  constructor(private maidService: MaidService) { }

  ngOnInit() {
    this.getLatest8Maids();
  }

  getLatest8Maids() {
    this.maidService.getAllActiveMaids().subscribe(response => {
      if (response)
        this.maidList = response;
      else
        this.maidList = [];
    }, err => { this.maidList = []; });
  }
}

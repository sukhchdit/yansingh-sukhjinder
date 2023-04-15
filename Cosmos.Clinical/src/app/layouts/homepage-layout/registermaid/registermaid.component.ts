import { Component, OnInit } from '@angular/core';
import { MaidDetail } from '../../../models/maid/maiddetail.model';

@Component({
  selector: 'app-registermaid',
  templateUrl: './registermaid.component.html',
  styleUrls: ['./registermaid.component.scss']
})
export class RegisterMaidComponent implements OnInit {
  tabselectornew:string = 'basictab';

  maidDetail = new MaidDetail();

  ngOnInit() {

  }

  tabsSliderNew(val) {
    this.tabselectornew = val;
  }

  saveMaidBasicDetails() {

  }

}

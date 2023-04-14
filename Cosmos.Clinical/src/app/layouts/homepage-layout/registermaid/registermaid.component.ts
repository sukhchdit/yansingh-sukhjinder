import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registermaid',
  templateUrl: './registermaid.component.html',
  styleUrls: ['./registermaid.component.scss']
})
export class RegisterMaidComponent implements OnInit {
  tabselectornew:string = 'basictab';

  ngOnInit() {

  }

  tabsSliderNew(val) {
    this.tabselectornew = val;
  }

}

import { Component, OnInit } from '@angular/core';
import { MaidService } from '../../../core/services/maid/maid.service';
import { MaidDetail } from '../../../models/maid/maiddetail.model';

@Component({
  selector: 'app-registermaid',
  templateUrl: './registermaid.component.html',
  styleUrls: ['./registermaid.component.scss']
})
export class RegisterMaidComponent implements OnInit {
  tabselectornew:string = 'basictab';

  maidDetail = new MaidDetail();

  constructor(private maidService: MaidService) {

  }

  ngOnInit() {
    //this.maidDetail = new MaidDetail();
  }

  tabsSliderNew(val) {
    this.tabselectornew = val;
  }

  saveMaidBasicDetails() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      this.tabselectornew = 'skillstab';
      this.tabsSliderNew('skillstab');
    });
  }

  saveMaidSkills() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      this.tabselectornew = 'experiencetab';
      this.tabsSliderNew('experiencetab');
    });
  }

  saveMaidExperience() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      this.tabselectornew = 'questionstab';
      this.tabsSliderNew('questionstab');
    });
  }

  saveMaidGeneralquestions() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      this.tabselectornew = 'savetab';
      this.tabsSliderNew('savetab');
    });
  }

  saveMaidPhoto() {
    this.maidService.save(this.maidDetail).subscribe(response => {
      //this.tabselectornew = 'skillstab';
      //this.tabsSliderNew('skillstab');
    });
  }

  previous(tabName) {
    this.tabselectornew = tabName;
    this.tabsSliderNew(tabName);
  }

}

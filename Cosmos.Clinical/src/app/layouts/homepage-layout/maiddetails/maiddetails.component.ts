import { Component } from '@angular/core';
import { MaidService } from '../../../core/services/maid/maid.service';
import { MaidDetail } from '../../../models/maid/maiddetail.model';

@Component({
  selector: 'app-maiddetails',
  templateUrl: './maiddetails.component.html',
  styleUrls: ['./maiddetails.component.scss']
})
export class MaidDetailsComponent {
  maidDetail = new MaidDetail();
  public uploadedFiles: any; /*Array<File> = []*/

  constructor(private maidService: MaidService) {

  }

  ngOnInit() {
    this.getMaidDetails();
  }

  getMaidDetails() {
    var id = 36;
    this.maidService.get(id).subscribe(response => {
      if (response) {
        this.maidDetail = response;
      }
    });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaidService } from '../../../core/services/maid/maid.service';
import { MaidDetail } from '../../../models/maid/maiddetail.model';

@Component({
  selector: 'app-maiddetails',
  templateUrl: './maiddetails.component.html',
  styleUrls: ['./maiddetails.component.scss']
})
export class MaidDetailsComponent {
  maidDetail = new MaidDetail();
  id: any;
  public uploadedFiles: any;

  constructor(private route: ActivatedRoute, private maidService: MaidService) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
        this.getMaidDetails();
      });
  }

  getMaidDetails() {
    //var id = 1;
    this.maidService.get(this.id).subscribe(response => {
      if (response) {
        this.maidDetail = response;
      }
    });
  }
}

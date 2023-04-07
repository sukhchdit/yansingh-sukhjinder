import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { ExcelSheetService } from 'src/app/core/services/evault/excel-sheet.service';
declare var window: any;

@Component({
  selector: 'app-common-actions',
  templateUrl: './common-actions.component.html',
  styleUrls: ['./common-actions.component.scss']
})
export class CommonActionsComponent implements OnInit,OnDestroy{
  @Output() containerAction = new EventEmitter<any>();
  constructor(public evaultService: EvaultService,public excelService:ExcelSheetService){}

  ngOnInit(): void {

  }

 // constructor(public excelService: ExcelSheetService) { }
  exportAsXLSX() {
    let sampleData = [{
      "Site name": '',
      "Site Address1": '',
      "City": '',
      "State": '',
      "Country": '',
      "Phone": '',
      "Email": '',
      "Site Number": '',
      "Principle Investigator Name": '',
      "Principle Investigator email": '',
      "Principle Investigator Ph": ''
    }];
    this.excelService.exportAsExcelFile(sampleData, 'eVault');
  }


  uploadXLSXFile() {
    this.evaultService.containerAction.next('uploadSiteList');
    //this.containerAction.emit(true);
  }

  addSite() {
    this.evaultService.containerAction.next('addSite');
    // this.containerAction.emit('addSite');
    // let templateDialogRef = this.matDialog.open(EvaultAddSiteComponent, { width: '60%', disableClose: true, data: { container: 'addSite' } });

    // templateDialogRef.afterClosed().subscribe(result => {
    //   console.log('Closed...');
    //   if (result) {
    //     this.addSiteSuccess.emit(true);
    //   } else {
    //     this.addSiteSuccess.emit(false);
    //   }
    // });
  }
  ngOnDestroy(): void {
    this.evaultService.containerAction.next('');
  }
}

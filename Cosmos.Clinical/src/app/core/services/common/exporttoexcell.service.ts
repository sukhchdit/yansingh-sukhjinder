import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class ExportToExcellService {

  tableToExcel(tableId:string,sheetName:string,fileName:string): void {
    /* table id is passed over here */
    let element = document.getElementById(tableId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }

  BudgetToExcel(fileName) {
    
    /* table id is passed over here */
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
    let element = document.getElementById('studybudget');

    if (element) {
      let eleProc = document.createElement('table');
      eleProc.innerHTML = element.innerHTML;
      this.changeSigns(eleProc);

      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(eleProc);
      XLSX.utils.book_append_sheet(wb, ws, 'Procedures');
    }

    let nonProcedures = document.getElementById('nonProcedures');
    if (nonProcedures) {
      let eleNonProc = document.createElement('table');
      eleNonProc.innerHTML = nonProcedures.innerHTML;
      this.changeSigns(eleNonProc);

      const wsNonProcedures: XLSX.WorkSheet = XLSX.utils.table_to_sheet(eleNonProc);
      XLSX.utils.book_append_sheet(wb, wsNonProcedures, 'Non Procedures');
    }

    let totals = document.getElementById('totals');
    if (totals) {
      const wsTotals: XLSX.WorkSheet = XLSX.utils.table_to_sheet(totals);
      XLSX.utils.book_append_sheet(wb, wsTotals, 'Totals');
    }

    let conditionalProcedures = document.getElementById('conditionalProcedures');
    if (conditionalProcedures) {
      let eleConditionalProcedures = document.createElement('table');
      eleConditionalProcedures.innerHTML = conditionalProcedures.innerHTML;
      this.changeSigns(eleConditionalProcedures);

      const wsConditionalProcedures: XLSX.WorkSheet = XLSX.utils.table_to_sheet(eleConditionalProcedures);
      XLSX.utils.book_append_sheet(wb, wsConditionalProcedures, 'conditionalProcedures');
    }

    let additionalCharges = document.getElementById('additionalCharges');
    if (additionalCharges) {
      const wsAdditionalCharges: XLSX.WorkSheet = XLSX.utils.table_to_sheet(additionalCharges);
      XLSX.utils.book_append_sheet(wb, wsAdditionalCharges, 'Additional Charges');
    }
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  changeSigns(eleProc: HTMLTableElement) {
    var checkedChilds = eleProc.getElementsByClassName('checked');
    var notCheckedChilds = eleProc.getElementsByClassName('notchecked');

    for (var i = 0; i < checkedChilds.length; i++) {
      checkedChilds[i].innerHTML = '&check;';
    }

    for (var i = 0; i < notCheckedChilds.length; i++) {
      notCheckedChilds[i].innerHTML = '&Cross;';
    }
  }
}

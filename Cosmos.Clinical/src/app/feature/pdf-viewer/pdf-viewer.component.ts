import { Component, ElementRef, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { ViewSDKClientService } from 'src/app/core/services/viewsdkclient.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @ViewChild('viewer', { static: true }) viewer: ElementRef;

  @Input() pdfSrc: any;
  @Input() displayFilename: any;
  @Input() showAnnotationTools: boolean;
  pdfURL: string='';

  constructor(private viewSDKClient: ViewSDKClientService) { }

  ngOnInit() {
    this.pdfURL = URL.createObjectURL(this.pdfSrc);
    this.renderPDf();
  }

  renderPDf() {
    this.viewSDKClient.ready().then(() => {
      /* Invoke file preview */
      const canvas: any = document.querySelector('#pdf-div');
      canvas.style.display = "block";
      let defConfg = {
        // defaultViewMode: "FIT_WIDTH"
        showAnnotationTools: this.showAnnotationTools
      }

      if (this.displayFilename && this.displayFilename == '') {
        this.displayFilename = 'file';
      }
      else if (!this.displayFilename) {
        this.displayFilename = 'file';
      }

      this.viewSDKClient.previewFile('pdf-div', defConfg, this.pdfURL, this.displayFilename);
    }).catch((err)=>{
      console.log(err);
    });
  }

  getSavedPdf(): Blob {
    var intArray = this.viewSDKClient.pdfBlob;
    var byteArray = new Uint8Array(intArray);
    var blob = new Blob([byteArray], { type: 'application/pdf' });

    return blob
  }
  
}

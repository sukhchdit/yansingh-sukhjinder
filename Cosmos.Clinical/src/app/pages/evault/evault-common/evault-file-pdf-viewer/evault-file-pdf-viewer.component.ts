import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faStarOfLife, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/account/services/auth.service';
import { ViewSDKClientService } from 'src/app/core/services/viewsdkclient.service';
import { eVaultDocStatus } from 'src/app/models/evault/evault.enum';
import { ESignModalComponent } from '../e-sign-modal/e-sign-modal.component';
declare var window: any;

@Component({
  selector: 'app-evault-file-pdf-viewer',
  templateUrl: './evault-file-pdf-viewer.component.html',
  styleUrls: ['./evault-file-pdf-viewer.component.scss']
})
export class EvaultFilePdfViewerComponent implements OnInit{
  @ViewChild('viewer', { static: true }) viewer: ElementRef;

  @ViewChild(ESignModalComponent) private eSignModal: ESignModalComponent;
  ipMasterModal: any;
  data: any;
  pdfSrc: any;
  documentDetailsResponse: any;
  displayPreview: boolean;
  documentLoadingIndicator: boolean;
  eosDocumentUser: any;
  siteUser: boolean;
  pdfURL: string;
  details: boolean = false;
  tab: string ='doc_details';
  eVaultDocObject = eVaultDocStatus;
  faCross = faXmark;
  faStarOfLife=faStarOfLife;

  constructor(private authService: AuthService,private viewSDKClient: ViewSDKClientService){}
  ngOnInit(){
    this.ipMasterModal = new window.bootstrap.Modal(
      document.getElementById('ipMasterModal')
    );
    if ((this.authService.currentUser.userRole.toString().toLowerCase() === 'siteadmin') || (this.authService.currentUser.userRole.toString().toLowerCase() === 'siteuser')) {
      this.siteUser = true;
    } else {
      this.siteUser = false;
    }
  }
  openModal() {
    this.ipMasterModal.show();
  }
  closeModal() {
    this.ipMasterModal.hide();

  }
  setdocData(data){
    this.data = null
    this.data = data;
    this.pdfSrc = data.pdfResponse;
    this.documentDetailsResponse = data.documentDetails;
    this.displayPreview = true;
    this.documentLoadingIndicator = false;
    this.eosDocumentUser = data.eosUser;
  }

  getSavedPdf(): Blob {
    var intArray = this.viewSDKClient.pdfBlob;
    var byteArray = new Uint8Array(intArray);
    var blob = new Blob([byteArray], { type: 'application/pdf' });

    return blob
  }
  

  async addDigitalSignature() {
    var docSignatureRequest: any;
    docSignatureRequest = {
      documentSignatureRequest: {
        documentSignatureType: (!this.eosDocumentUser) ? 7 : 8,
        documentGuid: this.documentDetailsResponse.documentDetails.s3Path,
        uploadedFileName: this.documentDetailsResponse.documentDetails.fileName,
        siteId: this.data.siteId,
        evaultId: this.data.evaultId
      }
    };
    this.eSignModal.openModal(docSignatureRequest);
    // const dialogAddSign = await this.dialog.open(VerifyCredentialsComponent, {
    //   width: "700px",
    //   data: docSignatureRequest
    // });

    // await dialogAddSign.afterClosed().subscribe(response => {
    //   if (response) {
    //     this.diaglogRef.close(true);
    //   }
    // });
  }
  showDetails() {
    this.details = !this.details;
  }
  setTab(tabname: string) {
    this.tab = tabname;
 
  }
}

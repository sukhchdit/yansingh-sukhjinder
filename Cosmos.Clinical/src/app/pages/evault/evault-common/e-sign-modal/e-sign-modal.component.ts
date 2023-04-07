import { Component, ViewChild } from '@angular/core';
import { faXmark ,faStarOfLife} from '@fortawesome/free-solid-svg-icons';
import { SignaturePad } from 'angular2-signaturepad';
import { AuthService } from 'src/app/account/services/auth.service';
import { LoginService } from 'src/app/account/services/login.service';
import { MomentDatePipe } from 'src/app/core/pipes/momentdate.pipe';
import { DocumentMasterService } from 'src/app/core/services/document/documentmaster.service';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { SponsorStudyService } from 'src/app/core/services/sponsor/sponsorstudy.service';
import { User } from 'src/app/models/account/user.model';
import { SignPad } from 'src/app/models/document/Signpad.model';
import { signingReasons } from 'src/app/models/evault/evault.enum';

declare var window: any;
const color = [
  {
    id: 'black',
    name: 'Black',
  },
  {
    id: 'red',
    name: 'Red',
  },
  {
    id: 'green',
    name: 'Green',
  },
  {
    id: 'blue',
    name: 'Blue',
  },
];

@Component({
  selector: 'app-e-sign-modal',
  templateUrl: './e-sign-modal.component.html',
  styleUrls: ['./e-sign-modal.component.scss']
})
export class ESignModalComponent {
  eSignModal: any;
  faCross = faXmark;
  faStarOfLife=faStarOfLife;
  tab: string ='password';
  color = color;
  obj = new User();
  isloader = false;
  penColor: string = "black";
  penSize: number = 1;
  signPad = new SignPad();
  loadingIndicator: boolean;
  userName: string;
  data:any;
  eSignFlag: boolean = false
  signingReasonsObject = signingReasons;
  signingReasonsOptions = Object.keys(signingReasons).map(key => signingReasons[key]).filter(value => typeof value === 'string');

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': this.penSize,
    'canvasWidth': 610,
    'canvasHeight': 100,
    'penColor': this.penColor
  };
  constructor(private evaultService: EvaultService, private documentMasterService: DocumentMasterService, private service: LoginService, private authService: AuthService, private sponsorStudyService: SponsorStudyService, private datePipe: MomentDatePipe) { }

  ngOnInit(): void {
    this.obj.email = this.authService.currentUser.email;
    this.userName = this.authService.currentUser.name;
    this.eSignModal = new window.bootstrap.Modal(
      document.getElementById('eSignModal')
    );
  }

  verifyDetail() {
    this.isloader = true;
    this.service.signIn(this.obj).subscribe(
      response => {
        this.isloader = false;
        if (response) {
          console.log(response);
        }
        var signedByName = this.authService.currentUser.lastName + " " + this.authService.currentUser.firstName;
        let date = new Date();
        let signOffDateStamp = this.datePipe.transform(date, 'EEEE, MMMM d, y, h:mm:ss a zzzz');
        //this.contactloadingIndicator = true;
        if (this.data.documentSignatureRequest.documentSignatureType == 7 || this.data.documentSignatureRequest.documentSignatureType == 8) {
          this.evaultService.addEvaultDigitalSignatureToDocument(this.data.documentSignatureRequest, this.data.documentSignatureRequest.siteId, this.data.documentSignatureRequest.evaultId).subscribe(response => {
            // if (response) this.toastyService.showToast("Signature Request", "Document signed successfully.", ToastType.success);
            // this.dialogRef.close(response);
            this.closeModal()
          }, err => {
            // this.toastyService.showToast("Signature Request", "Failed to singed document.", ToastType.error);
          });
        } else {
          this.documentMasterService.addDigitalSignatureToDocument(this.data.documentSignatureRequest, signedByName, signOffDateStamp).subscribe(response => {
            // this.toastyService.showToast("Signature Request", "Document signed successfully.", ToastType.success);
            //this.contactloadingIndicator = false;
            //this.getSignatureRequest();
          },
            err => {
              //this.contactloadingIndicator = false;
              // this.toastyService.showToast("Signature Request", "Failed to singed document.", ToastType.error);
            });
          // this.dialogRef.close(response);
          this.closeModal()
        }
      },
      err => {
        this.isloader = false;
        // Swal.fire("Login Detail", "Wrong username or password", "error");
        //if (err.status == 400) {
        //  Swal.fire("", err.error.message, "error");
        //}
        //else
        //  Swal.fire("", err.error.message, "error");
        //Swal.fire("", "Please check your internet connection!", "error");
      });
  }

  drawComplete() {
    this.signaturePad.set('penColor', this.penColor);
    console.log(this.signaturePad.toDataURL());
    this.signPad.path = "";
    this.signPad.base64String = this.signaturePad.toDataURL();
    this.signPad.documentSignatureRequestViewModel = this.data.documentSignatureRequest;
    let date = new Date();
    let signOffDateStamp = this.datePipe.transform(date, 'EEEE, MMMM d, y, h:mm:ss a zzzz');
    this.loadingIndicator = true;
    this.sponsorStudyService.saveSignaturePad(this.signPad, signOffDateStamp).subscribe(response => {
      this.loadingIndicator = false;
      if (response) {
        //this.organizationContacts = response;
        //this.participentList = response;
        //this.calendarEvent.calenderAssignedTo = this.authService.currentUser.organizationContactId;
        //this.getUserStudies();
        this.closeModal();
      }
    },
      err => {

        // this.loadingIndicator = false;
        // this.toastyService.showToast("Error", "Something went wrong on serve.", ToastType.error);
      });

  }

  clear() {
    this.signaturePad.clear();
  }
  setPenColor() {
    this.signaturePad.set('penColor', this.penColor);
  }
  setPenSize() {
    this.signaturePad.set('minWidth', this.penSize);
  }
  openModal(modalData) {
    if(modalData) {
      this.data = modalData;
      this.eSignFlag = true;
    }
    this.eSignModal.show();
  }
  closeModal() {
    this.eSignModal.hide();
  }
  setTab(tabname: string) {
    this.tab = tabname;
  }
  onValueChange(selectedValue, type) {
    if(type == 'signingReason') {
      this.data.documentSignatureRequest.documentSignatureType = selectedValue;
    } else if(type == 'penColor') {
      this.penColor = selectedValue;
      this.setPenColor();
    }
  }
}

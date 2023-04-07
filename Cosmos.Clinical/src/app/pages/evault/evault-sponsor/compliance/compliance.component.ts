import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faAngleLeft, faAngleRight, faCheck, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/account/services/auth.service';
import { MomentDatePipe } from 'src/app/core/pipes/momentdate.pipe';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { SponsorInfo } from 'src/app/models/sponsor/sponsorinfo.model';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.scss']
})
export class ComplianceComponent {
  faAngleRight = faAngleRight;
  faSortUp=faSortUp;
  faSortDown=faSortDown;
  faCheck = faCheck;
  tab: string;
  selectedDropdown = 'none';
  faAngleLeft = faAngleLeft;
  selectedTab = null;
  sponsorStudyId: number;
  complianceGridResponse: any = null;
  sponsorInfo = new SponsorInfo();
  studyList = [];
  selectedDocuments = '1';
  documentsView: boolean = false;
  docDetails: any;
  allDocChecked: boolean = false;
  loading: boolean;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';

  constructor(private datePipe: MomentDatePipe,private router: Router,public authService: AuthService, public evaultService: EvaultService) { }


  ngOnInit(): void {
    this.sponsorStudyId = this.authService.sponsorStudyInfoId;
    this.getEvaultComplianceList();
    this.authService.sponsorStudyInfoIdChanged.subscribe((res)=>{
      this.sponsorStudyId = res;
      this.getEvaultComplianceList();
    })
  }

  filterReceivedOn() {
    this.complianceGridResponse.forEach((compliance) => {
      compliance.eVaultDetails.forEach((evaultDetail) => {
        if (evaultDetail && evaultDetail.receivedOn != null)
          evaultDetail.receivedOn = this.datePipe.convertDateToLocal(evaultDetail.receivedOn);
      })
    });
  }

  getEvaultComplianceList() {
    this.loading = true;
    this.complianceGridResponse = null;
    this.backToCompliance();
    if (this.selectedDocuments === '1') {
      this.evaultService.getSafetyCompliance(this.authService.sponsor.id, this.sponsorStudyId).subscribe((response) => {
        this.complianceGridResponse = response;
        this.filterReceivedOn();
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    } else if (this.selectedDocuments === '2') {
      this.evaultService.getEosCompliance(this.authService.sponsor.id, this.sponsorStudyId).subscribe((response) => {
        this.complianceGridResponse = response;
        this.filterReceivedOn();
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    }
  }

  handleChange(event) {
    this.selectedDocuments = event;
    this.getEvaultComplianceList();
  }

  viewdocDetails(documents) {
    this.documentsView = true;
    documents.forEach((document) => document['selectRow'] = false);
    this.docDetails = documents;
  }

  selectAllDoc() {
    this.docDetails.forEach((doc) => {
      Object.assign(doc, { selectRow: true });
    });
  }
  deSelectAllDoc() {
    this.docDetails.forEach((doc) => {
      Object.assign(doc, { selectRow: false });
    });
  }
  backToCompliance() {
    this.documentsView = false;
    this.docDetails = null;
  }

  downloadDocDetails() {
    let request = this.docDetails.reduce((docs, doc) => {
      if (doc.selectRow) {
        docs.push({
          "evaultDocId": doc.documentDetails.id,
          "filepath": doc.documentDetails.s3Path,
          "fileName": doc.documentDetails.fileName
        });
      }
      return docs;
    }, []);
    console.log('request',request);
    if (request && request.length !== 0) {
      this.evaultService.downloadEvaultComplianceFiles(request);
    } else {
      // this.toastyService.showToast("Evault Doc Details", "Please select atleast one document to download.", ToastType.error);
    }

  }

  checkAllDoc(event) {
    event.checked ? this.selectAllDoc() : this.deSelectAllDoc();

  }

  closeDropdown() {
    this.selectedDropdown = 'none';
  }

  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }

  
  onTabValueChanged(val) {
    if (val) {
      this.selectedTab = val.name;
      this.router.navigate([val.route]);
    }
    this.selectedDropdown = 'none';
  }
}

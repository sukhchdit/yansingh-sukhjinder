import { Component, OnInit, ViewChild } from '@angular/core';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/account/services/auth.service';
import { MomentDatePipe } from 'src/app/core/pipes/momentdate.pipe';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { SiteService } from 'src/app/core/services/site/site.service';
import { SponsorInfo } from 'src/app/models/sponsor/sponsorinfo.model';
import { EvaultFilePdfViewerComponent } from '../../evault-common/evault-file-pdf-viewer/evault-file-pdf-viewer.component';

@Component({
  selector: 'app-eos-documents-primary-site',
  templateUrl: './eos-documents-primary-site.component.html',
  styleUrls: ['./eos-documents-primary-site.component.scss']
})
export class EosDocumentsPrimarySiteComponent implements OnInit {
  @ViewChild(EvaultFilePdfViewerComponent) private _pdfViewer: EvaultFilePdfViewerComponent;
  constructor(private datePipe: MomentDatePipe, public evaultService: EvaultService, public authService: AuthService, public siteService: SiteService) { }
  faEllipsis = faEllipsis;
  faCross = faXmark;
  history: number;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  selectedStatus = null;
  loading = true;
  studyList = [];
  siteList: any;
  selectedSite: any = null;
  selectedSiteDetails: any;
  sponsorInfo = new SponsorInfo();
  siteFiles: any;
  siteUserGridResponse: any;
  userStudies:any;
  sponsorStudyinfo:any;
  ngOnInit() {
    this.getStudyList();
    this.getEvaultSiteListt();
    this.userStudies=JSON.parse(localStorage.getItem("user_studies"));
      this.userStudies.forEach(element => {
        if(Number(element?.sponsorStudy?.sponsorStudyInfoId) == Number(JSON.parse(localStorage.getItem("sponsor_studyinfo_id")))){
          this.sponsorStudyinfo=element;     
        }
      });
    this.authService.sponsorStudyInfoIdChanged.subscribe((res)=>{
      this.getStudyList();
      this.getEvaultSiteListt();
      this.userStudies=JSON.parse(localStorage.getItem("user_studies"));
      this.userStudies.forEach(element => {
        if(Number(element?.sponsorStudy?.sponsorStudyInfoId) == Number(JSON.parse(localStorage.getItem("sponsor_studyinfo_id")))){
          this.sponsorStudyinfo=element;     
        }
      });
    })
  }

  getStudyList() {
    this.loading = true;
    var siteInfoId = (this.authService.currentUser.userRole.toString() == 'siteAdmin') ? this.authService.site.id : 0;
    this.siteService.getSiteSavedStudyDetails(this.authService.currentUser.organizationContactId, siteInfoId).subscribe(response => {
      this.studyList = response;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  getEvaultSiteListt() {
    this.selectedSite = null;
    let studyId = this.authService.sponsorStudyInfoId; //localStorage.getItem("sponsor_studyinfo_id");
    let siteId = this.authService.site.id;
    this.getGridData(studyId, siteId)
  }

  getEvaultSiteList(studyName) {
    this.selectedSite = null;
    let studyId = studyName.id;
    let siteId = this.authService.site.id;
    this.getGridData(studyId, siteId)
  }

  getSiteName(_id) {
    this.selectedSiteDetails = this.siteList.filter((site) => {
      return (site.id == _id);
    })[0];
  }

  getGridData(study_id, site_id) {
    this.siteUserGridResponse = null;
    this.loading = true;
    this.evaultService.getSiteEOSGridData(study_id, site_id).subscribe(response => {
      this.siteUserGridResponse = response['eVaultDetailViewModels'];
      this.siteUserGridResponse.forEach((siteResponse) => {
        if (siteResponse && siteResponse.receivedOn != null)
          siteResponse.receivedOn = this.datePipe.convertDateToLocal(siteResponse.receivedOn);
      });
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  downloadDocumentFile(docId, docDetails) {
    let requestData = {
      "evaultDocId": docId,
      "filepath": docDetails.s3Path,
      "fileName": docDetails.fileName
    };
    this.evaultService.downloadEvaultDocument(requestData);
  }

  previewDocumentFile(docId, docDetails) {
    let requestForm = {
      "evaultDocId": docId,
      "filepath": docDetails.documentDetails.s3Path,
      "fileName": docDetails.documentDetails.fileName
    }
    this.loading = true;
    this.evaultService.downloadSiteFile(requestForm).subscribe(async response => {
      if (response) {
        this.loading = false;
        const data = 
        { pdfResponse: response, 
          documentDetails: docDetails,
           eosUser: true, 
           siteId: this.authService.site.id,
            evaultId: docId }
            this._pdfViewer.setdocData(data);
            this._pdfViewer.openModal();
      }
            // await dialogRef.afterClosed().subscribe(obj => {
        //   console.log("evault download file close");
        //   this.getGridData(this.studyName.value.id, this.authService.site.id);
        // });
    }, err => {
      console.log(err);
      this.loading = false
    });
  }

  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }

  onStatusValueChanged(val) {
    if (val) {
      this.selectedStatus = val.name;
    }
    this.selectedDropdown = 'none';
  }
  showHistory(i: number) {
    if (this.history == i) {
      this.history = null;
    } else this.history = i;
  }
}

import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/account/services/auth.service';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { SiteService } from 'src/app/core/services/site/site.service';
import { SponsorInfo } from 'src/app/models/sponsor/sponsorinfo.model';
import { UploadSafetyDocumentComponent } from '../upload-safety-document/upload-safety-document.component';
@Component({
  selector: 'app-safety-documents-sponsor',
  templateUrl: './safety-documents-sponsor.component.html',
  styleUrls: ['./safety-documents-sponsor.component.scss']
})
export class SafetyDocumentsSponsorComponent implements OnInit,OnDestroy{
  @Output() uploadDialog: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(UploadSafetyDocumentComponent) uploadSafetyDoc : UploadSafetyDocumentComponent;

  uploadModal: any;
  uploadFile: any;
  formSubmit: boolean;
  uploadFormData: any;
  constructor(public evaultService: EvaultService,public authService: AuthService, public siteService: SiteService) { }

  faEllipsis = faEllipsis;
  faCross = faXmark;
  history: number;

  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';

  selectedStatus = null;
  historyModal: any;
  loading = true;
  historyModalData: any;
  selectedSiteFlag: boolean = false;
  studyList = [];
  safetyDocumentList: any;
  siteList: any;
  selectedSite: any = null;
  selectedSiteDetails: any;
  sponsorStudyId: number;
  sponsorInfo = new SponsorInfo();
  uploadDone: any;
  userDataAnalystRole: boolean = false;
  ngOnInit() {
    this.sponsorStudyId =  this.authService.sponsorStudyInfoId;
    this.getEvaultSiteList();
    this.userDataAnalystRole = (this.authService.currentUser.organizationContactId == 114) ? true : false;
    this.authService.sponsorStudyInfoIdChanged.subscribe((res)=>{
      this.sponsorStudyId = res;
      this.getEvaultSiteList();
    })
  }

  getSafetyDocumentList(studyId) {
    this.loading = true;
    this.evaultService.getSafetyUserGridData(studyId).subscribe(response => {
      this.safetyDocumentList = response;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  getEvaultSiteList() {
    this.loading = true;
    this.evaultService.getSiteListStudyInfo(this.authService.sponsorStudyInfoId).subscribe(response => {
      this.siteList = response;
      this.loading = false;
      this.selectedSiteFlag = true;
    }, err => {
      this.loading = false;
    });
  }

  getSiteName(selectSite) {
    if (selectSite == 'safetyDocuments') {
      this.selectedSite = null;
      this.selectedSiteDetails = { 'siteName': 'Safety' };
    } else {
      this.selectedSite = selectSite.id;
      this.selectedSiteDetails = this.siteList.filter((site) => {
        return (site.id == selectSite.id);
      })[0];
    }

    this.selectedSiteFlag = true;
  }

  addSite(event) {
    if (event) {
      this.loading =false;
      this.getEvaultSiteList();
    }
  }
  // openDoc(event){
  //   if(event){
  //     this.evaultService.importflag.next(event);
  //   }
  // }
  uploadSafetyDocument() {
    const formData = { StudyId: this.sponsorStudyId };
    this.uploadSafetyDoc.openModal(formData);
    // let templateDialogRef = this.matDialog.open(UploadSafetyDocumentComponent, { width: '50%', disableClose: true, data: { container: 'uploadSafetySiteFile', formData: { StudyId: this.sponsorStudyId } } });

    // templateDialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     if(result.statusCode == 200) {
    //       this.uploadDone = result.data;
    //     } else {
    //     }
    //   }
    // });
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
  openModal(data: any) {
    this.historyModalData = data;
    console.log('data', data);
    this.historyModal.show();
  }
  closeModal() {
    this.historyModal.hide();
  }
  ngOnDestroy(): void {
    this.evaultService.containerAction.next('');
  }
  saveUploadResponse(res){
  if(res){
    this.uploadDone = res;
  }
  }
}

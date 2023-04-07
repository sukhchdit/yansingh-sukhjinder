import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/account/services/auth.service';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { SiteService } from 'src/app/core/services/site/site.service';
import { UploadSafetyDocumentComponent } from '../upload-safety-document/upload-safety-document.component';
declare var window: any;
@Component({
  selector: 'app-eos-documents-sponsor',
  templateUrl: './eos-documents-sponsor.component.html',
  styleUrls: ['./eos-documents-sponsor.component.scss']
})
export class EosDocumentsSponsorComponent implements OnInit,OnDestroy{
  @ViewChild(UploadSafetyDocumentComponent) uploadSafetyDoc : UploadSafetyDocumentComponent;
  uploadDone: any;
  constructor( public evaultService: EvaultService,public authService: AuthService, public siteService: SiteService) { }
  siteIndex:number;
  sponsorStudyId: number;
  siteList: any;
  selectedSite: any = null;
  selectedSiteDetails: any;
  selectedSiteFlag: boolean = false;
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
  selectedIRB_SNumber = 'Choose data';
  userDataAnalystRole: boolean = false;
  ngOnInit() {
    this.sponsorStudyId = this.authService.sponsorStudyInfoId;
    this.getEvaultSiteList();
    this.userDataAnalystRole = (this.authService.currentUser.organizationContactId == 114) ? true : false;
    this.authService.sponsorStudyInfoIdChanged.subscribe((res)=>{
      this.sponsorStudyId = res;
      console.log('changed',this.sponsorStudyId,res);
      this.getEvaultSiteList();
    })
    this.historyModal = new window.bootstrap.Modal(
      document.getElementById('historyModal')
    );
  }

  getEvaultSiteList() {
    this.loading = true;
    this.evaultService.getSiteListStudyInfo(this.sponsorStudyId).subscribe((response: Array<object>) => {
      this.siteList = response.filter((res: any)=> res.sitenumber);
      if (this.siteList.length > 0)
        this.getSiteName(this.siteList[0],0);
      else {
        this.selectedSite = "noSite";
        this.selectedSiteFlag = true;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  getSiteName(selectSite,i) {
    this.selectedSite = selectSite?.siteInfoId || undefined;
    this.selectedSiteDetails = this.siteList.filter((site) => {
      return (site.id == selectSite.id);
    })[0];
    console.log(this.selectedSiteDetails);
    this.selectedSiteFlag = true;
    this.siteIndex = i;
  }

  addSite(event) {
    if (event) {
      this.loading = false;
      this.getEvaultSiteList();
    }
  }

  uploadEosDocument() {
     const formData = { StudyId: this.sponsorStudyId, SiteId: this.selectedSite };
    this.uploadSafetyDoc.openModal(formData);
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
  // openDoc(event){
  //   if(event){
  //     this.evaultService.importflag.next(event);
  //   }
  // }
  onIRB_SNumberValueChanged(val) {
    if (val) {
      this.selectedIRB_SNumber = val.name;
    }
    this.selectedDropdown = 'none';
  }
  ngOnDestroy(){
    this.evaultService.containerAction.next('');
  }
  saveUploadResponse(res){
    if(res){
      this.uploadDone = res;
    }
    }

}

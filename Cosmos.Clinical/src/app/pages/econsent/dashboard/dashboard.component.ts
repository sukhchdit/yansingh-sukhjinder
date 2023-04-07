import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/account/services/auth.service';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
import { ScheduledEventComponent } from 'src/app/feature/calendar-feature/scheduled-event/scheduled-event.component';
import { EConsentDashboardViewModel } from 'src/app/models/viewmodels/econsent/econsentdashboard.viewmodel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  faEllipsis = faEllipsis;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  selectedICF_Ver = 'Select';
  selectedLanguage = 'Select';
  sponsorSiteStudyCDAInvitationId: number;
  eConsentData : any[] = [];
  eConsentTempData : any[] = [];
 // public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = '#555555';
  public secondaryColour = '#ccc';
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;
 // public config = { animationType: ngxLoadingAnimationTypes.doubleBounce, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
  loadingIndicator: boolean;
  index:number;
  actionContainerFlag: boolean = false;
  icfVersionList = [];
  languageList = [];
  televisitData: any;
  televisitModalFlag: boolean = false;
 
  @ViewChild(ScheduledEventComponent) private scheduledEvent: ScheduledEventComponent;
  constructor(private authService: AuthService,public eConsentService: EconsentService) { 
  }
  ngOnInit(): void {
    this.onLoad();
  }

  openScheduleVisitModal() {
    this.televisitData = {
      sponsorSiteStudyCDAInvitationId: this.sponsorSiteStudyCDAInvitationId,
      studyInfoId: this.authService.sponsorStudyInfoId,
      calendarEventType: 7,
      calendarEventStatus: 1,
      type: 'EconsentDashboard'
    };
    this.televisitModalFlag = true;
    this.scheduledEvent.openModal(this.televisitData);
  }
  onLoad(){
    this.loadingIndicator = true;
    this.sponsorSiteStudyCDAInvitationId = this.authService.sponsorSiteStudyCdaInvitationId;
    this.eConsentService.getEConsentDashboardData(this.sponsorSiteStudyCDAInvitationId).subscribe((res: EConsentDashboardViewModel[]) => {
      if(res){
        this.loadingIndicator = false;
        this.eConsentTempData = res;
        this.eConsentData = [...this.eConsentTempData];
        this.icfVersionList = Array.from(new Set(res.map((obj)=> obj.icfVersion).filter((v) => v !== undefined)));
        this.languageList = Array.from(new Set(res.map((obj)=> obj.language).filter((v) => v !== undefined)));
      }

    },
    err => {
      this.loadingIndicator = false;
      // this.toastyService.showToast("Signature Request", "Failed to load EConsent Dashboard Data.", ToastType.error);
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
  onICFValueChanged(val) {
    if (val) {
      this.selectedICF_Ver = val;
      this.selectDropdown();
    }
    this.selectedDropdown = 'none';
  }
  onselectedLanguageChanged(val) {
    if (val) {
      this.selectedLanguage = val;
      this.selectDropdown();
    }
    this.selectedDropdown = 'none';
  }
  selectDropdown(){
    let data = [];
    if(this.selectedICF_Ver!== 'Select' && this.selectedLanguage!== 'Select'  && this.selectedICF_Ver &&  this.selectedLanguage){
      data = this.eConsentTempData.filter((x) => (x.icfVersion === this.selectedICF_Ver) && (x.language === this.selectedLanguage) );
    } else if(this.selectedICF_Ver!== 'Select' && this.selectedICF_Ver ){
      data = this.eConsentTempData.filter((x) => (x.icfVersion === this.selectedICF_Ver));
    } else if(this.selectedLanguage!== 'Select' && this.selectedLanguage){
      data = this.eConsentTempData.filter((x) => (x.language === this.selectedLanguage) );
    } else {
      data = this.eConsentTempData;
    }
    this.eConsentData = [...data];
  }
}
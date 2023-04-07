import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';

import {
  faEllipsis,
  faClockRotateLeft,
  faPenToSquare,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import {
  IcfSource,
  IcfStatusType,
  IcfType,
  updateActivityType,
} from 'src/app/models/econsent/enum/econsent.enum';
import { SiteService } from 'src/app/core/services/site/site.service';
import { AuthService } from 'src/app/account/services/auth.service';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
import { LocalStoreManager } from 'src/app/account/services/local-store-manager.service';
import { CurrentUserViewModel } from 'src/app/models/account/currentuserviewmodel.model';
import { DBkeys } from 'src/app/account/services/db-Keys';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  faEllipsis = faEllipsis;
  faClipboard = faClipboard;
  faPenToSquare = faPenToSquare;
  faClockRotateLeft = faClockRotateLeft;
  faCross = faXmark;
  EManageModal: any;
  selectedLanguage: string = null;

  history: number;
  dateInput: number;
  status: number;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  stages = status;
  selectedStatus = null;

  @ViewChild('tableContains') tableContains: ElementRef;
  studyList = [];
  selectedStudyId: any;
  eConsentGrid: any = [];
  editCache: any;
  selectEconsentData: any;
  icfTypeObject = IcfType;
  IcfTypeOptions = Object.keys(IcfType)
    .map((key) => IcfType[key])
    .filter((value) => typeof value === 'string');
  icfSourceObject = IcfSource;
  IcfSourceOptions = Object.keys(IcfSource)
    .map((key) => IcfSource[key])
    .filter((value) => typeof value === 'string');
  icfStatusTypeObject = IcfStatusType;
  IcfStatusTypeOptions = Object.keys(IcfStatusType)
    .map((key) => IcfStatusType[key])
    .filter((value) => typeof value === 'string');
  UpdateActivityType = updateActivityType;
  viewHistoryGridData: any = [];
  sponserName: any;
  sponsorSiteStudyCDAInvitationId: number;

  constructor(
    public localStorage: LocalStoreManager,
    public e1: ElementRef,
    public authService: AuthService,
    public siteService: SiteService,
    public eConsentService: EconsentService
  ) {}
  @HostListener('document:click', ['$event']) outClickHandler(e: MouseEvent) {
    if (
      this.tableContains &&
      this.tableContains.nativeElement.contains(e.target)
    ) {
      if (this.eConsentGrid && this.eConsentGrid.length > 0) {
        this.eConsentGrid.forEach((each) => {
          if (each && (each['icfStatusEdit'] || each['effectiveDateEdit'])) {
            delete each['icfStatusEdit'];
            // delete each['icfApprovedDateEdit'];
            delete each['effectiveDateEdit'];
            // delete each['icfTypeEdit'];
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this.sponsorSiteStudyCDAInvitationId = this.authService.sponsorSiteStudyCdaInvitationId;
    this.authService.sponsorSiteStudyCdaInvitationIdChanged.subscribe((res) => {
      this.sponsorSiteStudyCDAInvitationId = res;
      this.getEconsentGridData();
    });
    this.getEconsentGridData();
  }
  getEconsentGridData() {
    this.eConsentService.getEconsentGridData(this.sponsorSiteStudyCDAInvitationId).subscribe(
      (data) => {
        this.eConsentGrid = data;
        if (this.eConsentGrid && this.eConsentGrid.length > 0) {
          this.selectEconsentData = this.eConsentGrid[0].econsentId;
          this.viewHistoryCall();
        } else {
          this.selectEconsentData = null;
          this.viewHistoryGridData = [];
        }
      },
      (err) => {}
    );
  }

  viewHistoryCall() {
    if (this.selectEconsentData) {
      this.eConsentGrid.forEach((econsent: object) => {
        if (econsent['econsentId'] == this.selectEconsentData) {
          this.viewHistoryGridData = econsent['auditDetails'];
        }
      });
    }
  }

  editCellData(id, property) {
    if (this.eConsentGrid && this.eConsentGrid.length > 0) {
      this.eConsentGrid.forEach((each) => {
        if (each && (each['icfStatusEdit'] || each['effectiveDateEdit'])) {
          delete each['icfStatusEdit'];
          delete each['effectiveDateEdit'];
        }
      });
    }
    if (
      this.eConsentGrid[id][property] ||
      this.eConsentGrid[id][property] == null ||
      this.eConsentGrid[id][property] == ''
    ) {
      this.eConsentGrid[id][property + 'Edit'] = true;
    }
  }

  editedCell(id, property, event) {
    if (property == 'effectiveDate') {
      this.eConsentGrid[id][property] = new Date(
        event.target.value
      ).toISOString();
    } else {
      this.eConsentGrid[id][property] = event;
    }
    delete this.eConsentGrid[id][property + 'Edit'];
    let formData = {
      Id: this.eConsentGrid[id]['econsentId'],
      UpdatedValue: this.eConsentGrid[id][property],
      ActivityType: this.UpdateActivityType[property],
      UpdatedBy: this.localStorage.getDataObject<CurrentUserViewModel>(
        DBkeys.CURRENT_USER
      ).id,
      StudyId: this.sponsorSiteStudyCDAInvitationId,
    };
    this.eConsentService
      .updateCellData(this.eConsentGrid[id]['econsentId'], formData)
      .subscribe(
        (response) => {
          if (response) {
            this.gridSuccess(response);
          }
        },
        (err) => {
          console.log(err);
          this.getEconsentGridData();
        }
      );
  }

  copyDocumentUrl(documentUrl) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = documentUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  gridSuccess(response) {
    if (response) this.getEconsentGridData();
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
  showStatusInputs(i: number) {
    if (this.status == i) {
      this.status = null;
    } else {
      this.status = i;
      console.log('statys', this.status);
    }
  }
  showDateInput(i) {
    if (this.dateInput == i) {
      this.dateInput = null;
    } else {
      this.dateInput = i;
    }
  }

  onLanguageValueChanged(val) {
    if (val) {
      this.selectedLanguage = val.name;
    }
    this.selectedDropdown = 'none';
  }

  eManagerModalClose(value) {
    if(value){
      this.getEconsentGridData();
    }
  }
}

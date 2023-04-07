import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/account/services/auth.service';
import { MomentDatePipe } from 'src/app/core/pipes/momentdate.pipe';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { eVaultDocStatus, eVaultTypeOfReports } from 'src/app/models/evault/evault.enum';
import Swal from 'sweetalert2';
import { EvaultFilePdfViewerComponent } from '../../evault-common/evault-file-pdf-viewer/evault-file-pdf-viewer.component';
declare var window: any;

@Component({
  selector: 'app-eos-sponsor-grid',
  templateUrl: './eos-sponsor-grid.component.html',
  styleUrls: ['./eos-sponsor-grid.component.scss']
})
export class EosSponsorGridComponent implements OnInit, OnChanges {
  selectedDropdown = 'none';
  historyModalData: any;
  history: number;
  faEllipsis = faEllipsis;
  faCross = faXmark;
  commentsModal: any;
  model = { comments: '' };
  docStatus: any;
  obj: { evaultId: any; docId: any; comments: string; evaultDocStatus: any; };
  constructor(private datePipe: MomentDatePipe, public authService: AuthService, public evaultService: EvaultService) {

  }
  @ViewChild(EvaultFilePdfViewerComponent) private _pdfViewer: EvaultFilePdfViewerComponent;

  @Input() studyId: any;
  @Input() siteId: any;
  @Input() uploadDocument: any;
  @Input() siteUploadDocument: any;
  @Input() content: any;
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  siteUserGridResponse: any;
  viewSelectedHistoryGrid: any;
  selectedHistoryId: any;
  eVaultDocObject = eVaultDocStatus;
  eVaultTypeOfReports = eVaultTypeOfReports;
  qcRole: boolean = false;
  dataAnalystRole: boolean = false;
  CRARole: boolean = false;
  eosDocumentUser: boolean = false;
  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  historyModal: any;

  ngOnInit(): void {
    // this.getUserRole();
    this.historyModal = new window.bootstrap.Modal(
      document.getElementById('historyModal')
    );
    this.commentsModal = new window.bootstrap.Modal(
      document.getElementById('commentsModal')
    );
  }
  getUserRole() {
    if (this.authService.currentUser) {
      let userRole = this.authService.currentUser.organizationContactId;
      if (userRole == 114) {
        this.dataAnalystRole = true;
        this.qcRole = false;
        this.CRARole = false;
      } else if (userRole == 113) {
        this.dataAnalystRole = false;
        this.qcRole = true;
        this.CRARole = false;
      } else if (userRole == 95) {
        this.dataAnalystRole = false;
        this.qcRole = false;
        this.CRARole = true;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading.emit(true);
    if (this.content === 'EosDocument') {
      this.eosDocumentUser = true;
    }
    if (this.siteId == 'noSite') {
      this.loading.emit(false);
      this.viewSelectedHistoryGrid = null;
      this.siteUserGridResponse = [];
      this.selectedHistoryId = null;
      this.eosDocumentUser = true;
    } else {
      if (this.uploadDocument || ((this.siteId == null) && (this.content !== 'EosDocument'))) {
        this.getSafetyGridData();
        this.eosDocumentUser = false;
      } else if ((changes && changes.siteId && changes.siteId.currentValue) || this.siteUploadDocument) {
        this.eosDocumentUser = true;
        this.getGridData();
      }
    }

  }

  addSiteUser() {
    // const dialogRef = this.dialog.open(AddEditContactComponent, {
    //   disableClose: true,
    //   data: { organizationId: this.authService.organization.id, contactId: 0 }
    // });
    // dialogRef.afterClosed().subscribe(obj => {
    //   this.getGridData();
    // });
  }

  getSafetyGridData() {
    this.loading.emit(true);
    this.viewSelectedHistoryGrid = null;
    this.siteUserGridResponse = null;
    this.selectedHistoryId = null;
    this.evaultService.getSafetyUserGridData(this.studyId).subscribe(response => {
      this.siteUserGridResponse = response;
      this.siteUserGridResponse.forEach((siteUser) => {
        siteUser.auditDetails.forEach((auditDetail) => {
          if (auditDetail && auditDetail.receivedOn != null)
            auditDetail.activityDate = this.datePipe.convertDateToLocal(auditDetail.activityDate);
        })
      });
      if (this.siteUserGridResponse.length != 0) {
        this.viewHistoryCall(this.siteUserGridResponse[0].id);
      }
      this.loading.emit(false);
    }, err => {
      this.loading.emit(false);
    })
  }

  getGridData() {
    this.loading.emit(true);
    this.viewSelectedHistoryGrid = null;
    this.siteUserGridResponse = null;
    this.selectedHistoryId = null;
    if (this.siteId == 'noSite') {
      this.loading.emit(false);
    }
    this.evaultService.getSafetyEosDocuments(this.studyId, this.siteId).subscribe(response => {
      this.siteUserGridResponse = response;
      this.siteUserGridResponse.forEach((siteUser) => {
        siteUser.auditDetails.forEach((auditDetail) => {
          if (auditDetail && auditDetail.receivedOn != null)
            auditDetail.activityDate = this.datePipe.convertDateToLocal(auditDetail.activityDate);
        })
      });
      if (this.siteUserGridResponse.length != 0) {
        this.viewHistoryCall(this.siteUserGridResponse[0].id);
      }

      this.loading.emit(false);
    }, err => {
      this.loading.emit(false);
    })
  }

  viewHistoryCall(id) {
    this.viewSelectedHistoryGrid = this.siteUserGridResponse.filter((details) => {
      return details.id == id;
    })[0];
    this.selectedHistoryId = id;
  }

  submitDocStatus(id, docId, docStatus) {
    this.obj = null;
    this.obj = {
      evaultId: id,
      docId: docId,
      comments: '',
      evaultDocStatus: docStatus
    }

    if (docStatus == 10) {
      this.commentsModal.show();
    } else {
      Swal.fire({
        title: `Are you sure to ${(docStatus == 1) ? 'Approve' : (docStatus == 2) ? 'QA Approve' : (docStatus == 4) ? 'Publish' : null}?`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.updateEvaultFileStatus(docId, this.obj);
        }
      })
    }
  }
  onNoClick() {
    this.commentsModal.hide();
  }

  onSubmit() {
    if (this.model != null) {
      this.obj.comments = this.model.comments;
      this.updateEvaultFileStatus(this.obj.docId, this.obj);
    }
    this.commentsModal.hide();
  }

  updateEvaultFileStatus(docId, obj) {
    this.evaultService.updateFileStatus(docId, obj).subscribe(response => {
      if (response) {
        if (this.eosDocumentUser) {
          this.getGridData();
        } else {
          this.getSafetyGridData();
        }
      }
    }, err => {
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
    this.evaultService.downloadSiteFile(requestForm).subscribe(response => {
      if (response) {
       // this.loading.emit(false);
        const data =  { pdfResponse: response, documentDetails: docDetails, eosUser: this.eosDocumentUser, siteId: this.siteId, evaultId: docId };
        this._pdfViewer.setdocData(data);
        this._pdfViewer.openModal();
        // dialogRef.afterClosed().subscribe(finalResponse => {
        //   console.log("evault download file close");
        //   if (finalResponse) {
        //     if (!this.eosDocumentUser) {
        //       this.getSafetyGridData();
        //     } else {
        //       this.getGridData();
        //     }
        //   }
        // });
      }
    }, err => {
      this.loading.emit(false);
    });
  }
  rowData(row) {
    console.log('row', row);
  }
  uploadFile() {
    // let templateDialogRef = this.dialog.open(EvaultAddSiteComponent, { width: '40%', disableClose: true, data: { container: 'uploadSiteFile', formData: { SiteId: this.siteId, StudyId: this.studyId } } });

    // templateDialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     (this.siteId == null) ? this.getSafetyGridData() : this.getGridData();
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

  openModal(data: any) {
    this.historyModalData = data;
    console.log('data', data);
    this.historyModal.show();
  }
  closeModal() {
    this.historyModal.hide();
  }

  showHistory(i: number) {
    if (this.history == i) {
      this.history = null;
    } else this.history = i;
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { Observable, startWith, map } from 'rxjs';
import { AuthService } from 'src/app/account/services/auth.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { EvaultService } from 'src/app/core/services/evault/evault.service';
import { ExcelSheetService } from 'src/app/core/services/evault/excel-sheet.service';
import { SiteService } from 'src/app/core/services/site/site.service';
import { SponsorService } from 'src/app/core/services/sponsor/sponsor.service';
import { SponsorStudyService } from 'src/app/core/services/sponsor/sponsorstudy.service';
import { Country } from 'src/app/models/common/country.model';
import { EvaultSite } from 'src/app/models/evault/evault-site.model';
import { OrganizationContact } from 'src/app/models/organization/organizationcontact.model';
import { Role } from 'src/app/models/role.model';
import { SiteDetail } from 'src/app/models/site/sitedetail.model';
import { SiteInfo } from 'src/app/models/site/siteinfo.model';
import { SponsorInfo } from 'src/app/models/sponsor/sponsorinfo.model';
import * as XLSX from 'xlsx';

declare var window: any;

@Component({
  selector: 'app-evault-common-action-dialog',
  templateUrl: './evault-common-action-dialog.component.html',
  styleUrls: ['./evault-common-action-dialog.component.scss']
})
export class EvaultCommonActionDialogComponent implements OnInit,OnDestroy{
  @Output() addSiteSuccess: EventEmitter<boolean> = new EventEmitter();
  listHidden = false;
  faStarOfLife=faStarOfLife;
  reqContainer: string;
  InvalidRows: any = [];
  uploadFile: any;
  uploadModal: any;
  formSubmit: boolean = false;
  uploadFormData: any;
  selectedStudy: any;
  loadingIndicator: boolean;
  sponsorInfo = new SponsorInfo();
  countries: Country[] = [];
  states: any;
  studyList: any = [];
  listloadingIndicator: boolean;
  siteInfo = new SiteInfo();
  pIEmail = new FormControl('');
  filteredOptions: Observable<any[]>;
  pIEmailId: any;
  pIEmailValue:any;
  pIFieldsDisable: boolean = false;
  piSitesList: any = null;
  organizationContact = new OrganizationContact();
  piSelectedSiteId: number | null;
  roles: Role[] = [];
  evaultSite = new EvaultSite();
  importModal: any;
  addSiteModal: any;
  siteDetail = new SiteDetail();
  filteredList: any;
  investigatorEmailExisting: string = 'yes';
  piSitesListEmails: any;
  constructor(public siteService: SiteService,public excelService:ExcelSheetService, private sponsorStudyService: SponsorStudyService, public evaultService: EvaultService, public sponsorService: SponsorService, public commonService: CommonService, public authService: AuthService) {
  }
  ngOnInit() {
    this.importModal = new window.bootstrap.Modal(
      document.getElementById('importModal')
    );
    this.uploadModal = new window.bootstrap.Modal(
      document.getElementById('uploadModal'));
      this.addSiteModal = new window.bootstrap.Modal(
      document.getElementById('addSiteModal'));
    this.evaultService.containerAction.subscribe((x) => {
      this.uploadFile = null;
      if (x !== '') {
        this.reqContainer = x.toString();
      } 
      if (x == 'uploadSiteList' && this.importModal) {
        this.importModal.show();
        this.getStates(231);
      } else if (x == 'uploadSiteFile' && this.uploadModal) {
        this.uploadModal.show();
      } else if (x == 'addSite' && this.addSiteModal) {
        this.registerSiteList();
        this.addSiteModal.show();
      }

    })
    this.siteInfo.organizationInfoId = this.authService.organization.id;
    this.getCountries();
    this.selectedStudy = this.authService.sponsorStudyInfoId;
    // if (this.reqContainer == 'uploadSiteList') {
    //   this.selectedStudy = this.authService.sponsorStudyInfoId;
    // }
    // this.filteredOptions = this.pIEmail.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(email => email ? this._filter(email) : null)
    //   );


  }

  private _filter(value: string) {
    if (value) {
      let data = this.piSitesList && this.piSitesList.find(x => x.piEmailId === value);
      if (data) {
        this.organizationContact.name = data.name;
        this.organizationContact.phone = data.phoneNumber;
        this.pIEmailId = data.id;
        this.pIFieldsDisable = true;
      } else {
        this.organizationContact.name = null;
        this.organizationContact.phone = null;
        this.pIFieldsDisable = false;
      }
      this.organizationContact.email = value;
    }
    // return this.piSitesList.filter(e =>
    //   e.piEmailId ? e.piEmailId.toLowerCase().includes(value.toLowerCase()) : null);
  }

  getSponsor(id) {
    this.sponsorService.get(id).subscribe(response => {
      if (response) {
        this.sponsorInfo = response;
        this.getAll(this.sponsorInfo.id);
      }
    });
  }
  getCountries() {
    this.commonService.getCountries().subscribe(response => {
      if (response) {
        this.countries = response;
      }
    });
  }
  getAll(sponsorInfoId) {
    this.listloadingIndicator = true;
    this.sponsorStudyService.getAllViewModel(sponsorInfoId).subscribe(response => {
      this.studyList = response;
      this.listloadingIndicator = false;
    },
      err => {
        this.listloadingIndicator = false;
      });
  }
  getStates(countryId) {

    if (countryId) {
      this.commonService.getStates(countryId).subscribe(response => {
        if (response) {
          this.states = response;
        }
        else {
          this.states = [];
        }
      });
    }
  }

  onSaveInfo(form) {
    if (!form.valid || !this.siteDetail.stateId || !this.siteDetail.countryId) {
      return;
    } else {
      let formData = form.value;
      this.loadingIndicator = true;
      let requiredData = [
        {
          "City": formData.city,
          "Country": Number(this.siteDetail.countryId),
          "Email": formData.email,
          "Phone": formData.sitePhoneNumber,
          "PrincipleInvestigatorName": this.organizationContact.name,
          "PrincipleInvestigatorPh": this.organizationContact.phone,
          "PrincipleInvestigatorEmail": this.pIEmailValue,
          "FirstName":formData.firstName,
          "LastName":formData.lastName,
          "SiteAddress1": formData.address1,
          "SiteNumber": formData.siteNumber,
          "SiteName": formData.name,
          "SiteId": this.pIEmailId,
          "State": Number(this.siteDetail.stateId)
        }
      ];
      this.evaultService.uploadBulkSiteData(requiredData, this.authService.organization.id, this.authService.sponsorStudyInfoId).subscribe(response => {
        this.loadingIndicator = false;
        this.addSiteSuccess.emit(true);
        this.addSiteModal.hide();
        //this.toastyService.showToast("Add Site", "Site Details added successfully!", ToastType.success);
        //this.dialogRef.close(response);
      }, err => {
        this.addSiteSuccess.emit(false);
        this.loadingIndicator = false;
        // this.toastyService.showToast("Add Site", "Failed to add Details.", ToastType.error);
      });
    }
  }

  siteNameChange(e) {
    this.piSelectedSiteId = null;
    this.piSitesList = this.piSitesList;
  }
  piSiteSelect(value) {
    this.piSelectedSiteId = value;
    this.siteInfo.name = this.piSitesList.find((site: any) => site.id === Number(value)).name;
  }
  getListOfSitesByOrganizationContactId(siteInfo) {
    this.siteService.getSiteNamesAndIdByOrganizationId(this.authService.organization.id).subscribe(response => {
      if (response) {
        this.authService.saveSiteList(response);
        if (response.length == 1)
          this.authService.saveSiteDetails(siteInfo)
      }
    });
  }
  isInvestigatorRole(roleId: number) {
    var flag = false;
    var role = this.roles.find(x => x.id == roleId);
    if (role && role != null) {
      if (role.name.toLowerCase().indexOf('investigator') > 0) {
        flag = true;
      }
    }
    return flag;
  }

  registerSiteList() {
    // registerSiteList(event) {
    this.listloadingIndicator = true;
    // this.evaultService.getPIregisteredSiteList(event.target.value).subscribe((response: any) => {
    this.evaultService.getPIregisteredSiteListData(this.authService.organization.id).subscribe((response: any) => {
      if (response && response.length !== 0) {
        this.piSitesList = response;
        this.piSitesListEmails = this.piSitesList.filter(x=> x.piEmailId);
        // console.log('options',this.options);
        this.listloadingIndicator = false;
      } else {
        this.piSitesList = null;
        this.listloadingIndicator = false;
      }
    }, err => {
      this.listloadingIndicator = false;
    })
  }

  saveSiteDetails(data, organizationContactData) {
    let requestData = {
      "siteInfoId": data.id,
      "studyId": this.evaultSite.study['id'],
      "siteGuid": data.siteGuid,
      "studyGuid": this.evaultSite.study['studyGuid'],
      "siteNumber": this.evaultSite.siteNumber,
      "createdBy": this.authService.currentUser.id,
      "protocalNumber": this.evaultSite.study['protocolNumber'],
      "organizationContactId": organizationContactData.id,
      "organizationInfoId": this.authService.organization.id,
      "createdOn": new Date(),
      "status": true
    }
    this.evaultService.saveSponsorSiteCDA(requestData).subscribe(response => {
      // this.toastyService.showToast("Site", "Site basic info created successfully!", ToastType.success);
      //  this.dialogRef.close(response);
    }, err => {
      // this.toastyService.showToast("Site", "Failed to save Site Info.", ToastType.error);
    });
  }

  onFileChange(file) {
    console.log('file,', file);
    this.uploadFile = file.target.files[0];
  }

  onFileXLSXChange(file) {
    this.uploadFile = file.target.files[0];
    console.log(this.uploadFile);
  }
  uploadSiteFormFile() {
    this.formSubmit = true;
    if (!this.uploadFile) return;
    this.formSubmit = false;
    const formData = new FormData();
    if (this.uploadFormData.SiteId != null) {
      formData.append('siteId', this.uploadFormData.SiteId);
    }
    this.loadingIndicator = true;
    formData.append('studyId', this.uploadFormData.StudyId);
    formData.append('uploadBy', (this.authService.currentUser.id).toString());
    formData.append('_file', this.uploadFile);
    this.evaultService.uploadEvaultFile(formData).subscribe(response => {
      if (response) {
        this.loadingIndicator = false;
        // this.dialogRef.close(response);
        // this.toastyService.showToast("Site File", "File Uploaded successfully!", ToastType.success);
      }
    }, err => {
      this.loadingIndicator = false;
      console.log(err);
      //this.toastyService.showToast("Site File", "Failed to Upload.", ToastType.error);
    })
  }
  uploadSiteListFile() {
    this.loadingIndicator = true;
    this.InvalidRows = [];
    this.formSubmit = true;
    if (!this.uploadFile || !this.selectedStudy) return;
    this.formSubmit = false;

    if (this.uploadFile && this.selectedStudy) {
      let fileFormat = this.uploadFile.name.split('.')[1].toLowerCase();
      if (fileFormat != 'xlsx') {
        return;
      }
      let fileReader = new FileReader();

      fileReader.readAsBinaryString(this.uploadFile);
      fileReader.onload = (e: any) => {
        let data = e.target.result;
        let workdata = XLSX.read(data, { type: "binary" });
        let requiredData = workdata.SheetNames.map(sheet => {
          return XLSX.utils.sheet_to_json(workdata.Sheets[sheet]);
        })[0];
        if (requiredData && requiredData.length !== 0) {
          this.loadingIndicator = true;
          let resultData = requiredData.map((obj, index) => {
           // let countryId = this.countries.find((country) => country.name == obj['Country'])?.id || null;
           // this.getStates(countryId);
           // let stateId = this.states.find((state) => state.name == obj['State'])?.id || null;
            if (obj['City'] && obj['State'] && obj['Email'] && obj['Principle Investigator Name'] && obj['Principle Investigator Ph'] && obj['Principle Investigator email'] && obj['Site Address1'] && obj['Site Number'] && obj['Site name'] && obj['Country']) {
             let data = {
              "City": obj['City'],
              "Country": obj['Country'],
              "Email": obj['Email'],
              "Phone": obj['Phone'],
              "PrincipleInvestigatorName": obj['Principle Investigator Name'],
              "PrincipleInvestigatorPh": obj['Principle Investigator Ph'],
              "PrincipleInvestigatorEmail": obj['Principle Investigator email'],
              "SiteAddress1": obj['Site Address1'],
              "SiteNumber": obj['Site Number'],
              "SiteName": obj['Site name'],
              "State": obj['State'],
              "LastName": obj['Last Name'],
              "FirstName": obj['First Name']
            }
            console.log('data',data);
              return data;
            } else {
              this.InvalidRows.push(index + 1);
            }

          });
          if (this.InvalidRows.length == 0) {
            this.evaultService.uploadBulkSiteData(resultData, this.authService.organization.id, this.selectedStudy).subscribe(response => {
              if (response) {
                this.loadingIndicator = false;
                //this.toastyService.showToast("Import Site List File", "Imported File successfully!", ToastType.success);
                this.importModal.hide()
              }
            }, err => {
              this.loadingIndicator = false;
              // this.toastyService.showToast("Import Site List File", "Failed to Import Site List File.", ToastType.error);
            })
          } else {
            this.loadingIndicator = false;
            let joinInvalidRows = this.InvalidRows.join(',');
            console.log('InvalidRows', joinInvalidRows);
            // this.toastyService.showToast("Import Site List File", `${joinInvalidRows} row(s) are Invalid data. Please fill it and reupload the file`, ToastType.warning );
          }


        }
      }
    }
  }

  changeEmail(event) {
    console.log('hegfh', event);
    if (event) {
      this.organizationContact.name = event.name,
        this.organizationContact.phone = event.phoneNumber
    }
  }

  closeModal(f?:any) {
    this.uploadFile = null;
    if(f){
      f.resetForm();
    }
    this.organizationContact= new OrganizationContact();
   // this.siteDetail = null;
   // this.siteInfo = null;
    this.uploadModal.hide();
    this.importModal.hide();
    this.addSiteModal.hide();
    this.pIEmailValue = null;
    this.evaultService.containerAction.next('');
  }

  ngOnDestroy(): void {
    this.importModal = null;
    this.addSiteModal = null;
    this.uploadModal = null; 
  }
  onSubmit(f){

  }
  onValueChange(e,f){
    if(f == 'Country') {
      this.getStates(e);
      console.log(e,f);
      this.siteDetail.countryId = e;
    } else if(f == 'State'){
      this.siteDetail.stateId = e;
    } else if(f == 'piEmail') {
      this.pIEmailValue = this.piSitesListEmails.find((val) => val.id == e).piEmailId;
      this.pIEmailId = e;
      this._filter(this.pIEmailValue);
    }

  }

  exportAsXLSX() {
    let sampleData = [{
      "First Name":'',
      "Last Name":'',
      "Site name": '',
      "Site Address1": '',
      "City": '',
      "State": '',
      "Country": '',
      "Phone": '',
      "Email": '',
      "Site Number": '',
      "Principle Investigator Name": '',
      "Principle Investigator email ": '',
      "Principle Investigator Ph": ''
    }];
    this.excelService.exportAsExcelFile(sampleData, 'eVault');
}

emailChange(event,pIEmail){
  if(this.pIEmailValue && !pIEmail.errors){
    this._filter(event.value);
  }
}
}

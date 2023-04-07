import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/account/services/auth.service';
import { MomentDatePipe } from 'src/app/core/pipes/momentdate.pipe';
import { CalendarEventService } from 'src/app/core/services/calendar/calendarevent.service';
import { OrganizationService } from 'src/app/core/services/organization/organization.service';
import { SiteService } from 'src/app/core/services/site/site.service';
import { StudySubjectService } from 'src/app/core/services/subject/studysubject.service';
import { CalendarEvent, CalendarEventType } from 'src/app/models/calendar/calendarevent.model';
import { CalendarEventParticipent } from 'src/app/models/calendar/calendareventparticipent.model';
import { OrganizationContact } from 'src/app/models/organization/organizationcontact.model';
import { SponsorSiteStudyCDAInvitation } from 'src/app/models/sponsor/sponsorsitestudycdainvitation.model';
import { StudySubject } from 'src/app/models/subject/studysubject.model';
import { ActionButtonViewModel } from 'src/app/models/userrrolemanagement/actionbuttonview.model';
import { UserRole } from 'src/app/models/account/user.model';
declare var window: any;

@Component({
  selector: 'app-scheduled-event',
  templateUrl: './scheduled-event.component.html',
  styleUrls: ['./scheduled-event.component.scss']
})
export class ScheduledEventComponent {

  @Input() data: any;
  calendarEvent = new CalendarEvent();
  loadingIndicator: boolean;
  showCalendarEventType: boolean = false;

  organizationContacts: OrganizationContact[] = [];
  participentList: OrganizationContact[] = [];
  studyStaffReminder: string[] = [];
  calendarEventParticipent = new CalendarEventParticipent();
  calendarEventParticipents: CalendarEventParticipent[] = [];
  sponsorSiteStudyCDAInvitations: SponsorSiteStudyCDAInvitation[];
  studySubjects: StudySubject[];
  televisitUrl: string;
  disableCalendeType : boolean =false;
  //UI Action Buttons Starts
  showSave: boolean;
  showAdd: boolean;
  showDelete: boolean;
  showEdit: boolean;
  //UI Action Button Ends

  buttons: ActionButtonViewModel[] = [];

  historyModal: any;
  selectedDropdown = 'none';
  selectedLanguage = 'Select';
  selectedCountry = 'Select';
  selectedCategory = 'Select';
  language = [];
  country = [];
  category = [];
  showForm: boolean = false;
  modalOpenFlag: boolean = false;

  constructor(private calendarEventService: CalendarEventService, private organizationService: OrganizationService, private authService: AuthService, private datePipe: DatePipe,
   private siteService: SiteService, private studySubjectService: StudySubjectService, private momentDatePipe: MomentDatePipe) {
    // if (this.authService.userStudies && this.authService.userStudies.length > 0 && this.authService.userStudies[0].isAdmin == false) {
    //   this.buttons = this.userInterfaceService.getUserInterfaceButtons(this.componentId);
    //   if (this.buttons) {
    //     this.buttons.forEach(button => {
    //       if (button.actionButtonName == 'Save' && button.isApplicable)
    //         this.showSave = true;
    //       else if (button.actionButtonName == 'Edit' && button.isApplicable)
    //         this.showEdit = true;
    //       else if (button.actionButtonName == 'Delete' && button.isApplicable)
    //         this.showDelete = true;
    //       else if (button.actionButtonName == 'Add' && button.isApplicable)
    //         this.showAdd = true;
    //     });
    //   }
    // }
    // else if (this.authService.userStudies && this.authService.userStudies.length > 0 && this.authService.userStudies[0].isAdmin == true) {
      this.showSave = true;
      this.showEdit = true;
      this.showDelete = true;
      this.showAdd = true;
    // }
  }
  ngOnInit() {
    this.historyModal = new window.bootstrap.Modal(
      document.getElementById('televistPopup')
    );
  }

  getInitial() {
    this.calendarEvent.startTime = '00:00';
    this.calendarEvent.endTime = '00:00';
    this.calendarEventParticipent.startTime = '00:00';
    this.calendarEventParticipent.endTime = '00:00';
    this.calendarEvent.startDate = this.convertDateToDisplayFormat(new Date());
    this.calendarEvent.endDate = this.convertDateToDisplayFormat(new Date());
    this.calendarEventParticipent.startDate = this.convertDateToDisplayFormat(new Date());
    this.calendarEventParticipent.endDate = this.convertDateToDisplayFormat(new Date());
    if(this.data.type == 'EconsentDashboard'){
      this.getUserStudies();
      this.calendarEvent.calendarEventType = this.data.calendarEventType;
      this.calendarEvent.sponsorSiteStudyCDAInvitationId = this.data.sponsorSiteStudyCDAInvitationId;
      this.calendarEvent.calendarEventStatus = this.data.calendarEventStatus;
      this.disableCalendeType = true;
    }
    if (this.data.id) {
      this.calendarEvent.id = this.data.id;
      this.getCalendarEvent();
    }
    else if (this.data.selectedDate) {
      this.calendarEvent.startTime = '00:00';
      this.calendarEvent.endTime = '00:00';
      this.calendarEventParticipent.startTime = '00:00';
      this.calendarEventParticipent.endTime = '00:00';
      this.calendarEvent.startDate = this.convertDateToDisplayFormatWithoutIncrement(this.data.selectedDate);
      this.calendarEvent.endDate = this.convertDateToDisplayFormatWithoutIncrement(this.data.selectedDate);
      this.calendarEventParticipent.startDate = this.convertDateToDisplayFormatWithoutIncrement(this.data.selectedDate);
      this.calendarEventParticipent.endDate = this.convertDateToDisplayFormatWithoutIncrement(this.data.selectedDate);
    }
   
    for (let i = 1; i <= 24; i++) {
      this.studyStaffReminder.push(i.toString());
    }

    var siteAdmin = UserRole[UserRole.siteAdmin];
    var siteUser = UserRole[UserRole.siteUser];
    if (this.authService.currentUser.userRole.toString() == siteAdmin || this.authService.currentUser.userRole.toString() == siteUser) {
      this.showCalendarEventType = true;
    }
    this.getContacts();
  }
  convertDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  convertDateToDisplayFormatWithoutIncrement(strdate) {
    let date = new Date(strdate);
    return date.toISOString().split('T')[0];
  }

  convertDateToDisplayFormat(strdate) {
    let date = new Date(strdate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 16);
  }

  transformDate(date: Date) {
    const transformed_yyyy = this.datePipe.transform(date, 'yyyy');
    const transformed_MM = this.datePipe.transform(date, 'MM');
    const transformed_dd = this.datePipe.transform(date, 'dd');
    return { year: Number(transformed_yyyy), month: Number(transformed_MM), day: Number(transformed_dd) };
  }

  // transformDateStruct(date: NgbDateStruct) {
  //   return new Date(date.year, date.month - 1, date.day);
  // }

  changeDate() {

    if (this.calendarEvent.endDate < this.calendarEvent.startDate) {
      // this.toastyService.showToast("Calendar Event", "End date cannot be less then start date.", ToastType.error);
      return false;
    }
    else {
      return true;
    }
  }

  participentDateChanged() {
    var flag = true;
    if (this.calendarEventParticipent.endDate < this.calendarEventParticipent.startDate) {
      // this.toastyService.showToast("Calendar Event", "End date cannot be less then start date.", ToastType.error);
      return false;
    }
    else if (this.calendarEventParticipent.endDate < this.calendarEventParticipent.startDate) {
      // this.toastyService.showToast("Calendar Event", "Participent start date cannot be less then event start date.", ToastType.error);
      flag = false;

    }
    else if (this.calendarEventParticipent.endDate > this.calendarEvent.endDate) {
      // this.toastyService.showToast("Calendar Event", "Participent end date time cannot be greater then event end date time.", ToastType.error);
      flag = false;
    }
    else if (this.calendarEventParticipent.startDate < this.calendarEvent.startDate) {
      // this.toastyService.showToast("Calendar Event", "Participent start date time cannot be less then event start date time.", ToastType.error);
      flag = false;
    }
    else if (this.calendarEventParticipent.endDate > this.calendarEvent.endDate) {
      // this.toastyService.showToast("Calendar Event", "Participent end date time cannot be greater then event end date time.", ToastType.error);
      flag = false;
    }
    else if (this.calendarEventParticipent.startDate > this.calendarEventParticipent.endDate) {
      // this.toastyService.showToast("Calendar Event", "End date cannot be less then start date.", ToastType.error);
      flag = false;
    }
    return flag;
  }

  onCalendarAssignedToChanged() {
    this.filterParticipent();
    //this.getUserStudies();
  }

  getContacts() {
    var studyId = 0;
    if (this.calendarEvent.calendarEventType > 2)
      studyId = this.calendarEvent.sponsorSiteStudyCDAInvitationId;
    this.organizationService.getOrganizationContactByStudyId(this.authService.organization.id, studyId).subscribe(response => {
      if (response) {
        this.organizationContacts = response;
        this.participentList = response;
        //this.calendarEvent.calenderAssignedTo = this.authService.currentUser.organizationContactId;
        //this.getUserStudies();
      }
    });
  }

  getUserStudies() {
    var siteInfoId = this.authService.currentUser.userRole.toString() == 'siteAdmin' ? this.authService.site.id : 0;
    this.siteService.getSiteSavedStudyDetails(this.authService.currentUser.id, siteInfoId).subscribe(response => {
      if (response) {
        this.sponsorSiteStudyCDAInvitations = response;
        this.getStudySubject(this.calendarEvent.sponsorSiteStudyCDAInvitationId);
        this.getContacts();
      }
    });
  }

  getStudySubject(sponsorSiteStudyCDAInvitationId: number) {
    this.studySubjectService.getStudySubject(sponsorSiteStudyCDAInvitationId).subscribe(response => {
      this.studySubjects = response;
      if (this.calendarEvent.sponsorSiteStudyCDAInvitationId && this.calendarEvent.sponsorSiteStudyCDAInvitationId == 0)
        this.calendarEvent.studySubjectId = 0;
      this.getContacts();
    });
  }

  onSubmit(form) {
    if (!form.valid)
      return;
    if ((this.calendarEvent.calendarEventType && this.calendarEvent.calendarEventType <= 0) || this.calendarEvent.calendarEventType.toString() == "undefined") {
      // this.toastyService.showToast("Calcendar", "Please select calendar event type.", ToastType.info);
      return;
    }
    if (this.calendarEvent.calendarEventType > 2) {
      if ((this.calendarEvent.sponsorSiteStudyCDAInvitationId <= 0) || this.calendarEvent.sponsorSiteStudyCDAInvitationId.toString() == "undefined") {
        // this.toastyService.showToast("Calcendar", "Please select study.", ToastType.info);
        return;
      }
    }
    if (this.calendarEvent.calendarEventType == 3) {
      if ((this.calendarEvent.studySubjectId <= 0) || this.calendarEvent.studySubjectId.toString() == "undefined") {
        // this.toastyService.showToast("Calcendar", "Please select study subject.", ToastType.info);
        return;
      }
    }
    if ((this.calendarEvent.calenderAssignedTo && this.calendarEvent.calenderAssignedTo <= 0) || this.calendarEvent.calenderAssignedTo.toString() == "undefined") {
      // this.toastyService.showToast("Calcendar", "Please select assigned person.", ToastType.info);
      return;
    }
    if (!this.calendarEvent.colorCode || this.calendarEvent.colorCode == undefined) {
      // this.toastyService.showToast("Calcendar", "Please select color code.", ToastType.info);
      return;
    }
    if (!this.changeDate())
      return;
    this.loadingIndicator = true;
    this.calendarEventService.save(this.calendarEvent).subscribe(response => {
      this.loadingIndicator = false;
      if (response) {
        this.calendarEvent.id = response.calendarEvent.id;
        this.calendarEvent.televisitId = response.calendarEvent.id;
        this.calendarEvent.startDate = this.momentDatePipe.convertDateToLocal(this.calendarEvent.startDate);
        this.calendarEvent.endDate = this.momentDatePipe.convertDateToLocal(this.calendarEvent.endDate);
        this.calendarEvent.calendarEventParticipents = this.calendarEvent.calendarEventParticipents ?? [];
        // this.toastyService.showToast("Calendar Event", "Event saved successfully", ToastType.success);
        this.calendarEventParticipent.startDate = this.calendarEvent.startDate;
        this.calendarEventParticipent.endDate = this.calendarEvent.endDate;
        if (this.calendarEvent.calendarEventType == CalendarEventType.TeleVisit) {
          this.calendarEventService.getTelevistUrl(this.calendarEvent.id).subscribe(televisit => {
            this.televisitUrl = televisit.response;
            this.calendarEventService.sendEmailToEventParticipants(response).subscribe(res => { });
            this.closeModal();
          });
        }
        else {
          this.calendarEventService.sendEmailToEventParticipants(response).subscribe(res => { });
        }

      }
      else {
        // this.toastyService.showToast("Calendar Event", "Failed to save event", ToastType.error);
      }
    },
      err => {
        this.loadingIndicator = false;
      });
  }

  checkParticipentExist() {
    if (this.calendarEvent.calendarEventParticipents.some(x => x.organizationContactId == this.calendarEventParticipent.organizationContactId) && (this.calendarEventParticipent.id == undefined || this.calendarEventParticipent.id <= 0)) {
      // this.toastyService.showToast("Calendar Event", "Participent already exists", ToastType.error);
      return false;
    }
    return true;
  }

  addParticipant(form) {
    if (!form.valid)
      return;
    if (!this.participentDateChanged())
      return;
    if (!this.checkParticipentExist())
      return;
    if ((this.calendarEventParticipent.organizationContactId && this.calendarEventParticipent.organizationContactId <= 0) || this.calendarEventParticipent.organizationContactId.toString() == "undefined") {
      // this.toastyService.showToast("Calcendar", "Please select Study Staff", ToastType.info);
      return;
    }
    //this.calendarEventParticipent.startDate = this.transformDateStruct(this.participentStartDate);
    //this.calendarEventParticipent.endDate = this.transformDateStruct(this.participentEndDate);
    if (this.calendarEventParticipent.id == undefined || this.calendarEventParticipent.id <= 0)
      this.calendarEvent.calendarEventParticipents.push(this.calendarEventParticipent);
    else {
      var temp = this.calendarEvent.calendarEventParticipents.find(x => x.id == this.calendarEventParticipent.id);
      temp.comment = this.calendarEventParticipent.comment;
      temp.startDate = this.calendarEventParticipent.startDate;
      temp.endDate = this.calendarEventParticipent.endDate;
      temp.startTime = this.calendarEventParticipent.startTime;
      temp.endTime = this.calendarEventParticipent.endTime;
      temp.organizationContactId = this.calendarEventParticipent.organizationContactId;
    }
    this.loadingIndicator = true;
    this.calendarEvent.calendarEventParticipents.forEach(x => { x.calendarEventId = this.calendarEvent.id; });
    this.calendarEventService.save(this.calendarEvent).subscribe(response => {
      this.loadingIndicator = false;
      if (response) {
        this.calendarEventParticipent = new CalendarEventParticipent();
        this.getCalendarEvent();
        this.calendarEventService.sendEmailToEventParticipants(response).subscribe(res => { });
      }

    },
      err => {
        this.loadingIndicator = false;
      });
  }

  getCalendarEvent() {
    this.loadingIndicator = true;
    this.calendarEventService.get(this.calendarEvent.id).subscribe(response => {
      this.loadingIndicator = false;
      if (response) {
        this.calendarEvent = response;
        //this.calStartDate = this.transformDate(response.startDate);
        //this.calEndDate = this.transformDate(response.endDate);
        //this.participentStartDate = this.calStartDate;
        //this.participentEndDate = this.calEndDate;

        if (this.calendarEvent.calendarEventType == CalendarEventType.TeleVisit) {
          this.calendarEventService.getTelevistUrl(this.calendarEvent.id).subscribe(televisit => {
            this.televisitUrl = televisit.response;
          });
        }

        this.calendarEvent.startDate = this.momentDatePipe.convertDateToLocal(this.calendarEvent.startDate);
        this.calendarEvent.endDate = this.momentDatePipe.convertDateToLocal(this.calendarEvent.endDate);

        this.calendarEventParticipent.startDate = this.calendarEvent.startDate;
        this.calendarEventParticipent.endDate = this.calendarEvent.endDate;

        //this.calendarEventParticipent.startTime = this.calendarEvent.startTime;
        //this.calendarEventParticipent.endTime = this.calendarEvent.endTime;
        this.calendarEventParticipents = this.calendarEvent.calendarEventParticipents;
        this.filterParticipent();
        this.getUserStudies();

      }
    },
      err => {
        this.loadingIndicator = false;
      });
  }

  // deleteCalenderEventParticipent(Id: any) {
  //   Swal.fire({
  //     title: 'Are you sure you want to delete participent?',
  //     text: 'You will not be able to recover this participent!',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'Cancel'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.calendarEventService.deleteEventParticipent(Id).subscribe(response => {
  //         if (response) {
  //           if (response) {
  //             // this.toastyService.showToast("Calender Event", "Event participent deleted successfully.", ToastType.success);
  //             this.calendarEventParticipent = new CalendarEventParticipent();
  //             this.getCalendarEvent();
  //           }
  //           else {
  //             // this.toastyService.showToast("Calender Event", "Failed to delete Event Participent.", ToastType.error);
  //           }
  //         }
  //       },
  //         err => {
  //           // this.toastyService.showToast("Calender Event", "Failed to delete Event Participent.", ToastType.error);
  //         });
  //     }
  //   });
  // }

  getCalenderEventParticipent(id) {
    this.calendarEventService.getCalenderEventParticipent(id).subscribe(response => {
      if (response) {
        this.calendarEventParticipent = response;
        //this.participentStartDate = this.transformDate(response.startDate);
        //this.participentEndDate = this.transformDate(response.endDate);
        this.calendarEventParticipent.startDate = this.convertDateToDisplayFormat(this.calendarEventParticipent.startDate);
        this.calendarEventParticipent.endDate = this.convertDateToDisplayFormat(this.calendarEventParticipent.endDate);
      }
    });
  }

  filterParticipent() {
    this.participentList = this.organizationContacts.filter(x => x.id != this.calendarEvent.calenderAssignedTo);
  }

  CalendarEventTypeChanged() {
    if (this.calendarEvent.calendarEventType > 2) {
      this.getUserStudies();
    }
    else {
      this.calendarEvent.studySubjectId = 0;
      this.calendarEvent.sponsorSiteStudyCDAInvitationId = 0;
      this.getContacts();
    }
  }
  copyTeleVisitUrl() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.televisitUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);


  }


  ////

  handleNewForm() {
    this.showForm = !this.showForm;
  }
  openModal(value?: any) {
    console.log(value);
    if(value) {
      this.data = value;
      this.getInitial();
      this.modalOpenFlag = true;
    }
    this.showForm = false;
    
    this.historyModal.show();
  }
  closeModal() {
    this.historyModal.hide();
  }
  onLanguageValueChanged(val) {
    if (val) {
      this.selectedLanguage = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onCountryValueChanged(val) {
    if (val) {
      this.selectedCountry = val.name;
    }
    this.selectedDropdown = 'none';
  }
  onCategoryValueChanged(val) {
    if (val) {
      this.selectedCategory = val.name;
    }
    this.selectedDropdown = 'none';
  }
  closeDropdown() {
    this.selectedDropdown = 'none';
  }
  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }

  onValueChange(value, valueType) {
    if(valueType == 'eventType') {
      this.calendarEvent.calendarEventType = value;
    } else if(valueType == 'study') {
      this.calendarEvent.sponsorSiteStudyCDAInvitationId = value;
      this.getStudySubject(this.calendarEvent.sponsorSiteStudyCDAInvitationId)
    } else if(valueType == 'assignedTo') {
      this.calendarEvent.calenderAssignedTo = value;
      this.onCalendarAssignedToChanged();
    } else if(valueType == 'eventStatus') {
      this.calendarEvent.calendarEventStatus = value;
    } else if(valueType == 'studySubject') {
      this.calendarEvent.studySubjectId = value;
    } else if(valueType == 'staffReminder') {
      this.calendarEvent.eventReminder = value;
    }
    
  }
}

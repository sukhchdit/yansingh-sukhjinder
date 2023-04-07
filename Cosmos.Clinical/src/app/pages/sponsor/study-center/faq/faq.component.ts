import { faEllipsis, faXmark, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, NgForm } from "@angular/forms";
import { StudyCenterHistory } from '../../../../models/studycenter/studycenterhistory.model';
import { TitleMaster } from '../../../../models/common/titlemaster.model';
import { TrainingStatus } from '../../../../viewmodels/studycenter/studycentertrainingviewmodel.model';
import { StudyCenterFaq, FaqStatus } from '../../../../models/studycenter/studycenterfaq.model';
import { FaqLinksModel, StudyCenterFaqViewModel } from '../../../../viewmodels/studycenter/studycenterfaqviewmodel.model';
import { AuthService } from '../../../../account/services/auth.service';
import { TitleMasterService } from '../../../../core/services/common/titlemaster.service';
import { StudyCenterFaqService } from '../../../../core/services/studycenter/studycenterfaq.service';

const data = [
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'QC Completed',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Certified',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'QC Flag',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'QC Completed',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Certified',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },

  {
    qa: 1,
    question_name: 'What are the 7  warning signs of cancer?',
    language: 'English',
    status: 'Active',

    history: [
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
      {
        id: 1,
        user_name: 'Chuck age BookS',
        activity_date: '02 Feb 2023, 8:07 AM',
        activity: 'Status',
        value_from: 'Certified ',
        value_to: 'Active',
      },
    ],
  },
];

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  faEllipsis = faEllipsis;
  faCross = faXmark;
  faSortUp=faSortUp;
  faSortDown=faSortDown;
  history: number;

  pageNumsList = ['20', '40', '60', '80', '100'];
  selectedPageNum = '20';
  selectedDropdown = 'none';
  rowData = data;

  //public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  //public loading = true;
  //public primaryColour = '#555555';
  //public secondaryColour = '#ccc';
  //public coloursEnabled = false;
  //public loadingTemplate: TemplateRef<any>;
  //public config = { animationType: ngxLoadingAnimationTypes.doubleBounce, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
  readonly componentId = 'StudyCenterFaqComponent';
  ReadOnly: boolean = false;
  listloadingIndicator: boolean;
  studyId: number;
  cdaInvitationId: number;
  dropdownSettings = {};
  type = new FormControl();
  loggedInUserType: string;
  faqList: StudyCenterFaqViewModel[] = [];
  faqSideSiteList: StudyCenterFaqViewModel[] = [];
  faqHistoryList: StudyCenterHistory[] = [];
  faqLanguageList: TitleMaster[] = [];
  filteredFaqLanguageList: TitleMaster[] = [];
  faqLinks: FaqLinksModel[] = [];
  QCFlagModel = new StudyCenterFaq();
  showFaqHistoryDiv: boolean;
  //showTraining = true;
  questionHistoryTitle: string;
  faqLanguageId: number;
  hideme = [];
  id: number;
  constructor(
    private authService: AuthService,
    //private dialog: MatDialog,
    //private toastyService: ToastNotificationService,
    private titleMasterService: TitleMasterService,
    private studyCenterFaqService: StudyCenterFaqService,
  ) { }

  ngOnInit(): void {
    this.authService.sponsorStudyInfoIdChanged.subscribe(x => {
      this.studyId = x;
      this.initializeValues();
    });
    this.studyId = this.authService.sponsorStudyInfoId;
    this.authService.sponsorSiteStudyCdaInvitationIdChanged.subscribe(x => {
      this.cdaInvitationId = x;
    });
    this.cdaInvitationId = this.authService.sponsorSiteStudyCdaInvitationId;
    this.initializeValues();

    if (this.authService.organization.type == 1) {
      this.loggedInUserType = 'SiteUser';
    }
    else if (this.authService.organization.type == 2) {
      this.loggedInUserType = 'SponsorUser';
    }
  }

  initializeValues() {
    if (this.authService.organization.type == 1) {
      this.getSiteSideLanguages();
    }
    else if (this.authService.organization.type == 2) {
      this.getAllFaqs();
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      enableCheckAll: false,
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
  }

  getSiteSideLanguages() {
    this.titleMasterService.getAllByType('Language').subscribe(response => {
      if (response) {
        this.faqLanguageList = response;
        this.filteredFaqLanguageList = this.faqLanguageList.filter((cat) => cat.title === "English");
        this.faqLanguageId = 0;
        if (this.filteredFaqLanguageList.length > 0) {
          this.faqLanguageId = this.filteredFaqLanguageList[0].id;
        }
        this.getSiteSiteFaqs();
      }
    });
  }

  openAddUpdateFaq(id) {
    this.id = id;    
    //const dialogRef = this.dialog.open(CreateFaqComponent, {
    //  data: { id: id }, width: '55%', maxHeight: '90%'
    //});

    //dialogRef.afterClosed().subscribe(obj => {
    //  if (obj != null) {
    //    this.getAllFaqs();
    //  }
    //});
  }

  getAllFaqs() {
    this.listloadingIndicator = true;
    this.showFaqHistoryDiv = false;
    this.studyCenterFaqService.getAllFaq(this.studyId).subscribe(response => {
      this.listloadingIndicator = false;
      this.faqList = response;
    },
      err => {
        this.listloadingIndicator = false;
        //this.toastyService.showToast("Study Center Faq", "Failed to load study center faqs.", ToastType.error);
      });
  }

  getSiteSiteFaqs() {
    this.listloadingIndicator = true;
    this.showFaqHistoryDiv = false;
    this.studyCenterFaqService.getSiteSiteFaqs(this.studyId, this.faqLanguageId).subscribe(response => {
      this.listloadingIndicator = false;
      this.faqSideSiteList = response;
    },
      err => {
        this.listloadingIndicator = false;
        //this.toastyService.showToast("Study Center Faq", "Failed to load study center faqs.", ToastType.error);
      });
  }

  deleteFaq(id) {
    //Swal.fire({
    //  title: 'Are you sure you want to delete this faq?',
    //  text: 'You will not be able to recover this Faq!',
    //  type: 'warning',
    //  showCancelButton: true,
    //  confirmButtonText: 'Yes, delete it!',
    //  cancelButtonText: 'Cancel'
    //}).then((result) => {
    //  if (result.value) {
        this.listloadingIndicator = true;
        this.studyCenterFaqService.deleteFaq(id).subscribe(response => {
          if (response) {
            //this.toastyService.showToast('Study Center Faq', 'Record has been successfully deleted', ToastType.success);
            this.getAllFaqs();
          }
          else {
            //this.toastyService.showToast('Study Center Faq', 'Failed to delete', ToastType.error);
          }
        },
          err => {
            this.listloadingIndicator = false;
            //this.toastyService.showToast('Study Center Faq', 'Failed to delete', ToastType.error);
          });
    //  }
    //});
  }

  updateFaqStatus(faq) {
    this.listloadingIndicator = true;
    // console.log(faq)
    this.studyCenterFaqService.saveFaq(faq).subscribe(response => {
      if (response) {
        //this.toastyService.showToast('Faq', "Status updated successfully.", ToastType.success);
        this.getAllFaqs();
      }
      else {
        this.listloadingIndicator = false;
      }
    },
      err => {
        this.listloadingIndicator = false;
      });
  }

  showFaqHistory(id, questionno) {
    this.faqHistoryList = [];
    this.listloadingIndicator = true;
    this.questionHistoryTitle = questionno;
    this.studyCenterFaqService.getStudyCenterHistory(id, "Faq").subscribe(response => {
      if (response) {
        this.showFaqHistoryDiv = true;
        this.listloadingIndicator = false;
        this.faqHistoryList = response;
      }
      else {
        this.showFaqHistoryDiv = false;
        //this.toastyService.showToast("FAQ History", "Something went wrong.", ToastType.error);
      }
    },
      err => {
        this.showFaqHistoryDiv = false;
        this.listloadingIndicator = false;
      });
  }

  getFaqLinks() {
    this.studyCenterFaqService.getFaqLinks(this.studyId).subscribe(response => {
      this.faqLinks = response;
    },
      err => {
        //this.toastyService.showToast("Faq", "Failed to load faq links.", ToastType.error);
      });
  }

  statusChange(training, status) {
    //QCFlagModel
    this.QCFlagModel.id = training.id;
    if (status == "Certified") {
      this.QCFlagModel.faqstatus = FaqStatus.Certified;
    }
    else if (status == "QACompleted") {
      this.QCFlagModel.faqstatus = FaqStatus.QACompleted;
    }
    else if (status == "QAFlag") {
      this.QCFlagModel.faqstatus = FaqStatus.QAFlag;
    }
    else if (status == "Active") {
      this.QCFlagModel.faqstatus = FaqStatus.Active;
    }
    else if (status == "Inactive") {
      this.QCFlagModel.faqstatus = FaqStatus.Inactive;
    }
    if (status == "QAFlag" || status == "Inactive") {
      this.DisapproveQC(this.QCFlagModel, training);
    }
    else {
      this.statusChangeConfirm(this.QCFlagModel, training);
    }
  }

  updateStatus(training) {
    this.listloadingIndicator = true;
    this.studyCenterFaqService.updateStatus(training).subscribe(response => {
      if (response.msgCode == "Success") {
        //this.toastyService.showToast('Faq', response.message, ToastType.success);
        this.getAllFaqs();
      }
      if (response.msgCode == "Other") {
        //this.toastyService.showToast('Faq', response.message, ToastType.success);
        this.getAllFaqs();
      }
      else {
        this.listloadingIndicator = false;
      }
    },
      err => {
        this.listloadingIndicator = false;
      });
  }

  async DisapproveQC(model, training) {
    //const { value: text } =
    //  await Swal.fire({
    //    title: 'Comments for disapprove',
    //    text: '',
    //    input: 'textarea',
    //    inputPlaceholder: 'Type your comment here...',
    //    inputAttributes: {
    //      'aria-label': 'Type your comment here',
    //    },
    //    confirmButtonText: 'Save',
    //    showCancelButton: true,
    //    preConfirm: (test) => {
    //      if (test == "") Swal.showValidationMessage("Please add comment to dis-approve.");
    //    }
    //  })

    //var comments = "";
    //if (text) {
    //  comments = text;
    //  model.comment = comments;
    //  this.updateStatus(model);
    //}
    //else {
    //  //cancel
    //  training.trainingStatus = training.trainingCurrentStatus;
    //}
  }

  statusChangeConfirm(model, training) {
    //Swal.fire({
    //  title: 'Are you sure you want to change status?',
    //  text: 'You will not be able to recover the status of this record!',
    //  type: 'warning',
    //  showCancelButton: true,
    //  confirmButtonText: 'Yes, change it!',
    //  cancelButtonText: 'Cancel'
    //}).then((result) => {
    //  if (result.value) {
        this.updateStatus(model);
    //  }
    //  else {
    //    //cancel
    //    training.trainingStatus = training.trainingCurrentStatus;
    //  }
    //});
  }
  
  closeDropdown() {
    this.selectedDropdown = 'none';
  }

  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }

  onSelectDropValueChange(val) {
    if (val) {
      this.selectedPageNum = val;
    }
    this.selectedDropdown = 'none';
  }

  showHistory(i: number) {
    if (this.history == i) {
      this.history = null;
    } else this.history = i;
  }
}

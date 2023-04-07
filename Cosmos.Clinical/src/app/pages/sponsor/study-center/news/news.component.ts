import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../account/services/auth.service';
import { StudyCenterNewsService } from '../../../../core/services/studycenter/studycenternews.service';
import { StudyCenterStudyURLService } from '../../../../core/services/studycenter/studycenterstudyurl.service';
/*import { ToastNotificationService, ToastType } from '../../../../core/services/toastnotification.service';*/
import { StudyCenterNews } from '../../../../models/studycenter/studycenternews.model';
import { StudyCenterNewsViewModel } from '../../../../viewmodels/studycenter/studycenternewsviewmodel.model';
import { StudyUrlTypesModel } from '../../../../viewmodels/studycenter/studyurlviewmodel.model';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})

export class NewsComponent {  
  public primaryColour = '#555555';
  public secondaryColour = '#ccc';
  public coloursEnabled = false;
  public loadingTemplate: TemplateRef<any>;  
  loadingIndicator: boolean;
  readonly componentId = 'StudyCenterNewsComponent';
  ReadOnly: boolean = false;
  listloadingIndicator: boolean;
  studyId: number;
  cdaInvitationId: number;
  dropdownSettings = {};
  type = new FormControl();
  @ViewChild('quillEditor', { static: false }) quillEditor: ElementRef; 
  faTrashCan = faTrashCan;
  faStarOfLife = faStarOfLife;
  showForm: boolean = false;
  modules = {};
  addnewpost = false;
  studyCenterNews = new StudyCenterNews();
  newsList: StudyCenterNewsViewModel[] = [];
  newsContent: any;
  @ViewChild("file", { static: false })
  file: ElementRef;
  fileSelected: boolean;
  uploadFiles: any;
  currentFile: File;
  selectedFileName: string;
  loggedInUserType: string;
  studyUrlsLinks: StudyUrlTypesModel[] = [];

  constructor(private authService: AuthService,
    /*private toastyService: ToastNotificationService,*/
    private studyCenterNewsService: StudyCenterNewsService,
    private studyCenterStudyURLService: StudyCenterStudyURLService) {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
    };
  }

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
    this.fileSelected = false;
    this.getNews();
    this.getStudyUrlsLinks();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      enableCheckAll: false,
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
  }

  contentValueChanged(event) {
    this.newsContent = event.html;
  }

  addTitleToToolbarIcons(event) {
    document.querySelector('.ql-bold').setAttribute('title', "Bold");
    document.querySelector('.ql-italic').setAttribute('title', "Italic");
    document.querySelector('.ql-underline').setAttribute('title', "Underline");
    document.querySelector('.ql-strike').setAttribute('title', "Strike");
    document.querySelector('.ql-blockquote').setAttribute('title', "BLock Quote");
    document.querySelector('.ql-code-block').setAttribute('title', "Code BLock");
    document.querySelector('.ql-header[value="1"]').setAttribute('title', "Header 1");
    document.querySelector('.ql-header[value="2"]').setAttribute('title', "Header 2");
    document.querySelector('.ql-list[value="ordered"]').setAttribute('title', "Ordered List");
    document.querySelector('.ql-list[value="bullet"]').setAttribute('title', "Unordered List");
    document.querySelector('.ql-script[value="sub"]').setAttribute('title', "Sub Script");
    document.querySelector('.ql-script[value="super"]').setAttribute('title', "Super Script");
    document.querySelector('.ql-indent[value="-1"]').setAttribute('title', "Indent Left");
    document.querySelector('.ql-indent[value="+1"]').setAttribute('title', "Indent Right");
    document.querySelector('.ql-direction[value="rtl"]').setAttribute('title', "Right to Left");
    document.querySelector('.ql-size').setAttribute('title', "Size");
    document.querySelector('.ql-header').setAttribute('title', "Header Size");
    document.querySelector('.ql-color').setAttribute('title', "Color");
    document.querySelector('.ql-background').setAttribute('title', "Background");
    document.querySelector('.ql-font').setAttribute('title', "Font");
    document.querySelector('.ql-align').setAttribute('title', "Align");
    document.querySelector('.ql-clean').setAttribute('title', "Clean");
    document.querySelector('.ql-link').setAttribute('title', "Link");
    document.querySelector('.ql-image').setAttribute('title', "Image");
    document.querySelector('.ql-video').setAttribute('title', "Video");
  }

  onFileChange(evt: any) {
    let fileSize: number;
    if (evt.target.files.length == 1) {
      let fileToUpload = <File>evt.target.files[0];
      var strExtension = fileToUpload.name.substring(fileToUpload.name.lastIndexOf('.') + 1);
      //Check file extention
      if (strExtension.toLocaleLowerCase() == "jpg" || strExtension.toLocaleLowerCase() == "jpeg" ||
        strExtension.toLocaleLowerCase() == "png" || strExtension.toLocaleLowerCase() == "gif") {
        //check file size
        fileSize = fileToUpload.size / 1024 / 1024; // MB
        if (fileSize > 10.1) {
          this.file.nativeElement.value = "";
          this.fileSelected = false;
          //this.toastyService.showToast("Upload File Error", "File is bigger than 10 MB", ToastType.error);
        }
        else {
          this.uploadFiles = evt.target.files;
          this.fileSelected = true;
          this.selectedFileName = fileToUpload.name;
        }
      }
      else {
        this.file.nativeElement.value = "";
        this.fileSelected = false;
        //this.toastyService.showToast("Upload File Error", "Invalid file type.", ToastType.error);
      }
    }
    else if (evt.target.files.length > 1) {
      this.file.nativeElement.value = "";
      this.fileSelected = false;
      //this.toastyService.showToast("Upload File Error", "Cannot use multiple files", ToastType.error);
    }
  }

  submitNews(f: NgForm) {
    if (!f.valid)
      return;

    if (this.fileSelected == false) {
      //this.toastyService.showToast('Study Center News', 'Please select study icon.', ToastType.warning);
      return;
    }

    this.listloadingIndicator = true;
    this.studyCenterNews.sponsorstudyinfoid = this.studyId;
    this.studyCenterNews.newsContent = this.newsContent;
    this.studyCenterNewsService.saveNews(this.studyCenterNews).subscribe(response => {
      console.log(response)
      if (response.msgCode == "Success") {
        console.log(response.msgCode)
        this.uploadStudyIcon(response.id)
        setTimeout(() => {
          this.getNews();
          this.listloadingIndicator = false;
          //this.toastyService.showToast('Study Center News', "News letter created successfully.", ToastType.success);          
          this.studyCenterNews = new StudyCenterNews();
          this.addnewpost = false;
          this.fileSelected = false
          this.handleNewForm();
        }, 20000);
      }
      else {
        this.listloadingIndicator = false;
        this.fileSelected = false;
        //this.toastyService.showToast('Study Center News', 'Failed to save information', ToastType.error);
      }
    }, err => {
      console.log(err);
      this.listloadingIndicator = false;
      this.fileSelected = false;
      //this.toastyService.showToast("Error", "Error while submitting.", ToastType.error);
    });
  }

  uploadStudyIcon(id) {
    const formData = new FormData();
    formData.append('id', id);
    this.currentFile = <File>this.uploadFiles[0];
    var fileName = this.currentFile.name;
    formData.append('file', this.currentFile, fileName);
    this.studyCenterNewsService.uploadStudyIcon(formData).subscribe(
      event => {
        //this.listloadingIndicator = false;
      },
      err => {
        this.currentFile = undefined;
        console.log(err);
      });
  }

  getNews() {
    this.listloadingIndicator = true;
    this.studyCenterNewsService.getNewsList(this.studyId).subscribe(response => {
      this.listloadingIndicator = false;
      this.newsList = response;
    },
      err => {
        this.listloadingIndicator = false;
        //this.toastyService.showToast("Study Center News", "Failed to load study center news.", ToastType.error);
      });
  }
  
  handleNewForm() {    
    this.fileSelected = false;
    this.selectedFileName = '';
    this.currentFile = undefined;
    this.studyCenterNews = new StudyCenterNews();
    this.showForm = !this.showForm;
  }

  deleteNews(id) {
    //Swal.fire({
    //  title: 'Are you sure you want to delete this news letter?',
    //  text: 'You will not be able to recover this news letter!',
    //  type: 'warning',
    //  showCancelButton: true,
    //  confirmButtonText: 'Yes, delete it!',
    //  cancelButtonText: 'Cancel'
    //}).then((result) => {
    //  if (result.value) {
        this.studyCenterNewsService.deleteNews(id).subscribe(response => {
          if (response.msgCode == "Success") {
            //this.toastyService.showToast('Study Center News', 'Record has been successfully deleted', ToastType.success);
            this.getNews();
          }
          else {
            //this.toastyService.showToast('Study Center News', 'Failed to delete', ToastType.error);
          }
        },
          err => {
            //this.toastyService.showToast('Study Center News', 'Failed to delete', ToastType.error);
          });
    //  }
    //});
  }

  getStudyUrlsLinks() {
    //this.studyCenterStudyURLService.getStudyUrlsLinks(this.studyId).subscribe(response => {
    //  this.studyUrlsLinks = response;
    //},
    //  err => {
    //    //this.toastyService.showToast("Study Url", "Failed to load study url links.", ToastType.error);
    //  });
  }
    
}

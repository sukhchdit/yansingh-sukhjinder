import {
  CommonModule
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { StudyUrlComponent } from './study-url/study-url.component';
import { PdfPreviewModalComponent } from './training/pdf-preview-modal/pdf-preview-modal.component';
import { StudyCenterRoutingModule } from './study-center-routing.module';
import { TrainingAvailableComponent } from './training/training-available/training-available.component';
import { MainStudyCenterComponent } from './main-study-center/main-study-center.component';
import { TrainingManagerComponent } from './training/training-manager/training-manager.component';
import { TrainingComplianceComponent } from './training/training-compliance/training-compliance.component';
import { MainTrainingComponent } from './training/main-training/main-training.component';
import { MainStudyTeamComponent } from './study-team/main-study-team/main-study-team.component';
import { StudyContactComponent } from './study-team/study-contact/study-contact.component';
import { UploadTrainingModalComponent } from './training/upload-training-modal/upload-training-modal.component';
import { UpdateProfileModalComponent } from './study-team/update-profile-modal/update-profile-modal.component';
import { AddFaqModalComponent } from './add-faq-modal/add-faq-modal.component';
import { AddStudyUrlModalComponent } from './add-study-url-modal/add-study-url-modal.component';
import { AddCommentModalComponent } from './add-comment-modal/add-comment-modal.component';
import { CertifyModalComponent } from './certify-modal/certify-modal.component';
import { SiteComponent } from './study-team/site/site.component';
import { FaqComponent } from './faq/faq.component';
import { NewsComponent } from './news/news.component';
import { MySiteComponent } from './study-team/my-site/my-site.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { EisfComponent } from './eisf/eisf.component';
import { ConfirmationModalComponent } from './training/confirmation-modal/confirmation-modal.component';
import { AddSiteModalComponent } from './add-site-modal/add-site-modal.component';
import { ImportSitesModalComponent } from './import-sites-modal/import-sites-modal.component';
import { AddMapTrainingModalComponent } from './training/add-map-training-modal/add-map-training-modal.component';
import { CoreModule } from '../../../core/core.module';
import { StudyCenterService } from '../../../core/services/studycenter/studycenter.service';
import { CommonService } from '../../../core/services/common/common.service';
import { TitleMasterService } from '../../../core/services/common/titlemaster.service';
import { StudyCenterNewsService } from '../../../core/services/studycenter/studycenternews.service';
import { StudyCenterTrainingService } from '../../../core/services/studycenter/studycentertraining.service';
import { StudyCenterStudyTeamContactService } from '../../../core/services/studycenter/studycenterstudyteamcontact.service';
import { StudyCenterFaqService } from '../../../core/services/studycenter/studycenterfaq.service';
import { StudyCenterStudyURLService } from '../../../core/services/studycenter/studycenterstudyurl.service';
import { RoleService } from '../../../core/services/common/role.service';
import { SalutationService } from '../../../core/services/common/salutation.service';


@NgModule({
  declarations: [
    TrainingAvailableComponent,
    MainStudyCenterComponent,
    TrainingManagerComponent,
    TrainingComplianceComponent,
    MainTrainingComponent,
    MainStudyTeamComponent,
    StudyContactComponent,
    SiteComponent,
    MySiteComponent,
    FaqComponent,
    StudyUrlComponent,   
    NewsComponent,
    UploadTrainingModalComponent,
    PdfPreviewModalComponent,
    UpdateProfileModalComponent,
    AddFaqModalComponent,
    AddStudyUrlModalComponent,
    AddCommentModalComponent,
    CertifyModalComponent,
    EisfComponent,
    ConfirmationModalComponent,
    AddSiteModalComponent,
    ImportSitesModalComponent,
    AddMapTrainingModalComponent,
  ],
  imports: [    
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,    
    StudyCenterRoutingModule,
    QuillModule.forRoot(),
  ],
  providers: [StudyCenterService, CommonService, TitleMasterService, StudyCenterNewsService,StudyCenterTrainingService, StudyCenterStudyTeamContactService, SalutationService,
    RoleService, StudyCenterStudyURLService, StudyCenterTrainingService, StudyCenterFaqService],
  entryComponents: []
})
export class StudyCenterModule { }

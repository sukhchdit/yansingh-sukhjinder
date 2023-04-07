import {
  CommonModule
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { SiteNewsComponent } from '../study-center-site/site-news/site-news.component';
import { SiteMainStudyCenterComponent } from '../study-center-site/site-main-study-center/site-main-study-center.component';
import { SiteStudyContactComponent } from '../study-center-site/site-study-team/site-study-contact/site-study-contact.component';
import { SiteMainStudyTeamComponent } from '../study-center-site/site-study-team/site-main-study-team/site-main-study-team.component';
import { SiteUpdateProfileModuleComponent } from '../study-center-site/site-study-team/site-update-profile-module/site-update-profile-module.component';
import { SiteSiteComponent } from '../study-center-site/site-study-team/site-site/site-site.component';
import { SiteMySiteComponent } from '../study-center-site/site-study-team/site-my-site/site-my-site.component';
import { SiteCommentModuleComponent } from '../study-center-site/site-study-team/site-comment-module/site-comment-module.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StudyCenterService } from '../../../core/services/studycenter/studycenter.service';
import { CommonService } from '../../../core/services/common/common.service';
import { TitleMasterService } from '../../../core/services/common/titlemaster.service';
import { StudyCenterNewsService } from '../../../core/services/studycenter/studycenternews.service';
import { StudyCenterTrainingService } from '../../../core/services/studycenter/studycentertraining.service';
import { StudyCenterStudyTeamContactService } from '../../../core/services/studycenter/studycenterstudyteamcontact.service';
import { SalutationService } from '../../../core/services/common/salutation.service';
import { RoleService } from '../../../core/services/common/role.service';
import { StudyCenterStudyURLService } from '../../../core/services/studycenter/studycenterstudyurl.service';
import { StudyCenterFaqService } from '../../../core/services/studycenter/studycenterfaq.service';

@NgModule({
  declarations: [    
    SiteNewsComponent,
    SiteMainStudyCenterComponent,
    SiteStudyContactComponent,
    SiteMainStudyTeamComponent,
    SiteUpdateProfileModuleComponent,
    SiteSiteComponent,
    SiteMySiteComponent,
    SiteCommentModuleComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    QuillModule.forRoot(),
  ],
  providers: [StudyCenterService, CommonService, TitleMasterService, StudyCenterNewsService, StudyCenterTrainingService, StudyCenterStudyTeamContactService, SalutationService,
    RoleService, StudyCenterStudyURLService, StudyCenterTrainingService, StudyCenterFaqService],
  entryComponents: []
})
export class StudyCenterSiteModule { }

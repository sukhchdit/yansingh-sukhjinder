import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from '../../sponsor/study-center/faq/faq.component';
import { MainStudyTeamComponent } from '../../sponsor/study-center/study-team/main-study-team/main-study-team.component';
import { MySiteComponent } from '../../sponsor/study-center/study-team/my-site/my-site.component';
import { SiteComponent } from '../../sponsor/study-center/study-team/site/site.component';
import { StudyContactComponent } from '../../sponsor/study-center/study-team/study-contact/study-contact.component';
import { StudyUrlComponent } from '../../sponsor/study-center/study-url/study-url.component';
import { MainTrainingComponent } from '../../sponsor/study-center/training/main-training/main-training.component';
import { TrainingAvailableComponent } from '../../sponsor/study-center/training/training-available/training-available.component';
import { TrainingComplianceComponent } from '../../sponsor/study-center/training/training-compliance/training-compliance.component';
import { TrainingManagerComponent } from '../../sponsor/study-center/training/training-manager/training-manager.component';
import { SiteMainStudyCenterComponent } from '../study-center-site/site-main-study-center/site-main-study-center.component';
import { SiteNewsComponent } from '../study-center-site/site-news/site-news.component';
import { SiteMainStudyTeamComponent } from '../study-center-site/site-study-team/site-main-study-team/site-main-study-team.component';
import { SiteMySiteComponent } from '../study-center-site/site-study-team/site-my-site/site-my-site.component';
import { SiteSiteComponent } from '../study-center-site/site-study-team/site-site/site-site.component';
import { SiteStudyContactComponent } from '../study-center-site/site-study-team/site-study-contact/site-study-contact.component';

const routes: Routes = [  
  {
    path: 'study_center_site',
    component: SiteMainStudyCenterComponent,
    children: [
      {
        path: 'training',
        component: MainTrainingComponent,
        children: [
          {
            path: 'available',
            component: TrainingAvailableComponent,
          },
          {
            path: 'manager',
            component: TrainingManagerComponent,
          },
          {
            path: 'compliance',
            component: TrainingComplianceComponent,
          },
        ],
      },
      {
        path: 'site_news',
        component: SiteNewsComponent,
      },
      {
        path: 'site_study_team',
        component: SiteMainStudyTeamComponent,
        children: [
          {
            path: 'study_contact',
            component: SiteStudyContactComponent,
          },
          {
            path: 'site',
            component: SiteSiteComponent,
          },
          {
            path: 'my_site',
            component: SiteMySiteComponent,
          },
        ],
      },
      {
        path: 'study_url',
        component: StudyUrlComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'study_team',
        component: MainStudyTeamComponent,
        children: [
          {
            path: 'study_contact',
            component: StudyContactComponent,
          },
          {
            path: 'site',
            component: SiteComponent,
          },
          {
            path: 'my_site',
            component: MySiteComponent,
          },
        ],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCenterSiteRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EisfComponent } from './eisf/eisf.component';
import { FaqComponent } from './faq/faq.component';
import { MainStudyCenterComponent } from './main-study-center/main-study-center.component';
import { NewsComponent } from './news/news.component';
import { MainStudyTeamComponent } from './study-team/main-study-team/main-study-team.component';
import { MySiteComponent } from './study-team/my-site/my-site.component';
import { SiteComponent } from './study-team/site/site.component';
import { StudyContactComponent } from './study-team/study-contact/study-contact.component';
import { StudyUrlComponent } from './study-url/study-url.component';
import { MainTrainingComponent } from './training/main-training/main-training.component';
import { TrainingAvailableComponent } from './training/training-available/training-available.component';
import { TrainingComplianceComponent } from './training/training-compliance/training-compliance.component';
import { TrainingManagerComponent } from './training/training-manager/training-manager.component';

const routes: Routes = [
  {
    path: 'study_center',
    component: MainStudyCenterComponent,
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
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'eisf',
        component: EisfComponent,
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
      {
        path: 'study_url',
        component: StudyUrlComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCenterRoutingModule { }

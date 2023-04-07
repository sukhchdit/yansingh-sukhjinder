import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { path: '', loadChildren: () => import('../../pages/sponsor/study-center/study-center.module').then(m => m.StudyCenterModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule { }

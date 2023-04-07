import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: 'econsent',
    component: MainLayoutComponent,
    children: [
      {
        path: '', 
        component: AdminComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EconsentRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './master-layout.component';

const routes: Routes = [{ path: '', component: MasterLayoutComponent, 
children: [
  { path: 'admin', loadChildren: () => import('./../../pages/admin/admin.module').then(m => m.AdminModule) }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLayoutRoutingModule { }

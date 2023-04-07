import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from './homepage-layout.component';


const routes: Routes = [{
  path: '', component: HomePageLayoutComponent,
  children: [
    /*{ path: 'admin', loadChildren: () => import('./../../pages/admin/admin.module').then(m => m.AdminModule) }*/
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageLayoutRoutingModule { }

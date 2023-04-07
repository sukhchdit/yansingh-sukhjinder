import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterLayoutComponent } from './master-layout.component';

const routes: Routes = [{ path: '', component: MasterLayoutComponent, 
children: [
  { path: 'admin', loadChildren: () => import('./../../pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'site', loadChildren: () => import('./../../pages/site/site.module').then(m => m.SiteModule) },
  { path: 'sponsor', loadChildren: () => import('./../../pages/sponsor/sponsor.module').then(m => m.SponsorModule) },
  { path: '', loadChildren: () => import('./../../pages/econsent/econsent.module').then(m => m.EconsentModule) },
  { path: 'evault', loadChildren: () => import('./../../pages/evault/evault-site/evault-site.module').then(m => m.EvaultSiteModule) },
  { path: 'evault', loadChildren: () => import('./../../pages/evault/evault-sponsor/evault-sponsor.module').then(m => m.EvaultSponsorModule) },
  { path: '', loadChildren: () => import('./../../pages/edocs/edocs.module').then(m => m.EdocsModule) }  
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLayoutRoutingModule { }

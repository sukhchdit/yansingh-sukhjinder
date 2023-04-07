import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./layouts/homepage-layout/homepage-layout.module').then(m => m.HomePageLayoutModule) },
  {
    path: '',
    loadChildren: () =>
      import('src/app/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  { path: '', loadChildren: () => import('./layouts/master-layout/master-layout.module').then(m => m.MasterLayoutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

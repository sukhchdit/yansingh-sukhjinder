import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageLayoutComponent } from './homepage-layout.component';
import { MaidDetailsComponent } from './maiddetails/maiddetails.component';
import { RegisterMaidComponent } from './registermaid/registermaid.component';


const routes: Routes = [{
  path: '', component: HomePageLayoutComponent,
},
{
  path: 'maiddetails',
  component: MaidDetailsComponent
},
{
  path: 'registermaid',
  component: RegisterMaidComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageLayoutRoutingModule { }

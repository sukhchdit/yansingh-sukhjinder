import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './contactus/contactus.component';
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
},
{
  path: 'contactus',
  component: ContactUsComponent
},
{
  path: 'aboutus',
  component: AboutUsComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageLayoutRoutingModule { }

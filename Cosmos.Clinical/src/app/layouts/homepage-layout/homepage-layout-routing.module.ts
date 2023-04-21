import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './contactus/contactus.component';
import { HomePageLayoutComponent } from './homepage-layout.component';
import { MaidDetailsComponent } from './maiddetails/maiddetails.component';
import { RegisterEmployerComponent } from './registeremployer/registeremployer.component';
import { RegisterMaidComponent } from './registermaid/registermaid.component';
import { findjobComponent } from './findjob/findjob.component';
import { findjobDetailsComponent } from './findjobDetails/findjobDetails.component';


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
},
{
  path: 'registeremployer',
  component: RegisterEmployerComponent
},
{
  path: 'findjob',
  component: findjobComponent
},
{
  path: 'findjobDetails',
  component: findjobDetailsComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageLayoutRoutingModule { }

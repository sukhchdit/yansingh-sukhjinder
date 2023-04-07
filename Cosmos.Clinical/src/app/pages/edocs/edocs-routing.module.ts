import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdocsComponent } from './edocs.component';


const routes: Routes = [
  {
    path: 'eRegulatory',
    component: EdocsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EdocsRoutingModule { }

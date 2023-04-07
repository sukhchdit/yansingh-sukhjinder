import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EosDocumentsPrimarySiteComponent } from "./eos-documents-primary-site/eos-documents-primary-site.component";
import { SafteyDocumentsSiteComponent } from "./saftey-documents-site/saftey-documents-site.component";
const routes: Routes = [
    {
      path: '',
      children: [
        {
              path: 'site-eosdocuments', 
              component: EosDocumentsPrimarySiteComponent
        },
        {
              path: 'site-safetydocuments',
              component: SafteyDocumentsSiteComponent
        }
      ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EvaultSiteRoutingModule { }
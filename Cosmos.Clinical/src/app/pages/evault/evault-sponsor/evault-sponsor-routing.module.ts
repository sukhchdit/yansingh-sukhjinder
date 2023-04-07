import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComplianceComponent } from "./compliance/compliance.component";
import { EosDocumentsSponsorComponent } from "./eos-documents-sponsor/eos-documents-sponsor.component";
import { SafetyDocumentsSponsorComponent } from "./safety-documents-sponsor/safety-documents-sponsor.component";
const routes: Routes = [
    {
      path: '',
      children: [
        {
              path: 'compliance', 
              component: ComplianceComponent,
        },
        {
               path: 'eosdocuments', 
               component: EosDocumentsSponsorComponent               
        },
        {
               path: 'safetydocuments', 
               component: SafetyDocumentsSponsorComponent               
        }
      ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EvaultSponsorRoutingModule { }
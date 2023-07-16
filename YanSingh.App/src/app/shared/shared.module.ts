import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownsModule } from './dropdowns/dropdowns.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownsModule,
    FontAwesomeModule,
    PdfViewerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownsModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EconsentService } from 'src/app/core/services/econsent/econsent.service';
import { EconsentLanguage } from 'src/app/models/econsent/econsentlanguage.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {
  languages: EconsentLanguage[] = [];
  @Input() fieldValidation: boolean = false;
  @Output() Language = new EventEmitter<any>();
  errorMsg: string = `Language is <strong>required</strong>`;

  constructor(public eConsentService: EconsentService){}

  ngOnInit(): void {
   this.getAllLanguages();
  }

  getAllLanguages() {
    this.eConsentService.getAlleConsentLanguages().subscribe({
      next: (response) => {
        this.languages = response;
      },
      error: (e) => console.error(e),
      complete: () => console.log('complete')
    });
 // this.toastyService.showToast("Econsent Language", "Failed to load Econsent Language.", ToastType.error);
      
  }

  onValueChange(languageId) {
    if (languageId) {
      this.Language.emit(languageId);
    }
  }

}

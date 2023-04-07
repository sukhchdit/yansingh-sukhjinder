import { Injectable } from '@angular/core';

@Injectable()
export class UserPreferenceService {
  userPreference = {};

  pageKeys = [
    {
      pageName: 'StudyEDocsMenuComponent'
    },
    {
      pageName: 'eDocsCategory'
    }
  ];

  setUserPreference(key, data) {
    this.userPreference[key] = data;
  }

  getUserPreference(key) {
    return this.userPreference[key];
  }
}

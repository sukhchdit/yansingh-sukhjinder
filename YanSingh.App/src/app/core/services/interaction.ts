import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InterationService {
  constructor() { }

  // Observable string sources
  private loadingIndicator = new Subject<boolean>();  

  // Observable string streams
  loadingIndicator$ = this.loadingIndicator.asObservable();  

  // Service message commands
  setLoader(param: boolean) {
    this.loadingIndicator.next(param);
  }  
}

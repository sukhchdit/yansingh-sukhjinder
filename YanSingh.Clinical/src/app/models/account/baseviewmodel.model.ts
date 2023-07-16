import { environment } from 'src/environments/environment';

export class BaseViewModel{

  constructor() {
    this.clientAppBaseUrl = environment.clientapiport;    
  }

  clientAppBaseUrl: string;
  createdById: number;
  updatedById: number;
}

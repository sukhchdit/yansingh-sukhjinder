import { BaseViewModel } from './baseviewmodel.model';

export class UserSession extends BaseViewModel {
  id: number;
  correlationId: string;
  signalRId: string;
  userId: number;
}


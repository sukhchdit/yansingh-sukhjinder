import { eDiarySectionViewModel } from './ediarysection.viewmodel';

export class AttemptedeDiaryViewModel {

  participantNumber: string;
  protocolNumber: string;
  siteNumber: string;
  ediaryName: string;
  attemptedDate: Date;

  ediarySections: eDiarySectionViewModel[] = [];
}

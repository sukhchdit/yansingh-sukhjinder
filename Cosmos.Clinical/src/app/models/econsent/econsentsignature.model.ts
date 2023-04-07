import { BaseAddress } from '../baseaddress.model';

export class EConsentSignature extends BaseAddress {
  eConsentId: number;
  documentMasterId: number;
  subjectId: number;
  subjectVisitId: number;
  subjectSubVisitId: number;
}

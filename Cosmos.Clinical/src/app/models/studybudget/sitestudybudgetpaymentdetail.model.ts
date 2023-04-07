import { BaseAddress } from '../baseaddress.model';

export enum PaymentMethods { Cheque = 1, ACH }

export class SiteStudyBudgetPaymentDetail extends BaseAddress {
  constructor() {
    super();
    this.paymentMethod = 0;
  }

  ssn: string;
  paymentTo: string;
  paymentMethod: PaymentMethods;
  reference: string;
  bankName: string;
  bankRoutingNumber: string;
  checkingAccountNumber: string;
  contactName: string;
  contactName2: string;
  email2: string;
  siteStudyProcedureBudgetVersionId: number;
}

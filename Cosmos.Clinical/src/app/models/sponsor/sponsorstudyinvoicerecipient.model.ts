import { BaseAddress } from "../baseaddress.model";

export class SponsorStudyInvoiceRecipient extends BaseAddress {
  constructor() {
    super();
    this.status = true;
  }
  name: string;
  title: string;
  company: string;
  sponsorStudyInfoId: number;

}

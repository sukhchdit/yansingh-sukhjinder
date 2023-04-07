import { BaseEntity } from '../baseentity.model';

export class SponsorStudyInvoiceRecipient extends BaseEntity {
    constructor() {
        super();
    }
    name: string;
    title: string;
    company: string;
    sponsorStudyInfoId: number;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    phone: string;
    fax: string;
    email: string;
    zipCode: string;
    stateId: string;
    countryId: number;
}
import { BaseEntity } from '../baseentity.model';
import { invoiceDetail } from './invoiceDetail.model';

export class invoiceMaster extends BaseEntity {
    constructor() {
        super();
    }

    invoiceNumber: string;
    referenceNumber:string;
    invoiceDate: string;

    InvoiceRecipientName :string;
    InvoiceRecipientTitle: string;
    InvoiceRecipientCompany: string;
    InvoiceRecipientEmail: string;
    InvoiceRecipientAddress1: string;
    InvoiceRecipientAddress2: string;
    InvoiceRecipientPhone: string;
    InvoiceRecipientCity: string;
    InvoiceRecipientState: string;
    InvoiceRecipientPostcode: string;
    InvoiceRecipientCountry: string;
    InvoiceRecipientId: number;
    
    studyTitle: string;
    protocol: string;
    poNumber: string;
    investigator: string;
    siteNumber: string;
    terms: string;
    comments: string;
    principalInvestigatorName: string;
    totalAmount: number;
    credits: number;
    balance: number;
    principalInvestigatorId: number;
    sponsorSiteStudyCDAInvitationId: number;
    siteInfoId: number;
    sponsorInfoId: number;
    isInvoicePaid: number;
    invoicePaidOn: string;
    invoiceDetail:invoiceDetail[]=[];
    invoiceStatus:InvoicePaymentStatus;
    IsAdded:boolean;
}
export class invoiceGridSearchViewModel{
    SponsorSiteStudyCDAInvitationId : number=0;
    InvoiceStatus: boolean=true;
    EmailStatus:boolean=true;
    InvoiceNumber: string="";
    ReferenceNumber:string="";
    toDate:string="";
    fromDate:string="";
    isSelected:boolean 
}
export  enum InvoicePaymentStatus { Paid, PartialPaid, Due }

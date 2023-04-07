import { BaseEntity } from '../baseentity.model';

export class invoiceDetail extends BaseEntity {
    constructor() {
        super();
    }
    serviceDate: any
    invoiceChargeType:InvoiceChargeType;
    invoiceChargeId: number;
    itemAmount: number;
    whPercentage: number;
    amountInvoiced: number;
    invoiceMasterId: number;
    invoiceChargeName:string;
    addedInMain:boolean;
    initial:string;
    screenNumber:string;
    categoryId:number;
    visitItemName:string;
    DOS:string;
    procedureCategoryName:string;
    completionDate:string;
    studyVisitTrackingId:number;
    invoiceDate:any;
    invoiceNumber:number;
    protocolNumber:string;
    balanceAmount:number;
    IsAdded:boolean;
    paymentStatus:paymentStatus;
}

export enum InvoiceChargeType {
    InvoiceVisitCharge = 0,
    InvoiceProcedureCharge,
    InvoiceNonProcedureCharge,
    InvoiceAdditionalCharge
}
export enum paymentStatus {
    Paid, PartialPaid, Due
}
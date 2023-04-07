import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { BaseEntity } from '../baseentity.model';

export class invoicePostPayment extends BaseEntity {
    constructor() {
        super();
    }
    invoiceId: number;
    invoiceAmountTotal: number;
    selectedAmount: number;
    dueAmount: number;
    paymentStatus: postPaymentStatus;
    dateOfPayment: any;
    invoiceNumber: string;
    invoiceDate: any;
    protocolNumber: string;
    VisitName: string;
    procedureName: string;
    IsInvoicePaid: boolean;
}
export enum postPaymentStatus {
    Paid, PartialPaid, Due
}
export class selectedInvoicePostPayment extends BaseEntity {
    constructor() {
        super();
    }
    invoiceId: number;
    invoiceAmountTotal: number;
    selectedAmount: number;
    dueAmount: number;
    paymentStatus: postPaymentStatus;
    dateOfPayment: any;
    invoiceNumber: string;
    invoiceDate: any;
    protocolNumber: string;
    VisitName: string;
    procedureName: string;
    IsInvoicePaid: boolean;
    fromDateModel: NgbDateStruct;
    invoiceMasterBalance: number;
    // invoiceItemBalance: 0;
}
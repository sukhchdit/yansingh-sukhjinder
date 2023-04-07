import { NumberValueAccessor } from '@angular/forms';
import { BaseEntity } from '../baseentity.model';
import { paymentStatus } from '../billinginvoice/invoiceDetail.model';

export enum expenseType { Expense = 0, Payment }
export enum payableStatus { All = 0, Paid, Unpaid, Hold }
export class Payables extends BaseEntity {
    vendorId: number;
    expenseType: expenseType = expenseType.Payment;
    serviceFromDate: any;
    serviceToDate: any;
    paymentDate: any;
    amount: number;
    sponsorSiteStudyCDAInvitationId: number;
    referenceNumber: string;
    isInvoiceable: boolean;
    expenseDate: any;
    expenseVendorId: number = 0;
    comments: string = '';
    vendorName:string;
    protocolNumber:string;
    paymentStatus: payableStatus;
}
export class PayablesSearchModel {
    vendorId: number;
    sponsorSiteStudyCDAInvitationId: Number;
    paymentStatus: payableStatus;
    serviceFromDate: any;
    serviceToDate: any;
    referenceNumber: string;
}

import { BaseEntity } from '../baseentity.model';

export class VendorInfo extends BaseEntity {
    vendorName: string;
}

export class VendorAccountInfo extends BaseEntity {
     vendorId: number;
    accountNo: string;
    paymentTerms: number;
    printName: string;
    vendorTaxId: string;
    eligibleFor1099: boolean;
}
export class VendorAddressInfo extends BaseEntity {
    vendorId: number;
    companyName:string;
    title:string;
    firstName:string;
    middleName:string;
    lastName:string;
    jobTitle:string;
    mainPhone:string;
    workPhone:string;
    mobile:string;
    fax:string;
    mainEmail:string;
    ccEmail:string;
    website:string;
    otherDetail:string;
    billingAddress1:string;
    billingAddress2:string;
    billingCity:string;
    billingState:string;
    billingCountry:string;
    billingZipCode:string;
    shippingAddress1:string;
    shippingAddress2:string;
    shippingCity:string;
    shippingState:string;
    shippingCountry:string;
    shippingZipCode:string;
}
export class VendorPaymentInfo extends BaseEntity {
    vendorId: number;
    serviceItemId: number;
    accountItemId:number;
    feeAmount:number; 
    ServiceName:string;
    AccountName:string;
}

export class VendorPaymentAccountType extends BaseEntity {
    account: string;
    type: string;
    incomeTaxLine:string;
}
export class VendorPaymentServiceItem extends BaseEntity {
    serviceItem: string;
}
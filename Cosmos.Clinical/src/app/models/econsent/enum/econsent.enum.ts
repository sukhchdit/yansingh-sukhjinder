export enum Econsent {
}

export enum IcfStatusType {
    Stage = 1,
    Current,
    Submitted,
    Hold,
    Archive
}

export enum IcfType {
    Paper = 1,
    Electronic
}

export enum IcfSource {
    Main = 1,
    PK,
    StudyWithdraw,
    Caregiver,
}

export enum updateActivityType {
    icfStatus = 1,
    effectiveDate,
    icfApprovedDate,
    icfVersion
}

export class EconsentComments {

    commentedBy: string
    commentedDate: string
    remarks: string
}
export enum eVaultDocStatus {
    Uploaded = 1,
    QAReady = 2,
    QAPass = 4,
    Publish = 8,
    QAFailed = 10
}

export enum eVaultTypeOfReports {
    Initial = 1,
    FollowUP = 2,
    Final = 3
}

export enum signingReasons {
    'Approve Document' = 1,
    'Re-Acknowledge Document',
    'Document Training',
    'Review Approve Document',
    'Review Document',
    'Sign Document',
    'Safety Report',
    'Eos Document'
}
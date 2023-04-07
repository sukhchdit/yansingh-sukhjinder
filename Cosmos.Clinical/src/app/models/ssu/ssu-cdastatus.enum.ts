export enum SsuCDAStatus {
    Send = 1,
    Accepted,
    Rejected,
    Completed,
    Close,
    Active,
}

export interface TotalDetails {
    targetSites: number,
    totalSites: number,
    totalSent: number,
    totalReceived: number,
  };

export interface FlowHeaders {
    targetSites: string,
    totalSites: string,
    totalSent: string,
    totalReceived: string,
  };
  
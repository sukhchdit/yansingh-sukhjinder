export class ComplianceTrainingViewModel {
  siteNumber: string;
  siteName: string;
  userName: string;
  roleName: string;
  countryId: number;
  siteInfoId: number;  
  completionStatus: string;
  completionDate: Date;
  completionPercent: number;
  rowIndex: number;
  complianceTrainingUserRoleList: Array<ComplianceTrainingUserRoleViewModel>;
}
export class ComplianceTrainingUserRoleViewModel {
  roleId: number;
  roleName: string;
  organizationContactId: number;
  organizationContactName: string;
  completionPercent: number;
  rowIndex: number;
  complianceTrainingUserTrainingList: Array<ComplianceTrainingUserTrainingViewModel>;
}

export class ComplianceTrainingUserTrainingViewModel {
  organizationContactId: number;
  trainingId: number;
  trainingName: string;
  completionStatus: string;
  completionDate: Date;
  completionPercent: number;
}

export class TrainingRoles {
  id: number;
  name: string;
}

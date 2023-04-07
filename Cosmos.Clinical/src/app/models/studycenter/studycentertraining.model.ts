import { BaseEntity } from '../baseentity.model';
export enum TrainingStatus { NotCertified = 1, Certified, Active, InActive, QCReady, QCFlag, QCCompleted }

export class StudyCenterTraining extends BaseEntity {
  constructor() {
    super();
    this.trainingStatus = TrainingStatus.NotCertified;
  }
  sponsorstudyinfoid: number;
  categoryId: number;
  languageId: number;  
  assignedToId: number;
  countryId: number;
  trainingName: string;
  noofDays: number;
  trainingMaterial: string;
  location: string;
  mandatory: string;
  certified: boolean;
  trainingStatus: TrainingStatus;
  studyCenterTrainingGuid: string;
}

export class TrainingRoleMapping extends BaseEntity {
  constructor() {
    super();
  }
  sponsorstudyinfoid: number;
  sponsorSiteStudyCdaInvitationId: number;
  languageId: number;
  trainingId: number;
  roleId: number;
  dueDate: Date;
  studycentertrainingrolemappingGuid: string;
}

export class TrainingUserMapping extends BaseEntity {
  constructor() {
    super();
  }
  sponsorstudyinfoid: number;
  trainingId: number;
  userId: number;
  completionStatus: number;
  completionDate: Date;
  studycentertrainingusermappingGuid: string;
}

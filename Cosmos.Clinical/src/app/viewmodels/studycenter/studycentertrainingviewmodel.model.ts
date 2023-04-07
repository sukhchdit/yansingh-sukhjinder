export enum TrainingStatus { NotCertified = 1, Certified, Active, InActive, QCReady, QCFlag, QCCompleted }
export class StudyCenterTrainingViewModel {
  id: number;
  trainingName: string;
  categoryName: string;
  languageName: string;
  assignedToName: string;
  countryName: string;
  noofDays: string;
  trainingMaterial: string
  trainingMaterialFileType: string
  location: string;
  certified: boolean;
  certifiedTitle: string;
  mandatory: boolean;
  mandatoryTitle: string;
  trainingStatus: TrainingStatus;
  trainingStatusTitle: string;
  studyCenterTrainingGuid: string;
  showCompletedButton: boolean;
}

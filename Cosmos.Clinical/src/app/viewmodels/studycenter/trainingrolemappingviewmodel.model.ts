export class TrainingRoleMappingViewModel {
  trainingId: number;
  trainingName: string;
  categoryName: string;
  languageName: string;
  roleId: string;
  rolename: string;
  roleCount: number;
  rowIndex: number;
  trainingRoles: Array<TrainingRolesViewModel>;
}
export class TrainingRolesViewModel {
  mappingId: number;
  trainingId: number;
  roleId: number;
  roleName: string;
}

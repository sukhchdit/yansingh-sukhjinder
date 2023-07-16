export class BaseEntity {
  constructor() {
    this.createdOn = new Date();
    this.updatedOn = new Date();
    this.status = true;
  }
  id: number;
  createdBy: number;
  createdOn: any;
  updatedBy: number;
  updatedOn: any;
  status: boolean;
}

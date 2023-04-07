import { BaseEntity } from '../baseentity.model';
import { Procedure } from '../common/procedure.model';

export class SponsorStudyProcedure extends BaseEntity {

  procedureId: number;
  title: string;
  sortOrder: number;
  initials: string;
  sponsorStudyInfoId: number;
  procedure=new Procedure();
}

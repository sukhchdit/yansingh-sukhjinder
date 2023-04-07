import { InvestigatorInfo } from '../site/investigator/investigatorinfo.model';
import { BaseEntity } from '../baseentity.model';
import { SponsorSiteStudyCDAInvitation } from './sponsorsitestudycdainvitation.model';

export class SponsorSiteStudySubInvestigator extends BaseEntity {
  constructor() {
    super();
  }
  
  investigatorInfoId: number;
  investigatorInfo: InvestigatorInfo;
  SponsorSiteStudyCDAInvitationId: number;
  sponsorSiteStudyCDAInvitation: SponsorSiteStudyCDAInvitation;
}

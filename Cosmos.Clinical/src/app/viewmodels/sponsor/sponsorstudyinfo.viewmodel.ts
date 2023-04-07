import { Indicator } from '../../models/site/investigator/indicator.model';
import { SponsorStudyInfo } from '../../models/sponsor/sponsorstudyinfo.model';

export class SponsorStudyInfoViewModel {
  sponsorStudyInfo: SponsorStudyInfo;
  isCdaSent: boolean;
  isPreviewable: boolean;
  isTemplateReady: boolean;
  indicator: Indicator;
}

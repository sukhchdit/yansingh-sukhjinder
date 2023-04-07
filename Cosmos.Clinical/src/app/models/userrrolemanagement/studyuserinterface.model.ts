import { StudyIdTitleViewModel } from "./studyidtitleview.model";
import { UserInterfaceViewModel } from "./userinterfaceview.model";

export class StudyUserInterfaceModel {
  sponsorStudy: StudyIdTitleViewModel;
  userInterfaces: UserInterfaceViewModel[];
  isAdmin: boolean;
}

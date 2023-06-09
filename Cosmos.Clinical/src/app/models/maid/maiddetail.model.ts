import { BaseContact } from '../basecontact.model';
import { MaidExperience } from './maidexperience.model';

export class MaidDetail extends BaseContact {
  name: string;
  nickName: string;
  nationality: string;
  age: number;
  dateOfBirth: Date
  height: string;
  heightUnit: string;
  weight: string;
  weightUnit: string;
  maritalStatus: string;
  education: string;
  religion: string;
  spouseName: string;
  spouseOccupation: string;
  siblings: string;
  iAmNumber: string;
  numberOfSon: string;
  numberOfDaughter: string;
  passportNumber: string;
  passportExpiryDate: Date;
  hongKongId: string;
  currentlyBasedIn: string;
  currentContractStatus: string;
  phone: string;
  email: string;
  currentAddress: string;
  currentCity: string;
  currentCountry: string;
  permanentAddress: string;
  referralName: string;

  languageCantonese: string;
  languageCantoneseStatus: string;
  languageEnglish: string;
  languageEnglishStatus: string;
  languageMandarin: string;
  languageMandarinStatus: string;
  workOnHoliday: boolean;
  eatPork: boolean;
  careBigPet: boolean;
  vaccinated3Time: boolean;
  shareJobWithOtherHelpers: boolean;
  takeCareDisabledElderly: boolean;
  shareRoomWithElderlyKids: boolean;
  chineseZodiac: string;
  goOnHoliday: string;
  maidCode: string;
  lastFinishContractDate: Date;
  maidEmployementStatus: boolean;

  hkExp: string;
  singaporeExp: string;
  taiwanExp: string;
  malaysiaExp: string;
  middleEastExp: string;
  saudiArabiaExp: string;
  indonesiaExp: string;
  philippinesExp: string;
  otherExp: string;

  babies: boolean;
  children: boolean;
  elderly: boolean;
  disabled: boolean;
  petCare: boolean;
  cooking: boolean;

  maidExperienceJobDuty: MaidExperience[] = [];
}

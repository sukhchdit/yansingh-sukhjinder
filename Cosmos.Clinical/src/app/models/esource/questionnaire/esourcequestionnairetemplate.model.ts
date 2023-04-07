import { BaseEntity } from '../../baseentity.model';
import { eSourceOptionTemplate } from './esourceoptiontemplate.model';

export enum ControlType { TextBox = 1, TextArea, CheckBox, RadioButton, DropDown, Static, Slider, Date, DateTime, Table, Image, RichTextBox, Header, BMI, Temprature }

export class eSourceQuestionnaireTemplate extends BaseEntity {
  constructor() {
    super();
    this.controlType = 0;
    this.isNumeric = false;
    this.optionTemplates = [];
    this.title = "";
  }

  title: string;
  controlType: ControlType;
  isNumeric: boolean;
  maxLength: number;
  parentId: number;
  minValue: number;
  maxValue: number;
  isRequired: boolean;
  imageFile: any;
  visitSummary: boolean;

  optionTemplates: eSourceOptionTemplate[] = [];

  sectionId: number;

}

import { BaseEntity } from '../../baseentity.model';
import { CommonOptionTemplate } from './commonoptiontemplate.model';

export enum ControlType { TextBox = 1, TextArea, CheckBox, RadioButton, DropDown, Static, Slider, Date, DateTime, Table, Image, RichTextBox, Header, BMI, Temprature }

export class CommonQuestionnaireTemplate extends BaseEntity {
  constructor() {
    super();
    this.controlType = 0;
    this.isNumeric = false;
    this.studyOptions = [];
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
  imageFile: string;
  visitSummary: boolean;

  studyOptions: CommonOptionTemplate[] = [];

  sectionId: number;
}

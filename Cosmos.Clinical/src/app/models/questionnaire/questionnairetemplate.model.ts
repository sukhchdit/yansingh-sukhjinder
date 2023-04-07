import { BaseEntity } from '../baseentity.model';
import { OptionTemplate } from './optiontemplate.model';

export enum ControlType { TextBox = 1, TextArea, CheckBox, RadioButton, DropDown, Static, Slider, Date, DateTime, Table, Image, RichTextBox, Header, BMI, Temprature }

export class QuestionnaireTemplate extends BaseEntity {
  constructor() {
    super();
    this.controlType = 0;
    this.isNumeric = false;
    this.optionTemplates = [];
  }

  title: string;
  controlType: ControlType;
  isNumeric: boolean;
  maxLength: number;

  optionTemplates: OptionTemplate[] = [];

  sectionId: number;

}

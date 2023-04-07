import { BaseEntity } from '../baseentity.model';
import { eDiaryOptionTemplate } from './ediaryoptiontemplate.model';

export enum ControlType { TextBox = 1, TextArea, CheckBox, RadioButton, DropDown, Static, Slider, Date, DateTime, Table, Image }

export class eDiaryQuestionnaireTemplate extends BaseEntity {
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
  parentId: number;
  minValue: number;
  maxValue: number;
  isRequired: boolean;
  imageFile: string;

  optionTemplates: eDiaryOptionTemplate[] = [];

  sectionId: number;

}

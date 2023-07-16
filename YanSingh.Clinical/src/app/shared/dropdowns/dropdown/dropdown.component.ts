import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() dropDownName: any;
  @Input() errorMsg: any;
  @Input() optionObject: Object = null;
  @Input() Options: Array<any>;
  @Input() fieldValidation: boolean = false;
  @Input() enumDropDownType: boolean = false;
  @Input() optionId: any = null;
  @Input() optionName: any = null;
  @Input() subOptionName: any = null;
  @Output() selectedValueEmit = new EventEmitter();
  @Input() selectedId: any;
  selectedDropdown = 'none';
  selectedValue = 'Select';

  ngOnInit() {
    if(this.selectedId) {
      if(this.enumDropDownType)
        this.onValueChange(this.selectedId);
      else {
        if(this.subOptionName == null) {
          const selectedName = this.Options.find((e) => e[this.optionId] == this.selectedId);
          this.onValueChangeEnumNot(this.selectedId, selectedName[this.optionName]);
        } else {
          const selectedName = this.Options.find((e) => e[this.optionId] == this.selectedId);
          this.onValueChangeEnumNot(this.selectedId, selectedName[this.optionName][this.subOptionName]);
        }
        
      }
    }
  }
  onValueChange(value) {
    if (value) {
      if(this.optionObject != null){
        this.selectedValue = this.optionObject[value];
      } else {
        this.selectedValue  = value;
      }
      this.selectedValueEmit.emit(value);
    }
    this.selectedDropdown = 'none';
  }

  onValueChangeEnumNot(id, name) {
    if (id) {
      this.selectedValue = name;
      this.selectedValueEmit.emit(id);
    }
    this.selectedDropdown = 'none';
  }

  closeDropdown() {
    this.selectedDropdown = 'none';
  }

  openDropdown(ele: any) {
    if (this.selectedDropdown == ele) {
      this.selectedDropdown = 'none';
    } else this.selectedDropdown = ele;
  }
}

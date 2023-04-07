import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IcfType } from 'src/app/models/econsent/enum/econsent.enum';

@Component({
  selector: 'app-icf-type',
  templateUrl: './icf-type.component.html',
  styleUrls: ['./icf-type.component.scss']
})
export class IcfTypeComponent {
  @Input() fieldValidation: boolean = false;
  @Output() icfTypeValue = new EventEmitter<any>();
  errorMsg: string = `ICF Type is <strong>required</strong>`;

  icfTypeObject = IcfType;
  IcfTypeOptions = Object.keys(IcfType).map(key => IcfType[key]).filter(value => typeof value === 'string');

  onValueChange(selectValue) {
    if (selectValue) {
      this.icfTypeValue.emit(selectValue);
    }
  }

}

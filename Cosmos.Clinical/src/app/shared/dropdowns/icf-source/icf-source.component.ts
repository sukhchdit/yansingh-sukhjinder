import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IcfSource } from 'src/app/models/econsent/enum/econsent.enum';

@Component({
  selector: 'app-icf-source',
  templateUrl: './icf-source.component.html',
  styleUrls: ['./icf-source.component.scss']
})
export class IcfSourceComponent {
  @Input() fieldValidation: boolean = false;
  @Output() icfSourceValue = new EventEmitter<any>();
  errorMsg: string = `ICF Source is <strong>required</strong>`;
  icfSourceObject = IcfSource;
  IcfSourceOptions = Object.keys(IcfSource).map(key => IcfSource[key]).filter(value => typeof value === 'string');

  onValueChange(selectValue) {
    if (selectValue) {
      this.icfSourceValue.emit(selectValue);
    }
  }
}

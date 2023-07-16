import { Injectable, Pipe } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: 'momentDatePipe'
})
@Injectable()
export class MomentDatePipe {  
  transform(value: any, format: any = 'YYYY-MM-DD HH:mm'): any {
    if (value) {
      return moment.utc(value).local().format(format);
    }
  }

  get currentDate(): moment.Moment {
    return moment.utc(new Date());
  }

  convertDate(datetime: any) {
    var tDate = new Date(datetime);
    return moment.utc(tDate);
  }

  convertDateToLocal(datetime: any) {    
    return moment.utc(datetime).local().format('yyyy-MM-DDTHH:mm');
  }
}

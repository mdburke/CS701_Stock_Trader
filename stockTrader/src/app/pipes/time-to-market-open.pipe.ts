import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from "rxjs/util/isNumeric";

@Pipe({
  name: 'timeToMarketOpen'
})
export class TimeToMarketOpenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value) {
      case "close": {
        return "Closed";
      }
      case "pre": {
        return "Pre-Market Hours";
      }
      case "after": {
        return "After-Market Hours";
      }
      case "open": {
        return "Open";
      }
    }

  }

}

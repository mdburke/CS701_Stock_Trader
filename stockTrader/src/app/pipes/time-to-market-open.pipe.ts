import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from "rxjs/util/isNumeric";

// Simple pipe that just translates the message we get from Trade King API on the market status to
// something more informative.
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

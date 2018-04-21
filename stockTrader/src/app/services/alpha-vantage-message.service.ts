import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

// Message service pattern that I found via Stack Overflow that I liked and seemed clean
// This message service relays the message from Alpha Vantage
@Injectable()
export class AlphaVantageMessageService {
  private subject = new Subject<any>();

  sendMessage(message: any) {
    this.subject.next(message);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

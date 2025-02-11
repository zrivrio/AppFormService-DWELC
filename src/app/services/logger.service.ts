import {Injectable} from '@angular/core';
import {count} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  countLog =0;
  countWarn =0;
  countError =0;

  constructor() {
  }

  getCounts() {
    return {
      log: this.countLog,
      warn: this.countWarn,
      error: this.countError
    };
  }

   updateCounts(classification: 'log' | 'warn' | 'error') {
    if (classification === 'log') this.countLog++;
    else if (classification === 'warn') this.countWarn++;
    else if (classification === 'error') this.countError++;
  }
}

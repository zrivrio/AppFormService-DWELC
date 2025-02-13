import {Injectable} from '@angular/core';
import { EventM } from '../models/eventM.model';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  countLog =0;
  countWarn =0;
  countError =0;

  constructor() {
    this.loadCountsFormStorage();
  }

  private loadCountsFormStorage(): void {
    const eventosGuardados = localStorage.getItem('eventos');
    if (eventosGuardados){
      const eventos : EventM[] = JSON.parse(eventosGuardados);
      this.countLog = eventos.filter(event => event.classification === 'log').length;
      this.countWarn = eventos.filter(event => event.classification === 'warn').length;
      this.countError = eventos.filter(event => event.classification === 'error').length;
    }
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
  
    this.saveCountsToStorage();
  
  }
  
  private saveCountsToStorage() :void{
    localStorage.setItem('counts', JSON.stringify(this.getCounts()));
  }

}

import {Injectable} from '@angular/core';
import { EventM } from '../models/eventM.model';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  //Definir tres propediades que llevaran el conteo de cuantas veces se ha llama a cada tipo de log
  countLog =0;
  countWarn =0;
  countError =0;

  constructor() {
    this.loadCountsFormStorage();
  }

  //Obtener conteos desde el localStorage
  private loadCountsFormStorage(): void {
    if(typeof localStorage !== 'undefined'){
      const eventosGuardados = localStorage.getItem('eventos');
      if (eventosGuardados){
        const eventos : EventM[] = JSON.parse(eventosGuardados);
        this.countLog = eventos.filter(event => event.classification === 'log').length;
        this.countWarn = eventos.filter(event => event.classification === 'warn').length;
        this.countError = eventos.filter(event => event.classification === 'error').length;
      }
    }
  }

  //Merodo que devuelve un objeto con los conteos actuales de logs, warnings y errors
  //Este metodo pue eser llmado en cualquier componente o srvicio que necesite conocer el estado actual de los conteos
  getCounts() {
    return {
      log: this.countLog,
      warn: this.countWarn,
      error: this.countError
    };
  }

  //Metodo quee actualiza el conteo de los logs, warnings y de los errors
  //Recibe le parametro calisificacion que puede ser log, warn o error
  //Dependiedo del valor de esta clasificacion se incrementara el contador correpondiente
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

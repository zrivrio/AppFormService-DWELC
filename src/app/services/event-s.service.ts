import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { EventM } from '../models/eventM.model';

@Injectable({
  providedIn: 'root'
})
export class EventSService {

  private eventos: EventM[] = [];

  constructor(private loggerService : LoggerService){
    this.loadEventos()
  }

  addEvento(evento: EventM): void {

    evento.id = this.eventos.length + 1;
    evento.createdAt = new Date();

    this.eventos.push(evento);
    
    this.loggerService.updateCounts(evento.classification);

    this.saveEventos(); 
  }

  private saveEventos(): void {
    localStorage.setItem('eventos', JSON.stringify(this.eventos)); 
  }

  loadEventos(): void {
    if(typeof localStorage !=='undefined'){
      const eventosLoad = localStorage.getItem('eventos');
      this.eventos = eventosLoad ? JSON.parse(eventosLoad) : [];
      if (!Array.isArray(this.eventos)) {
        this.eventos = [];
      }
    } else {
      this.eventos = [];
    }
  }
  getEventos(){
    return this.eventos;
  }


}

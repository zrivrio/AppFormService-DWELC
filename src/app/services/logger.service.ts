import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private events: Event[] = [];

  constructor() {}

  // Método para agregar un evento
  addEvent(event: Event): void {
    this.events.push(event);
  }

  // Método para obtener los eventos, con filtro opcional por tipo
  getEvents(category?: 'log' | 'warn' | 'error'): Event[] {
    return category ? this.events.filter(event => event.type === category) : this.events;
  }

  // Método para contar los eventos por tipo
  getEventsCount(): { log: number; warn: number; error: number } { 
    return this.events.reduce(
      (counts, event) => {
        // Asegurándonos de incrementar el conteo del tipo correspondiente
        if (counts[event.type] !== undefined) {
          counts[event.type]++;
        }
        return counts;
      },
      { log: 0, warn: 0, error: 0 }  
    );
  }
}

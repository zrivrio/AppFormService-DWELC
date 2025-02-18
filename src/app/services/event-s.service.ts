import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { EventM } from '../models/eventM.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventSService {

  //Defeinimos una propiedad privada que es un array del tipo EventM
  //En esta propiedada se almacenara la lista de eventos
  private eventos: EventM[] = [];
  
  //Aqui se inyecta el loggerService como una dependencia
  //Tambien se llama al evento loadEventos() para cargar los eventos alamcenados en el localStorage al inicializar el servicio
  constructor(private loggerService : LoggerService){
    this.loadEventos()
  }

  //Metodo para agregar un nuevo evento a la lista
  //Recibe el parametro de evento del tipo EventM
  addEvento(evento: EventM): void {
  // Obtener el ID más alto en la lista actual para evitar duplicados
  const maxId = this.eventos.length > 0 ? Math.max(...this.eventos.map(e => e.id)) : 0;
  evento.id = maxId + 1; // Asegurar que el ID sea único
  evento.createdAt = new Date();

  this.eventos.push(evento);
  this.loggerService.updateCounts(evento.classification);
  this.saveEventos();
}

  //Metodo para guardar la lista de eventos en el localStorage 
  //Convierte el array evntos en una cadaena json y la almacena en el localStorage bajo la clasificacion eventos
  private saveEventos(): void {
    localStorage.setItem('eventos', JSON.stringify(this.eventos)); 
  }

  //Metodo para cargar los eventos almacenados en el localStorage
  loadEventos(): void {
    //Verificamos si el localStorage esta disponible
    if(typeof localStorage !=='undefined'){
      //Obtenemos la cadena JSON almacenada en el locarStorage bajo la clave de eventos
      const eventosLoad = localStorage.getItem('eventos');
      //Si hay datos almacenadis los parseamos a un array de objetos EventM
      //Si no hay datos inicializamos un array vacio
      this.eventos = eventosLoad ? JSON.parse(eventosLoad) : [];
      
      // Verificamos si this.eventos es un array. Si no lo es, lo inicializamos como un array vacío.
      // Esto es útil para evitar errores si los datos almacenados no tienen el formato esperado.
      if (!Array.isArray(this.eventos)) {
        this.eventos = [];
      }
    } else {
       // Si el localStorage no está disponible, inicializamos un array vacío.
      this.eventos = [];
    }
  }

   // Método para obtener la lista de eventos.
  // Devuelve el array eventos.
  getEventos(){
    return this.eventos;
  }

// Método para eliminar un evento de la lista
deleteEvento(id: number): void {
  // Buscar el índice del evento en el array
  const index = this.eventos.findIndex(evento => evento.id === id);

  // Si se encuentra el evento, eliminarlo
  if (index !== -1) {
    const deletedEvent = this.eventos.splice(index, 1)[0]; // Eliminamos el evento y guardamos el eliminado

    // Actualizar el localStorage
    this.saveEventos();

    // Opcionalmente, actualizar contadores si es necesario
    this.loggerService.decreaseCount(deletedEvent.classification);
  }
}

  //Metodo para editar un evento
  editEvento(updateEvent: EventM, id: number): void {
    const index = this.eventos.findIndex(evento => evento.id === id);
    if(index !== -1){
      const oldCalisification = this.eventos[index].classification;
      this.eventos[index] = {...this.eventos[index], ...updateEvent};

      if(oldCalisification !== updateEvent.classification){
        this.loggerService.decreaseCount(oldCalisification);
        this.loggerService.updateCounts(updateEvent.classification);
      }
      this.saveEventos();
    }
  }


}

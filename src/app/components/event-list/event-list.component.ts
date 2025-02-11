import { Component, OnInit } from '@angular/core';
import { EventSService } from '../../services/event-s.service';
import { EventM } from '../../models/eventM.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  eventos: EventM[] = [];

  constructor(private eventService: EventSService) {}

  ngOnInit(): void {
    this.eventService.loadEventos();
    this.eventos = this.eventService.getEventos();
  
    console.log("Eventos cargados en EventListComponent:", this.eventos);
  }

  onFilterChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue === 'all') {
      this.eventos = this.eventService.getEventos();
    } else {
      this.eventos = this.eventService.getEventos().filter(ev => ev.classification === selectedValue);
    }
  }
}
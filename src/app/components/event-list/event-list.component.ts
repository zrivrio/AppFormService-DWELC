import { Component, OnInit } from '@angular/core';
import { EventSService } from '../../services/event-s.service';
import { EventM } from '../../models/eventM.model';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  eventos: EventM[] = [];

  countLog = 0;
  countWarn = 0;
  countError = 0;

  constructor(private eventService: EventSService, private loggerService : LoggerService) {}

  ngOnInit(): void {
    this.eventService.loadEventos();
    this.eventos = this.eventService.getEventos();

    this.updateCounts();

  
  }

  onFilterChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue === 'all') {
      this.eventos = this.eventService.getEventos();
    } else {
      this.eventos = this.eventService.getEventos().filter(ev => ev.classification === selectedValue);
    }
  }

  updateCounts() : void {
    const count = this.loggerService.getCounts();

    this.countLog = count.log;
    this.countWarn = count.warn;
    this.countError = count.error;
  }
}

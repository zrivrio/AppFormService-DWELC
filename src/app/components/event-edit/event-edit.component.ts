import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventSService } from '../../services/event-s.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EventM } from '../../models/eventM.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-edit',
  imports: [CommonModule, BsDatepickerModule, ReactiveFormsModule],
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css'
})
export class EventEditComponent {

  // Propiedad para almacenar el evento a editar
  event: any;

   eventForm: FormGroup;

   bsConfig = {
    dateInputFormat: 'DD-MM-YYYY', // Formato de la fecha.
    isAnimated: true, // Habilita animaciones.
    containerClass: 'theme-blue' // Estilo del selector de fechas.
  };

  constructor(private route: ActivatedRoute, private eventService: EventSService, private fb: FormBuilder, private router: Router) { 
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      classification: ['', Validators.required],
      employee: ['', Validators.required],
      employeeId: ['', Validators.required],  // Agregar este campo para el ID del empleado
      client: ['', Validators.required],
      date: ['', Validators.required],
    });
  }  

  ngOnInit(): void {
    const idEvent = this.route.snapshot.paramMap.get('idEvent');
    const event = this.eventService.getEventos().find(ev => ev.id.toString() === idEvent);
    
    if (!event) {
      alert('Evento no encontrado');
      return;
    }
  
    this.event = event;
  
    // Rellenar el formulario con los datos del evento actual
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      classification: event.classification,
      employee: event.employee.name, // Mostramos el nombre solo
      client: event.client,
      date: event.date,
      employeeId: event.employee.id,  // Campo oculto con el ID del empleado
    });
  }  
  
  onSubmit(): void {
    if (this.eventForm.valid) {
      // Crear el evento actualizado con el ID y el nombre del empleado
      const updatedEvent: EventM = {
        ...this.event,
        employee: { 
          id: this.eventForm.value.employeeId,  // Utilizamos el ID del empleado desde el formulario
          name: this.eventForm.value.employee,  // Utilizamos el nombre del empleado desde el formulario
        },
        ...this.eventForm.value,  // Obtiene el resto de los valores del formulario
      };
  
      // Llamar al servicio para actualizar el evento
      this.eventService.editEvento(updatedEvent, this.event.id);
    }
  
    // Redirigir a la lista de eventos después de guardar
    this.router.navigate(['/list']);
  }

}

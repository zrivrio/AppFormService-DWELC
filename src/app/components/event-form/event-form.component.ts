import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeM } from '../../models/employeeM.model';
import { EventSService } from '../../services/event-s.service';
import { EmployeeSService } from '../../services/employee-s.service';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule],
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  //Los servicios se puedne llamar de diefente manera unos en el constructor y la oatra manera es la siguiente
  //employeeService : inject(EmployeeSService)

  // defino una propiedad 'eventForm' que es un FormGroup.
  // Este FormGroup contendrá los controles del formulario.
  eventForm: FormGroup;

  // defino una propiedad 'selectedEmployee' para almacenar el empleado seleccionado.
  
  
  
  
  selectedEmployee: EmployeeM | null = null;

  // Configuración para el selector de fechas de ngx-bootstrap.
  bsConfig = {
    dateInputFormat: 'DD-MM-YYYY', // Formato de la fecha.
    isAnimated: true, // Habilita animaciones.
    containerClass: 'theme-blue' // Estilo del selector de fechas.
  };

  // Aquí se inyectan las dependencias: FormBuilder, EventSService y EmployeeSService.
  constructor(
    private fb: FormBuilder, // FormBuilder para crear el formulario reactivo.
    private eventService: EventSService, // Servicio para gestionar eventos.
    private employeeService: EmployeeSService // Servicio para gestionar empleados.
  ) {
    // Inicializamos el formulario con controles y validaciones.
    this.eventForm = this.fb.group({
      title: ['', Validators.required], 
      description: ['', Validators.required],
      classification: ['log', Validators.required], //valor por defecto: log
      employee: ['', Validators.required],
      client: ['', Validators.required], 
      date: ['', Validators.required]
    });
  }

  // Método que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    // Nos suscribimos al Observable 'getSelectedEmployee' del EmployeeSService.
    // Esto nos permite recibir actualizaciones cuando el empleado seleccionado cambie.
    this.employeeService.getSelectedEmployee().subscribe(employee => {
      this.selectedEmployee = employee; // Actualizamos la propiedad 'selectedEmployee'.

      // Si hay un empleado seleccionado, actualizamos el valor del control 'employee' en el formulario.
      if (employee) {
        this.eventForm.patchValue({
          employee: employee.id
        });
      }
    });
  }

  // Método que se ejecuta cuando se envía el formulario.
  onSubmit(): void {
    // Verificamos si el formulario es válido y si hay un empleado seleccionado.
    if (this.eventForm.valid && this.selectedEmployee !== null) {
      // Creamos un objeto 'evento' con los valores del formulario y datos adicionales.
      const evento = {
        ...this.eventForm.value, 
        employee: this.selectedEmployee, 
        id: Date.now(), 
        createdAt: new Date() 
      };

      console.log("Evento a guardar:", evento);

      // Llamamos al método 'addEvento' del EventSService para guardar el evento.
      this.eventService.addEvento(evento);

      // Reseteamos el formulario después de guardar el evento.
      this.eventForm.reset();
    } else {
      console.error('Debe seleccionar un empleado antes de enviar el formulario.');
    }
  }
}
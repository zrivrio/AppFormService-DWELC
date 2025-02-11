import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeM } from '../../models/employeeM.model';
import { EventSService } from '../../services/event-s.service';
import { EmployeeSService } from '../../services/employee-s.service';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  imports:[CommonModule, ReactiveFormsModule, BsDatepickerModule],
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  selectedEmployee: EmployeeM | null = null;

  bsConfig = {
    dateInputFormat: 'DD-MM-YYYY',
    isAnimated: true,
    containerClass: 'theme-blue'
  };

  constructor(
    private fb: FormBuilder,
    private eventService: EventSService,
    private employeeService: EmployeeSService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      classification: ['log', Validators.required],
      employee: ['', Validators.required],
      client: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.employeeService.getSelectedEmployee().subscribe(employee => {
      this.selectedEmployee = employee;
     
      if (employee) {
        this.eventForm.patchValue({
          employee: employee.id
        });
      }
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid && this.selectedEmployee !== null) {
      const evento = {
        ...this.eventForm.value,
        employee: this.selectedEmployee, 
        id: Date.now(),
        createdAt: new Date()
      };

      console.log("Evento a guardar:" , evento)

      this.eventService.addEvento(evento);
      this.eventForm.reset();
    } else {
      console.error('Debe seleccionar un empleado antes de enviar el formulario.');
    }
  }
}

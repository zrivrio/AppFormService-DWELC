import { Component, OnInit } from '@angular/core';
import { EmployeeM } from '../../models/employeeM.model';
import { EmployeeSService } from '../../services/employee-s.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Definimos una propiedad 'employees' para almacenar la lista de empleados.
  employees: EmployeeM[] = [];

  // Definimos una propiedad 'selectedEmployee' para almacenar el empleado seleccionado.
  selectedEmployee: EmployeeM | null = null;

  // El constructor del componente.
  // Aquí se inyecta el servicio EmployeeSService como una dependencia.
  constructor(private employeeService: EmployeeSService) {}

  // Método que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    // Nos suscribimos al Observable 'getEmployees' del EmployeeSService.
    // Esto nos permite recibir la lista de empleados cuando esté disponible.
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees; // Actualizamos la propiedad 'employees' con la lista recibida.
    });

    // Nos suscribimos al Observable 'getSelectedEmployee' del EmployeeSService.
    // Esto nos permite recibir actualizaciones cuando el empleado seleccionado cambie.
    this.employeeService.getSelectedEmployee().subscribe(employee => {
      this.selectedEmployee = employee; // Actualizamos la propiedad 'selectedEmployee'.
    });
  }

  // Método que se ejecuta cuando el usuario selecciona un empleado en el selector.
  onEmployeeChange(event: Event): void {
    // Obtenemos el valor seleccionado en el elemento <select>.
    const selectedId = (event.target as HTMLSelectElement).value;

    // Buscamos el empleado correspondiente en la lista 'employees' usando el ID seleccionado.
    this.selectedEmployee = this.employees.find(emp => emp.id.toString() === selectedId) || null;

    // Actualizamos el empleado seleccionado en el EmployeeSService.
    this.employeeService.setSelectedEmployee(this.selectedEmployee);
  }
}
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
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees; // Actualizamos la propiedad 'employees' con la lista recibida.
  
      // Verificamos si hay un empleado seleccionado en el localStorage.
      const storedEmployee = localStorage.getItem('selectedEmployee');
      if (storedEmployee) {
        const parsedEmployee = JSON.parse(storedEmployee) as EmployeeM;
  
        // Verificamos si el empleado almacenado aún existe en la lista de empleados.
        if (this.employees.some(emp => emp.id === parsedEmployee.id)) {
          this.selectedEmployee = parsedEmployee;
          this.employeeService.setSelectedEmployee(this.selectedEmployee); // Actualizamos el empleado seleccionado en el servicio.
        } 
      }
    });
  
    // Nos suscribimos al Observable 'getSelectedEmployee' del EmployeeSService.
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

    if (this.selectedEmployee) {
      localStorage.setItem('selectedEmployee', JSON.stringify(this.selectedEmployee));
    }


    // Actualizamos el empleado seleccionado en el EmployeeSService.
    this.employeeService.setSelectedEmployee(this.selectedEmployee);
  }
}
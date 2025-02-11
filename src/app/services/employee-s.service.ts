import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeM } from '../models/employeeM.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSService {
  
  private employeesSubject = new BehaviorSubject<EmployeeM[]>([]); 
  private selectedEmployeeSubject = new BehaviorSubject<EmployeeM | null>(null);

  constructor() {
    this.loadEmployees();
  }

 
  getEmployees() {
    return this.employeesSubject.asObservable(); 
  }


  getSelectedEmployee() {
    return this.selectedEmployeeSubject.asObservable();
  }


  setSelectedEmployee(employee: EmployeeM | null) {
    this.selectedEmployeeSubject.next(employee); 
    if (employee) {
      localStorage.setItem('selectedEmployee', JSON.stringify(employee));
    } else {
      localStorage.removeItem('selectedEmployee');  
    }
  }

 
  private loadEmployees() {
    fetch('http://localhost:3000/employee')
      .then(response => response.json())
      .then(data => {
        this.employeesSubject.next(data); 
      })
      .catch(error => console.error('Error al cargar los empleados:', error));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeM } from '../models/employeeM.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSService {

  //Defino un BehaviorSubject para mantener y emitir l lista de empleados 
  //Inicalmente su valor esta vacio
  private employeesSubject = new BehaviorSubject<EmployeeM[]>([]); 
  
  //Defino un BehaviorSubject para mantener y emitir el emplado selecionado 
  //Inicialmente el valor es null
  private selectedEmployeeSubject = new BehaviorSubject<EmployeeM | null>(null);

  //Tambien se llama al evento loadEventos() para cargar los eventos alamcenados en el localStorage al inicializar el servicio
  constructor() {
    this.loadEmployees();
  }

  // Método para obtener un Observable de la lista de empleados.
  // Los componentes pueden suscribirse a este Observable para recibir actualizaciones cuando la lista de empleados cambie.
  getEmployees() {
    return this.employeesSubject.asObservable(); 
  }

// Método para obtener un Observable del empleado seleccionado.
  // Los componentes pueden suscribirse a este Observable para recibir actualizaciones cuando el empleado seleccionado cambie.
  getSelectedEmployee() {
    return this.selectedEmployeeSubject.asObservable();
  }

 // Método para establecer el empleado seleccionado.
  // Recibe un parámetro 'employee' que puede ser un objeto EmployeeM o null.
  setSelectedEmployee(employee: EmployeeM | null) {

    // Actualiza el valor del BehaviorSubject 'selectedEmployeeSubject' con el empleado proporcionado.
    this.selectedEmployeeSubject.next(employee); 
    
    // Si el empleado no es null, se guarda en el localStorage bajo la clave 'selectedEmployee'.
    // Si el empleado es null, se elimina la clave 'selectedEmployee' del localStorage.
    if (employee) {
      localStorage.setItem('selectedEmployee', JSON.stringify(employee));
    } else {
      localStorage.removeItem('selectedEmployee');  
    }
  }

  //Metodo para cargar la lista de empleados desde el servidor json
  private loadEmployees() {
    //Utiliza la direcion de donde esta ubicado el servidor json
    fetch('http://localhost:3000/employee')
      .then(response => response.json()) //Convierte la s respuesta a json
      .then(data => {
          // Actualiza el valor del BehaviorSubject 'employeesSubject' con los datos recibidos.
          //El next es el quesirve para pasarle los datos a los componentes que esta suscritos a este Observable
        this.employeesSubject.next(data); 
      })
      .catch(error => console.error('Error al cargar los empleados:', error)); //Maneja los errores que puedan ocurrir
  }
}
